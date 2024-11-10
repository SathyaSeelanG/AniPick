import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>© {new Date().getFullYear()} AniPick. All Rights Reserved.</p>
        {/* <div className={styles.footerLinks}>
          <a href="/privacy" className={styles.footerLink}>
            Privacy Policy
          </a>
          <a href="/terms" className={styles.footerLink}>
            Terms of Service
          </a>
          <a href="/contact" className={styles.footerLink}>
            Contact Us
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
