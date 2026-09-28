import { fetchPaytronixMenu } from "../lib/paytronixMenuApi";

export const CONCIERGE_MENU = [
  {
    title: "Breakfast",
    slug: "breakfast",
    image: "/images/concierge/items/breakfast-taco-bar.png",
    items: [
      ["Breakfast Taco Bar", "Eggs, potatoes, bacon, sausage, cheese, salsa, and flour or corn tortillas."],
      ["Breakfast Tacos", "Egg, potato, cheese, sausage, bacon, or chorizo."],
      ["Mini Quiche - Cupcake Size", "Vegetable or bacon, cheddar, and onion."],
      ["Individual Quiche - 4-inch", "Four-inch quiche with vegetarian or bacon, cheddar, and onion."],
      ["Biscuit Breakfast Sandwich", "Egg, sausage, and cheese."],
      ["Croissant Breakfast Sandwich", "Egg, ham, and cheese; GF bagel and vegetarian substitute available by request."],
      ["Yogurt, Fruit & Granola Parfait", "Layered yogurt, seasonal fruit, and granola."],
      ["Belgian Waffle or Pancake Bar", "Prepared or self-serve station with whipped cream, pecans, chocolate chips, maple syrup, and strawberry compote. Waffle maker rental available."],
      ["Migas Breakfast", "Eggs, tortilla strips, cheese, and fresh breakfast toppings."],
      ["Texas Brunch Box", "Breakfast sandwich, seasonal fruit, and pastry or muffin."],
      ["Seasonal Fruit Tray", "A fresh assortment of seasonal fruit."],
    ],
  },
  {
    title: "Breakfast Sides",
    slug: "breakfast-sides",
    image: "/images/concierge/items/breakfast-meat.png",
    items: [["Breakfast Meat", "Bacon or sausage."], ["Breakfast Breads", "Assorted muffins, scones, bagels, and biscuits. Gluten-free muffin or bagel available by request."]],
  },
  {
    title: "Lunch",
    slug: "lunch",
    image: "/images/concierge/items/box-lunch.png",
    items: [
      ["Assorted Sliders", "A selection of petite sandwiches for meetings and gatherings."],
      ["Classic Sandwich Tray", "Turkey and provolone, ham and cheddar, or Italian with ham, salami, pepperoni, and provolone."],
      ["Classic Submarine Sandwich Tray", "Turkey and Swiss, ham and cheddar, Italian, roast beef and provolone, chicken salad, turkey salad, or tuna salad."],
      ["Premium Sandwich & Wrap Tray", "Premium sandwiches and wraps with fresh fillings."],
      ["Box Lunch", "A complete individual lunch for meetings and team meals."],
      ["Assorted Individual Chips", "Lay's Classic, BBQ, Cheetos, Fritos/corn chips, and assorted varieties."],
      ["Assorted Cookie Tray", "Chocolate chip, snickerdoodle, sugar, chocolate crinkle, and cranberry-walnut oatmeal cookies; gluten-free cookies available by request."],
      ["Baked Potato Bar", "Butter, cheese, chives, bacon, and sour cream; add BBQ beef or pulled pork."],
      ["Taco Bar", "Ground beef and shredded chicken, flour and corn tortillas, shredded cheese, lettuce, tomato, pico de gallo, sour cream, and house-made red and green salsa."],
      ["Box Lunch", "Choice of classic sandwich or wrap, assorted individual chips, pickle, and cookie. Add pasta salad; gluten-free bread and vegetarian substitutions available."],
      ["Lunch Bowl Salad - Chef Salad", "Entrée salad with chicken, served with cilantro ranch; vegetarian preparation available with soy-based chik'n."],
      ["Lunch Bowl Salad - Southwest Chicken Salad", "Entrée salad with protein and choice of ranch, balsamic vinaigrette, or Thousand Island; vegetarian ham or turkey available."],
      ["Lunch Bowl Salad - Chicken Caesar Salad", "Entrée salad with chicken, served with Caesar dressing; vegetarian preparation available with soy-based chik'n."],
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
      ["Italian Pasta Entrée - Baked Ziti", "Baked ziti with mixed green or Caesar salad and garlic bread or dinner roll."],
      ["Italian Pasta Entrée - Chicken Alfredo", "Chicken Alfredo with mixed green or Caesar salad and garlic bread or dinner roll."],
      ["Chicken & Beef Fajita Buffet", "A complete fajita buffet for group dining."],
    ],
  },
  {
    title: "Side - Choose with hot meals",
    slug: "hot-meal-sides",
    image: "/images/concierge/items/corporate-side-dishes.png",
    items: [["Potatoes", "Oven-roasted herb, garlic mashed, twice-baked, scalloped cheese and chive, or sweet potato smash."], ["Rice / Beans", "Jasmine, garden rice pilaf, Peruvian green rice, cilantro lime rice, baked beans, or charro beans."], ["Vegetables", "Vegetable medley, Italian roasted vegetables, broccoli, candied carrots, summer skillet sauté, or green beans."], ["Salad", "Mixed green or Caesar salad with your choice of dressing."], ["Additional Side", "Add another side to complete the meal."]],
  },
  { title: "Bread", slug: "bread", image: "/images/concierge/items/artisan-bread-service.png", items: [["Bread Service", "Garlic bread or dinner rolls, with gluten-free rolls available by request."]] },
  { title: "Desserts", slug: "desserts", image: "/images/concierge/items/dessert-bites-cheesecake.png", items: [["Pie Bites / Turtle Brownie Bites", "Apple, cherry, chocolate, lemon, and turtle brownie bites."], ["6 oz Shot Glass Desserts", "Tiramisu, key lime, Black Forest, banana pudding, and lemon mousse cheesecake."], ["Individual Cheesecake with Cherry Topping", "Individual cheesecake with cherry topping."], ["Regular Cupcake", "Vanilla, chocolate, Italian cream, red velvet, or lemon."], ["Mini Cupcake", "Vanilla, chocolate, Italian cream, red velvet, or lemon."], ["Assorted Cookie Tray", "Chocolate chip, snickerdoodle, sugar, chocolate crinkle, and cranberry-walnut oatmeal cookies; gluten-free desserts available by request."]] },
  { title: "Beverages", slug: "beverages", image: "/images/concierge/items/beverages.png", items: [["Fresh-Brewed Sweet or Unsweet Tea", "Per gallon; serves approximately 8-10. Cups and ice included."], ["Lemonade", "Per gallon; serves approximately 8-10. Cups, ice, lemons, and sweeteners included."], ["Assorted Canned Soda", "Coke, Diet Coke, Dr Pepper, Sprite, and assorted varieties."], ["Bottled Water", "Bottled water for meetings and events."], ["Coffee Service", "Regular and/or decaf coffee with cups, creamer, sugar, and stir sticks. Alcoholic beverage service available by request."]] },
  { title: "Service", slug: "service", image: "/images/concierge/items/attended-buffet-service.png", items: [["Disposables", "Plate, napkin, and wrapped plasticware."], ["Attended Buffet Service", "Per hour, per server."], ["Chafing System Rental", "Includes chafer, water pan, and Sterno."], ["Waffle Maker Rental", "For a self-serve waffle station."], ["Coffee Urn/Pot Rental", "Each."], ["Beverage Decanter Rental", "Each."], ["Delivery", "Base delivery; adjust for distance and complexity when needed."]] },
];

