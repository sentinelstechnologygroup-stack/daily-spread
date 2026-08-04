const GALLERY_TITLES = {
  "/images/catering/14.webp": "Seasonal Grazing Table",
  "/images/catering/24.webp": "Catered Shrimp Skewers",
  "/images/catering/31.webp": "Assorted Savory Pastries",
  "/images/catering/32.webp": "Fresh Fruit Skewers",
  "/images/catering/34.webp": "Herb-Roasted Chicken",
  "/images/catering/39.webp": "Cheese Ball and Crackers",
  "/images/catering/41.webp": "Roasted Brussels Sprouts",
  "/images/catering/42.webp": "Aguadito de Pollo",
  "/images/catering/56.webp": "Pulled Pork Sliders",
  "/images/catering/58.webp": "Assorted Pinwheel Wraps",
  "/images/catering/59.webp": "Stuffed Mushrooms",
  "/images/catering/64.webp": "Caprese Skewers",
};

export function getGalleryTitle(image) {
  return GALLERY_TITLES[image.src] || image.title || "";
}

export function getGalleryAlt(image) {
  const title = getGalleryTitle(image);
  return title ? `${title} prepared by Daily Spread` : image.alt;
}

