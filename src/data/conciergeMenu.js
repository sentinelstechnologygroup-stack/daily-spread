import { fetchPaytronixMenu } from "../lib/paytronixMenuApi";

export const CONCIERGE_MENU = [
  {
    title: "Breakfast",
    slug: "breakfast",
    image: "/images/concierge/items/breakfast-taco-bar.png",
    items: [
      ["Breakfast Taco Bar", "Eggs, potatoes, bacon, sausage, cheese, salsa, and flour or corn tortillas."],
      ["Breakfast Tacos", "Egg, potato, cheese, sausage, bacon, or chorizo."],
      ["Mini Quiche", "Vegetable or bacon, cheddar, and onion."],
      ["Individual Quiche", "Four-inch quiche with vegetarian or bacon, cheddar, and onion."],
      ["Biscuit Breakfast Sandwich", "Egg, sausage, and cheese."],
      ["Croissant Breakfast Sandwich", "Egg, ham, and cheese; GF bagel and vegetarian substitute available by request."],
      ["Yogurt, Fruit & Granola Parfait", "Layered yogurt, seasonal fruit, and granola."],
      ["Belgian Waffle or Pancake Bar", "Whipped cream, pecans, chocolate chips, maple syrup, and strawberry compote."],
      ["Migas Breakfast", "Eggs, tortilla strips, cheese, and fresh breakfast toppings."],
      ["Texas Brunch Box", "Breakfast sandwich, seasonal fruit, and pastry or muffin."],
      ["Seasonal Fruit Tray", "A fresh assortment of seasonal fruit."],
    ],
  },
  {
    title: "Breakfast Sides",
    slug: "breakfast-sides",
    image: "/images/concierge/items/breakfast-meat.png",
    items: [["Breakfast Meat", "Bacon, sausage, or chorizo."], ["Breakfast Breads", "Assorted breakfast breads, pastries, and muffins."]],
  },
  {
    title: "Lunch",
    slug: "lunch",
    image: "/images/concierge/items/box-lunch.png",
    items: [
      ["Assorted Sliders", "A selection of petite sandwiches for meetings and gatherings."],
      ["Classic Sandwich Tray", "A variety of classic sandwiches served on a shareable tray."],
      ["Premium Sandwich & Wrap Tray", "Premium sandwiches and wraps with fresh fillings."],
      ["Box Lunch", "A complete individual lunch for meetings and team meals."],
      ["Baked Potato Bar", "Baked potatoes with toppings and accompaniments."],
      ["Taco Bar", "A build-your-own taco spread with fresh toppings."],
      ["Lunch Bowl Salads", "Chef, Southwest Chicken, and Chicken Caesar salad bowls."],
    ],
  },
  {
    title: "Hot Corporate Entrees",
    slug: "hot-corporate-entrees",
    image: "/images/concierge/items/hot-corporate-entrees.png",
    items: [
      ["Chicken", "Chef-prepared chicken entrees for corporate lunches and dinners."],
      ["Beef & Steak", "Beef and steak selections prepared for group service."],
      ["Pork", "Seasonal pork entree selections."],
      ["Salmon", "Chef-prepared salmon with complementary sides."],
      ["Italian Pasta", "Italian pasta entrees with salad and bread options."],
      ["Chicken & Beef Fajita Buffet", "A complete fajita buffet for group dining."],
    ],
  },
  {
    title: "Side - Choose with hot meals",
    slug: "hot-meal-sides",
    image: "/images/concierge/items/corporate-side-dishes.png",
    items: [["Potatoes, Rice & Beans", "Choose from potatoes, rice, beans, and seasonal accompaniments."], ["Vegetables & Salads", "Seasonal vegetables, mixed greens, and Caesar salad."], ["Additional Side", "Add another side to complete the meal."]],
  },
  { title: "Bread", slug: "bread", image: "/images/concierge/items/artisan-bread-service.png", items: [["Bread Service", "Garlic bread or dinner rolls, with gluten-free rolls available by request."]] },
  { title: "Desserts", slug: "desserts", image: "/images/concierge/items/dessert-bites-cheesecake.png", items: [["Dessert Bites", "Pie and brownie bites, shot-glass desserts, cheesecake, cupcakes, cookies, and gluten-free desserts."]] },
  { title: "Beverages", slug: "beverages", image: "/images/concierge/items/beverages.png", items: [["Beverage Service", "Tea, lemonade, canned soda, bottled water, and coffee. Alcohol service is available by request."]] },
  { title: "Service", slug: "service", image: "/images/concierge/items/attended-buffet-service.png", items: [["Event Service", "Disposables, attended buffet service, chafing systems, beverage equipment, delivery, and event coordination."]] },
];

