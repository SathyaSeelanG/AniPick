// import Search from "./Search"; // Import the Search component
// import styles from "../styles/Header.module.css";

// const Header = () => {
//   return (
//     <header className={styles.header}>
//       <h1 className={styles.heading}>AniPick</h1>
//       <h1 className={styles.heading}>Reomcend</h1>
//       <div className={styles.searchWrapper}>
//         <Search /> {/* Include the Search component here */}
//       </div>
//     </header>
//   );
// };

// export default Header;
import Link from "next/link"; // Import Link for navigation
import Search from "./Search"; // Import the Search component
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.heading}>
          AniPick
        </Link>
        <Link href="/recommend" className={styles.recommendLink}>
          Recommend
        </Link>
      </div>

      <div className={styles.searchWrapper}>
        <Search /> {/* Include the Search component here */}
      </div>
    </header>
  );
};

export default Header;
