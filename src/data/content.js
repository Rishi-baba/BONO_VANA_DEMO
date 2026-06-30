// Extracted content data (Blogs and Menus)
// To be connected to Shopify API in the future



export const NAVIGATION_MENU = [
  { title: "Shop All", url: "/shop" },
  {
    title: "Collections",
    url: "/shop",
    items: [
      { title: "Apparel", url: "/shop?collection=apparel" },
      { title: "Resort", url: "/shop?collection=resort" },
      { title: "Essentials", url: "/shop?collection=essentials" }
    ]
  },
  { title: "About", url: "/about" },
  { title: "Journal", url: "/blog" }
];
