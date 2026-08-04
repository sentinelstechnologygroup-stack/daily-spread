const DEFAULT_API_BASE_URL = "https://oxb.pxsweb.com/api/v1";
const DEFAULT_RESTAURANT_ID = "53d035ebf61e46461f212cab";
const DEFAULT_PUBLIC_KEY = "49ace91d8c17daf4d13e61c05883ff3edbd02d1b";
const DEFAULT_ORDER_URL = "https://menu-13717.orderexperience.net/53d035ebf61e46461f212cab/menu";

const env = import.meta.env || {};

const PRIVATE_CATEGORY_PATTERNS = [
  /^special events?$/i,
  /\b(private|customer)\s+(invoice|order)s?\b/i,
  /\bcatering\s+invoices?\b/i,
  /\binvoices?\b/i,
];

const PRIVATE_ITEM_PATTERNS = [
  /\binvoices?\b/i,
  /\bprivate\s+(customer\s+)?orders?\b/i,
];

const LAST_CATEGORY_PATTERNS = [/^gift cards?$/i];

export const PAYTRONIX_CONFIG = {
  apiBaseUrl: env.VITE_PAYTRONIX_API_BASE_URL || DEFAULT_API_BASE_URL,
  restaurantId: env.VITE_PAYTRONIX_RESTAURANT_ID || DEFAULT_RESTAURANT_ID,
  publicKey: env.VITE_PAYTRONIX_PUBLIC_KEY || DEFAULT_PUBLIC_KEY,
  orderUrl: env.VITE_PAYTRONIX_ORDER_URL || DEFAULT_ORDER_URL,
};

export function getOrderUrl() {
  return PAYTRONIX_CONFIG.orderUrl;
}

export function getMenuEndpoint() {
  const base = PAYTRONIX_CONFIG.apiBaseUrl.replace(/\/$/, "");
  const restaurantId = encodeURIComponent(PAYTRONIX_CONFIG.restaurantId);
  const key = encodeURIComponent(PAYTRONIX_CONFIG.publicKey);
  return `${base}/restaurants/${restaurantId}/menu?key=${key}`;
}

export async function fetchPaytronixMenu() {
  const response = await fetch(getMenuEndpoint(), {
    method: "GET",
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Menu request failed with status ${response.status}`);
  }

  const data = await response.json();
  return normalizePaytronixMenu(data);
}

export function normalizePaytronixMenu(data) {
  const rawItems = Array.isArray(data?.menu) ? data.menu : [];

  const items = rawItems
    .filter((item) => item && item.active !== 0 && item.active !== false)
    .map((item, index) => {
      const prices = normalizePrices(item.prices);
      const category = cleanText(item.category) || "Menu";

      return {
        id: item._id || item.id || `${slugify(category)}-${slugify(item.name || "item")}-${index}`,
        name: cleanText(item.name) || "Menu Item",
        category,
        description: cleanText(item.description),
        prices,
        priceLabel: getPriceLabel(prices),
        image: getPrimaryImage(item),
        optionGroups: normalizeOptionGroups(item.option_groups),
        orderType: item.order_type || "both",
        canOrder: item.can_order !== false,
        isSoldOut: Boolean(item.is_sold_out),
        dates: Array.isArray(item.dates) ? item.dates : [],
        tags: getTags(item),
        sourceIndex: index,
      };
    })
    .filter(isPublicMenuItem);

  const categories = Array.from(new Set(items.map((item) => item.category))).sort(
    compareMenuCategories
  );

  return { items, categories };
}

export function isPublicMenuCategory(category) {
  const name = cleanText(category);
  return Boolean(name) && !PRIVATE_CATEGORY_PATTERNS.some((pattern) => pattern.test(name));
}

export function isPublicMenuItem(item) {
  return (
    isPublicMenuCategory(item.category) &&
    !PRIVATE_ITEM_PATTERNS.some((pattern) => pattern.test(cleanText(item.name)))
  );
}

export function compareMenuCategories(a, b) {
  const aLast = LAST_CATEGORY_PATTERNS.some((pattern) => pattern.test(a));
  const bLast = LAST_CATEGORY_PATTERNS.some((pattern) => pattern.test(b));

  if (aLast !== bLast) return aLast ? 1 : -1;
  return a.localeCompare(b, undefined, { sensitivity: "base" });
}

function normalizePrices(prices) {
  if (!Array.isArray(prices)) return [];

  return prices
    .map((price) => ({
      name: cleanText(price?.name) || "Regular",
      price: Number(price?.price),
      isDefault: Boolean(price?.is_default),
      unitCount: price?.unit_count || 1,
    }))
    .filter((price) => Number.isFinite(price.price) && price.price > 0);
}

function normalizeOptionGroups(groups) {
  if (!Array.isArray(groups)) return [];

  return groups
    .map((group) => ({
      name: cleanText(group?.name),
      multiselect: Boolean(group?.multiselect),
      options: Array.isArray(group?.options)
        ? group.options
            .map((option) => ({
              name: cleanText(option?.name),
              price: Number(option?.price || 0),
              disabled: Boolean(option?.is_disabled),
            }))
            .filter((option) => option.name)
        : [],
    }))
    .filter((group) => group.name && group.options.length);
}

function getPrimaryImage(item) {
  const candidates = [
    ...(Array.isArray(item.images) ? item.images : []),
    item.featured_image,
    item.image_url,
    item.image,
    item.photo,
    item.photo_url,
    item.thumbnail,
  ];

  for (const candidate of candidates) {
    const url = getImageUrl(candidate);
    if (url) return url;
  }

  return "";
}

function getImageUrl(candidate) {
  if (typeof candidate === "string") {
    const value = candidate.trim();
    return /^(https?:\/\/|\/)/i.test(value) ? value : "";
  }

  if (!candidate || typeof candidate !== "object") return "";

  const nestedCandidates = [
    candidate.url,
    candidate.secure_url,
    candidate.src,
    candidate.path,
    candidate.original,
    candidate.large,
    candidate.medium,
    candidate.image_url,
  ];

  for (const nestedCandidate of nestedCandidates) {
    const url = getImageUrl(nestedCandidate);
    if (url) return url;
  }

  return "";
}

function getPriceLabel(prices) {
  if (!prices.length) return "";

  const lowest = Math.min(...prices.map((price) => price.price));
  const formatted = formatCurrency(lowest);

  return prices.length > 1 ? `From ${formatted}` : formatted;
}

function getTags(item) {
  const tags = [];
  if (item.is_featured) tags.push("Featured");
  return tags;
}

export function formatCurrency(value) {
  if (!Number.isFinite(Number(value))) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
}

function cleanText(value) {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
