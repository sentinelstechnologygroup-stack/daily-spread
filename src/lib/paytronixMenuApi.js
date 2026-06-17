const DEFAULT_API_BASE_URL = "https://oxb.pxsweb.com/api/v1";
const DEFAULT_RESTAURANT_ID = "53d035ebf61e46461f212cab";
const DEFAULT_PUBLIC_KEY = "49ace91d8c17daf4d13e61c05883ff3edbd02d1b";
const DEFAULT_ORDER_URL = "https://menu-13717.orderexperience.net/53d035ebf61e46461f212cab/menu";

export const PAYTRONIX_CONFIG = {
  apiBaseUrl: import.meta.env.VITE_PAYTRONIX_API_BASE_URL || DEFAULT_API_BASE_URL,
  restaurantId: import.meta.env.VITE_PAYTRONIX_RESTAURANT_ID || DEFAULT_RESTAURANT_ID,
  publicKey: import.meta.env.VITE_PAYTRONIX_PUBLIC_KEY || DEFAULT_PUBLIC_KEY,
  orderUrl: import.meta.env.VITE_PAYTRONIX_ORDER_URL || DEFAULT_ORDER_URL,
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
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Paytronix menu request failed with status ${response.status}`);
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
      const image = getPrimaryImage(item);
      const category = cleanText(item.category) || "Menu";

      return {
        id: item._id || item.id || `${slugify(category)}-${slugify(item.name || "item")}-${index}`,
        name: cleanText(item.name) || "Menu Item",
        category,
        description: cleanDescription(item.description),
        prices,
        priceLabel: getPriceLabel(prices),
        image,
        optionGroups: normalizeOptionGroups(item.option_groups),
        orderType: item.order_type || "both",
        tags: getTags(item),
      };
    });

  const categories = Array.from(new Set(items.map((item) => item.category))).sort((a, b) => a.localeCompare(b));

  return {
    items,
    categories,
    count: items.length,
    syncedAt: new Date().toISOString(),
  };
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
    .filter((price) => Number.isFinite(price.price));
}

function normalizeOptionGroups(groups) {
  if (!Array.isArray(groups)) return [];

  return groups.map((group) => ({
    name: cleanText(group?.name),
    multiselect: Boolean(group?.multiselect),
    options: Array.isArray(group?.options)
      ? group.options.map((option) => ({
          name: cleanText(option?.name),
          price: Number(option?.price || 0),
          disabled: Boolean(option?.is_disabled),
        })).filter((option) => option.name)
      : [],
  })).filter((group) => group.name && group.options.length);
}

function getPrimaryImage(item) {
  const candidates = [
    ...(Array.isArray(item.images) ? item.images : []),
    item.featured_image,
    item.image_url,
  ];

  return candidates.find((url) => typeof url === "string" && url.trim().startsWith("http")) || "";
}

function getPriceLabel(prices) {
  if (!prices.length) return "Price in Paytronix";

  const lowest = Math.min(...prices.map((price) => price.price));
  const formatted = formatCurrency(lowest);

  return prices.length > 1 ? `From ${formatted}` : formatted;
}

function getTags(item) {
  const tags = [];
  if (item.alcohol) tags.push("Alcohol");
  if (item.tobacco) tags.push("Tobacco");
  if (item.is_featured) tags.push("Featured");
  if (item.show_coupon) tags.push("Coupon eligible");
  return tags;
}

export function formatCurrency(value) {
  if (!Number.isFinite(Number(value))) return "";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(value));
}

function cleanDescription(value) {
  const description = cleanText(value);
  return description || "Chef-prepared menu item. See Paytronix ordering page for current availability and checkout.";
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
