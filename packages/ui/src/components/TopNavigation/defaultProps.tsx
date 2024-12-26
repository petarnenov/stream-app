import { NavItem } from "./TopNavigation.js";

export const navItemsDI = [
  { id: 1, to: "/", label: "Home" },
  { id: 2, to: "/about", label: "About" },
  { id: 3, to: "/services", label: "Services" },
  { id: 4, to: "/contact", label: "Contact" },
];

export const logoDI = <span>Logo</span>;

export const predicateDI = (a: NavItem, b: NavItem) => a.id - b.id;