export const CONCIERGE_HUB_GROUPS = [
  { title: "Breakfast", slugs: ["breakfast", "breakfast-sides"], image: "/images/concierge/items/breakfast-taco-bar.png" },
  { title: "Lunch", slugs: ["lunch"], image: "/images/concierge/items/box-lunch.png", note: "1/2-sized dinner entrées are available for lunch." },
  { title: "Hot Corporate Entrees, Sides & Bread", slugs: ["hot-corporate-entrees", "hot-meal-sides", "bread"], image: "/images/concierge/items/hot-corporate-entrees.png" },
  { title: "Desserts", slugs: ["desserts"], image: "/images/concierge/items/dessert-bites-cheesecake.png" },
  { title: "Beverages", slugs: ["beverages"], image: "/images/concierge/items/beverages.png" },
  { title: "Service", slugs: ["service"], image: "/images/concierge/items/attended-buffet-service.png" },
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
    const liveIsCategorySummary = live.items.length === 1 && (
      /selection/i.test(live.items[0][0]) ||
      live.items[0][0].toLowerCase() === live.title.toLowerCase() ||
      live.items[0][0].toLowerCase().includes(live.title.toLowerCase())
    );
    const items = liveIsCategorySummary && fallback?.items?.length
      ? fallback.items
      : live.items.map((item) => {
        const fallbackItem = fallback?.items?.find(([name]) => name.toLowerCase() === item[0].toLowerCase());
        return [item[0], item[1] || fallbackItem?.[1] || "", item[2] || ""];
      });
    merged.push({
      ...(fallback || {}),
      title: live.title,
      slug: fallback?.slug || live.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      image: fallback?.image || "",
      items,
    });
  });

  // Keep the complete concierge navigation available while Open Dining categories
  // are being populated. Configured categories use live rows; missing categories
  // retain their PDF-derived item list until Open Dining provides that category.
  return CONCIERGE_MENU
    .map((category) => merged.find((entry) => entry.slug === category.slug) || category)
    .concat(merged.filter((entry) => !CONCIERGE_MENU.some((category) => category.slug === entry.slug)));
}

