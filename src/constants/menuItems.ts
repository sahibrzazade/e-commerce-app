export const menuItems = [
  { labelKey: "navigation.home", path: '/' },
  { labelKey: "navigation.shop", path: '/shop' },
  { labelKey: "navigation.blogs", path: '/blogs' },
  {
    labelKey: "navigation.more",
    children: [
      { labelKey: "navigation.about", path: '/about' },
      { labelKey: "navigation.contact", path: '/contact' },
      { labelKey: "navigation.faq", path: '/faq' },
    ],
  },
];
