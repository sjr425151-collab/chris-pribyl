export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Our Work", href: "/work" },
      { label: "Reviews", href: "/reviews" },
      { label: "Service Areas", href: "/service-areas" },
      { label: "Request an Estimate", href: "/contact" },
    ],
  },
];
