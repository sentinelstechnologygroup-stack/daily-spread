const STORAGE_KEY = "daily-spread-draft-orders";

export function buildOrderPayload({ customer, fulfillment, items, notes }) {
  const normalizedItems = items.map((item) => {
    const unitPrice = typeof item.price === "number" ? item.price : 0;
    const quantity = Number(item.quantity || 1);

    return {
      itemId: item.id,
      name: item.name,
      category: item.category,
      quantity,
      options: item.selectedOptions || [],
      unitPrice,
      lineTotal: unitPrice * quantity,
      priceByRequest: typeof item.price !== "number",
    };
  });

  const subtotal = normalizedItems.reduce((sum, item) => sum + item.lineTotal, 0);

  return {
    source: "daily-spread-website",
    status: "draft",
    customerName: customer.name,
    phone: customer.phone,
    email: customer.email,
    pickupOrDelivery: fulfillment.type,
    requestedDate: fulfillment.requestedDate,
    requestedTime: fulfillment.requestedTime,
    items: normalizedItems,
    subtotal,
    tax: 0,
    deliveryFee: 0,
    total: subtotal,
    notes,
    createdAt: new Date().toISOString(),
  };
}

export async function submitOrder(orderPayload) {
  const apiBaseUrl = import.meta.env?.VITE_ORDER_API_BASE_URL;

  if (apiBaseUrl) {
    const response = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      throw new Error(`Order API request failed with status ${response.status}`);
    }

    return response.json();
  }

  const savedOrders = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const localOrder = {
    ...orderPayload,
    id: `local-${Date.now()}`,
    status: "submitted-local",
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify([localOrder, ...savedOrders].slice(0, 25)));
  console.info("Daily Spread order payload ready for API integration", localOrder);

  return {
    ok: true,
    mode: "local-placeholder",
    order: localOrder,
  };
}
