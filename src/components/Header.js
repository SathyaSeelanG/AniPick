import { useState } from 'react';
import Link from "next/link";
import Search from "./Search";
import styles from "../styles/Header.module.css";
import { FaFire, FaStar, FaCalendarAlt, FaCompass, FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [imageError, setImageError] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const logoUrl = "https://raw.githubusercontent.com/SathyaSeelanG/assets/main/Projects/AniPick/AniPick_logo.png";
    // Fallback logo URL if needed
    const fallbackLogoUrl = "/logo.png"; // Make sure to add a local logo file in your public folder

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <Link href="/" className={styles.logo}>
                    <Image 
                        src={imageError ? fallbackLogoUrl : logoUrl}
                        alt="AniPick Logo" 
                        className={styles.logoImage}
                        width={35}
                        height={35}
                        priority
                        onError={() => setImageError(true)}
                        unoptimized={true}
                    />
                    <span className={styles.logoText}>AniPick</span>
                </Link>

                <div className={styles.searchContainer}>
                    <Search />
                </div>

                <button 
                    className={styles.mobileMenuButton}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
                    <Link href="/top-anime" className={styles.navLink}>
                        <FaFire className={styles.navIcon} />
                        <span>Top Anime</span>
                    </Link>
                    <Link href="/popular" className={styles.navLink}>
                        <FaStar className={styles.navIcon} />
                        <span>Popular</span>
                    </Link>
                    <Link href="/upcoming" className={styles.navLink}>
                        <FaCalendarAlt className={styles.navIcon} />
                        <span>Upcoming</span>
                    </Link>
                    <Link href="/recommend" className={styles.navLink}>
                        <FaCompass className={styles.navIcon} />
                        <span>Recommend</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
