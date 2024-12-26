import { NavLink } from "react-router";
import { NavItem } from "../TopNavigation/TopNavigation.js";

import stylesDI from "./BottomNavigation.module.scss";

type BottomNavItem = NavItem & { icon?: React.ReactNode };

export type BottomNavigationProps = {
  navItems: BottomNavItem[];
  styles?: typeof stylesDI;
  predicate: (a: NavItem, b: NavItem) => number;
  icon: React.ReactNode;
};

const BottomNavigation = ({
  navItems = [],
  styles = stylesDI,
  predicate,
}: BottomNavigationProps) => {
  const sortedNavItems = [...navItems].sort(predicate);

  return (
    <nav className={styles.bottomNavigation}>
      <ul className={styles.navList}>
        {sortedNavItems.map((item) => (
          <li key={item.id} className={styles.navItem}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              {item.icon && <span className={styles.navIcon}>{item.icon}</span>}
              <span className={styles.navText}>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavigation;
