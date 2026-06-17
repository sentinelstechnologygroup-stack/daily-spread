# Daily Spread Chef Website

Cleaned Vite/React build exported from Base44 and scrubbed for standalone use.

## Scripts

```bash
npm install
npm run build
npm run preview
```

## Notes

- Base44 SDK, Vite plugin, generated config, app params, and auth wrappers were removed.
- The app now runs as a standard public marketing website.
- Contact form delivery still needs to be wired to the final backend/form service before production use.

## Paytronix / OpenDining Menu Sync

The `/menu` page now loads the live Daily Spread menu from the public OrderExperience API feed:

```text
https://oxb.pxsweb.com/api/v1/restaurants/{restaurantId}/menu?key={publicKey}
```

The website uses only the public OrderExperience menu key. Do **not** place the private OpenDining API Key/API Secret in frontend code, `.env`, GitHub, or Vercel client variables.

Required Vercel environment variables:

```bash
VITE_PAYTRONIX_API_BASE_URL=https://oxb.pxsweb.com/api/v1
VITE_PAYTRONIX_RESTAURANT_ID=53d035ebf61e46461f212cab
VITE_PAYTRONIX_PUBLIC_KEY=<current public OrderExperience key>
VITE_PAYTRONIX_ORDER_URL=https://menu-13717.orderexperience.net/53d035ebf61e46461f212cab/menu
```

Checkout/payment remains inside Paytronix. The Daily Spread site is a synced menu display layer.
