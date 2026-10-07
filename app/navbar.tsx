import styles from "./page.module.css";

const LINKS = ["Home", "Features", "Pricing", "About"];
const ACTIVE_LINK = "Home";

export default function Navbar({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <nav className={`${styles.navbar} ${mirrored ? styles.mirrored : ""}`}>
      <a className={styles.brand} href="#">
        Navbar
      </a>
      <ul className={styles.navLinks}>
        {LINKS.map((link) => (
          <li key={link}>
            <a
              className={link === ACTIVE_LINK ? styles.activeLink : styles.navLink}
              href="#"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.search}>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className={styles.searchButton} type="button">
          Search
        </button>
      </div>
    </nav>
  );
}