export function getConciergeItemImage(item, fallback = "") {
  if (Array.isArray(item) && item.length > 2 && item[2]) return item[2];
  return conciergeItemImages[item?.[0]] || fallback;
}

export const conciergeItemImages = {
  "Breakfast Taco Bar": "/images/concierge/items/breakfast-taco-bar.png",
  "Breakfast Tacos": "/images/concierge/items/breakfast-tacos.png",
  "Mini Quiche - Cupcake Size": "/images/concierge/items/mini-quiche.png",
  "Mini Quiche": "/images/concierge/items/mini-quiche.png",
  "Individual Quiche - 4-inch": "/images/concierge/items/individual-quiche.png",
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
  "Classic Sandwich Tray": "/images/concierge/items/sandwich-wrap-tray.png",
  "Classic Submarine Sandwich Tray": "/images/concierge/items/sandwich-wrap-tray.png",
  "Premium Sandwich & Wrap Tray": "/images/concierge/items/sandwich-wrap-tray.png",
  "Box Lunch": "/images/concierge/items/box-lunch.png",
  "Assorted Individual Chips": "/images/concierge/items/assorted-sliders.png",
  "Assorted Cookie Tray": "/images/concierge/items/dessert-bites-cheesecake.png",
  "Baked Potato Bar": "/images/concierge/items/corporate-side-dishes.png",
  "Chicken": "/images/concierge/items/hot-corporate-entrees.png",
  "Beef & Steak": "/images/concierge/items/hot-corporate-entrees.png",
  "Pork": "/images/concierge/items/hot-corporate-entrees.png",
  "Salmon": "/images/concierge/items/hot-corporate-entrees.png",
  "Italian Pasta": "/images/concierge/items/hot-corporate-entrees.png",
  "Italian Pasta Entrée - Baked Ziti": "/images/concierge/items/hot-corporate-entrees.png",
  "Italian Pasta Entrée - Chicken Alfredo": "/images/concierge/items/hot-corporate-entrees.png",
  "Chicken & Beef Fajita Buffet": "/images/concierge/items/hot-corporate-entrees.png",
  "Potatoes": "/images/concierge/items/corporate-side-dishes.png",
  "Rice / Beans": "/images/concierge/items/corporate-side-dishes.png",
  "Vegetables": "/images/concierge/items/corporate-side-dishes.png",
  "Salad": "/images/concierge/items/corporate-side-dishes.png",
  "Potatoes, Rice & Beans": "/images/concierge/items/corporate-side-dishes.png",
  "Vegetables & Salads": "/images/concierge/items/corporate-side-dishes.png",
  "Additional Side": "/images/concierge/items/corporate-side-dishes.png",
  "Bread Service": "/images/concierge/items/artisan-bread-service.png",
  "Dessert Bites": "/images/concierge/items/dessert-bites-cheesecake.png",
  "Pie Bites / Turtle Brownie Bites": "/images/concierge/items/dessert-bites-cheesecake.png",
  "6 oz Shot Glass Desserts": "/images/concierge/items/dessert-bites-cheesecake.png",
  "Individual Cheesecake with Cherry Topping": "/images/concierge/items/dessert-bites-cheesecake.png",
  "Regular Cupcake": "/images/concierge/items/dessert-bites-cheesecake.png",
  "Mini Cupcake": "/images/concierge/items/dessert-bites-cheesecake.png",
  "Fresh-Brewed Sweet or Unsweet Tea": "/images/concierge/items/beverages.png",
  "Lemonade": "/images/concierge/items/beverages.png",
  "Assorted Canned Soda": "/images/concierge/items/beverages.png",
  "Bottled Water": "/images/concierge/items/beverages.png",
  "Coffee Service": "/images/concierge/items/beverages.png",
  "Disposables": "/images/concierge/items/attended-buffet-service.png",
  "Attended Buffet Service": "/images/concierge/items/attended-buffet-service.png",
  "Chafing System Rental": "/images/concierge/items/attended-buffet-service.png",
  "Waffle Maker Rental": "/images/concierge/items/attended-buffet-service.png",
  "Coffee Urn/Pot Rental": "/images/concierge/items/attended-buffet-service.png",
  "Beverage Decanter Rental": "/images/concierge/items/attended-buffet-service.png",
  "Delivery": "/images/concierge/items/attended-buffet-service.png",
  "Beverage Service": "/images/concierge/items/beverages.png",
  "Event Service": "/images/concierge/items/attended-buffet-service.png",
};
