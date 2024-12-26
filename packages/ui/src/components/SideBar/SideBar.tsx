import { Link } from 'react-router';

import styles from './SideBar.module.scss';

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/about" className={styles.navLink}>About</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/services" className={styles.navLink}>Services</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/contact" className={styles.navLink}>Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;