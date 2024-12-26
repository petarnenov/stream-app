"use client";
import { NavLink } from "react-router";
import classnames from "classnames";

import { navItemsDI, predicateDI, logoDI } from "./defaultProps.js";

import stylesDI from "./TopNavigation.module.scss";

export type NavItem = {
  id: number;
  to: string;
  label: string;
  hidden?: boolean;
};

export type TopNavigationProps = {
  navItems: NavItem[];
  styles?: typeof stylesDI;
  predicate: (a: NavItem, b: NavItem) => number;
  logo: React.ReactNode;
};

const TopNavigation = ({
  navItems = navItemsDI,
  styles = stylesDI,
  predicate = predicateDI,
  logo = logoDI,
}: TopNavigationProps) => {
  if (!navItems) return null;
  if (!Array.isArray(navItems)) return null;

  return (
    <nav className={styles.topNavigation}>
      <span className={styles.logo}>{logo}</span>
      <ul className={styles.navList}>
        {navItems?.sort(predicate).map(({ to, label, hidden }) => (
          <li
            key={to}
            className={classnames([
              styles.navItem,
              hidden ? styles.hidden : "",
            ])}
          >
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopNavigation;
