import Link from 'next/link';
import { FaHeart, FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerTop}>
          <div className={styles.mainSection}>
            <div className={styles.brandSection}>
              <h3>AniPick</h3>
              <p>Your personal anime recommendation platform</p>
            </div>
            <div className={styles.linkGrid}>
              <Link href="/popular">Popular</Link>
              <Link href="/top-anime">Top Anime</Link>
              <Link href="/upcoming">Upcoming</Link>
              <Link href="/recommend">Recommend</Link>
            </div>
          </div>
          
          <div className={styles.developerSection}>
            <h3>Developer</h3>
            <div className={styles.developerInfo}>
              <p>Designed & Built by</p>
              <div className={styles.developerDetails}>
                <a 
                  href="https://sathyaseelan.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.developerLink}
                >
                  Sathya Seelan 
                </a>
                <div className={styles.socialLinks}>
                  <a 
                    href="https://github.com/SathyaSeelanG" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <FaGithub />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/sathya--seelan/"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <FaLinkedin />
                  </a>
                  <a 
                    href="https://sathyaseelan.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <FaGlobe />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>
            © {new Date().getFullYear()} AniPick. Made with{' '}
            <FaHeart className={styles.heartIcon} />
            {' '}by{' '}
            <a 
              href="https://sathyaseelan.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.creditLink}
            >
              Sathya Seelan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
