export const menuItems = [
  { labelKey: "navigation.home", path: '/' },
  { labelKey: "navigation.shop", path: '/shop' },
  { labelKey: "navigation.blogs", path: '/blogs' },
  {
    labelKey: "navigation.more",
    children: [
      { labelKey: "navigation.about-us", path: '/about-us' },
      { labelKey: "navigation.contact-us", path: '/contact-us' },
      { labelKey: "navigation.faq", path: '/faq' },
    ],
  },
];
