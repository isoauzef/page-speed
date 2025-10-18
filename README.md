## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to preview the landing page.

## Available Scripts

- `npm run dev` – start a local development server
- `npm run build` – create an optimized production build
- `npm run start` – run the production server locally
- `npm run lint` – check linting status using Next.js defaults
- `npm run backend` – launch the standalone Node.js mock API that stores form submissions in memory

## Time Line
-T+30 min:
Sticky flashsale banner is added with timer, apply code button and dismiss button. Working on functionality.

-T+90 min: 
Display the banner if url contains "coupon=SAVE20",
Timer set to today at 11:59 PM in the user’s local timezone
Clicking "Apply Code" changes text to "Aplied"
X dismiss the banner and keeps hiding for 24 hours
CTA "Apply code" push dataLayer.push({ event: 'promo_apply', code: 'SAVE20' }).

This can be tested by pasting below to browser console after banner loaded and before clicking to CTA:

window.dataLayer = window.dataLayer || [];
const originalPush = window.dataLayer.push.bind(window.dataLayer);
window.dataLayer.push = (...args) => {
  console.log("dataLayer push", ...args);
  return originalPush(...args);
};

It will log similar to "

dataLayer push {event: 'promo_apply', code: 'SAVE20', variant: 'A'}

" 
Accessibility attributes are added.

Added 2 test pages and linked to Book a session and View services. These buttons will have "coupon=SAVE20" if the landing url contains it.

Unit test is added via "vitest" for "Timer Math". You can run it by "npm run test"
(test file: app/components/_tests_/formatTimeLeft.test.ts)

A/B test: added a random functions runs on page load. and it only addes variant A or variant B to data later.
