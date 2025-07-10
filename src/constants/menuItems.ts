export const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Blogs', path: '/blogs' },
  {
    label: 'More',
    children: [
      { label: 'About Us', path: '/about-us' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'FAQ', path: '/faq' },
    ],
  },
];