export const conciergeCategoryBySlug = (slug) => CONCIERGE_MENU.find((category) => category.slug === slug);

const normalizeCategoryTitle = (value) => String(value || "")
  .replace(/^concierge\s*[-:]?\s*/i, "")
  .replace(/\s+/g, " ")
  .trim()
  .toLowerCase();

const categoryKey = (value) => normalizeCategoryTitle(value)
  .replace("side - choose with hot meals", "hot meal sides")
  .replace(/[^a-z0-9]+/g, "-");

export async function fetchConciergeMenu() {
  const { items } = await fetchPaytronixMenu();
  const liveCategories = new Map();

  items
    .filter((item) => /^concierge\s*[-:]/i.test(item.category))
    .forEach((item) => {
      const title = item.category.replace(/^concierge\s*[-:]?\s*/i, "").trim();
      const key = categoryKey(title);
      const entry = liveCategories.get(key) || { title, items: [] };
      entry.items.push([item.name, item.description || "", item.image || ""]);
      liveCategories.set(key, entry);
    });

  if (!liveCategories.size) return CONCIERGE_MENU;

  const merged = [];
  liveCategories.forEach((live, key) => {
    const fallback = CONCIERGE_MENU.find((category) => categoryKey(category.title) === key);
    merged.push({
      ...(fallback || {}),
      title: live.title,
      slug: fallback?.slug || live.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      image: fallback?.image || "",
      items: live.items,
    });
  });

  return CONCIERGE_MENU
    .map((category) => merged.find((entry) => entry.slug === category.slug))
    .filter(Boolean)
    .concat(merged.filter((entry) => !CONCIERGE_MENU.some((category) => category.slug === entry.slug)));
}

export function getConciergeItemImage(item, fallback = "") {
  if (Array.isArray(item) && item.length > 2) return item[2] || fallback;
  return conciergeItemImages[item?.[0]] || fallback;
}

export const conciergeItemImages = {
  "Breakfast Taco Bar": "/images/concierge/items/breakfast-taco-bar.png",
  "Breakfast Tacos": "/images/concierge/items/breakfast-tacos.png",
  "Mini Quiche": "/images/concierge/items/mini-quiche.png",
  "Individual Quiche": "/images/concierge/items/individual-quiche.png",
  "Biscuit Breakfast Sandwich": "/images/concierge/items/biscuit-breakfast-sandwich.png",
  "Croissant Breakfast Sandwich": "/images/concierge/items/croissant-breakfast-sandwich.png",
  "Yogurt, Fruit & Granola Parfait": "/images/concierge/items/yogurt-fruit-granola-parfait.png",
  "Belgian Waffle or Pancake Bar": "/images/concierge/items/waffle-pancake-bar.png",
  "Migas Breakfast": "/images/concierge/items/migas-breakfast.png",
  "Texas Brunch Box": "/images/concierge/items/texas-brunch-box.png",
  "Seasonal Fruit Tray": "/images/concierge/items/seasonal-fruit-tray.png",
  "Breakfast Meat": "/images/concierge/items/breakfast-meat.png",
  "Breakfast Breads": "/images/concierge/items/breakfast-breads.png",
  "Assorted Sliders": "/images/concierge/items/assorted-sliders.png",
  "Premium Sandwich & Wrap Tray": "/images/concierge/items/sandwich-wrap-tray.png",
  "Box Lunch": "/images/concierge/items/box-lunch.png",
  "Chicken": "/images/concierge/items/hot-corporate-entrees.png",
  "Beef & Steak": "/images/concierge/items/hot-corporate-entrees.png",
  "Pork": "/images/concierge/items/hot-corporate-entrees.png",
  "Salmon": "/images/concierge/items/hot-corporate-entrees.png",
  "Italian Pasta": "/images/concierge/items/hot-corporate-entrees.png",
  "Chicken & Beef Fajita Buffet": "/images/concierge/items/hot-corporate-entrees.png",
  "Potatoes, Rice & Beans": "/images/concierge/items/corporate-side-dishes.png",
  "Vegetables & Salads": "/images/concierge/items/corporate-side-dishes.png",
  "Additional Side": "/images/concierge/items/corporate-side-dishes.png",
  "Bread Service": "/images/concierge/items/artisan-bread-service.png",
  "Dessert Bites": "/images/concierge/items/dessert-bites-cheesecake.png",
  "Beverage Service": "/images/concierge/items/beverages.png",
  "Event Service": "/images/concierge/items/attended-buffet-service.png",
};
