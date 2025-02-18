import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Link from "next/link";
import { useEffect } from 'react';
import { FaFire, FaCalendarAlt, FaClock, FaStar, FaArrowRight } from 'react-icons/fa';

async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 429 && i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay));
      } else {
        throw error;
      }
    }
  }
}

export async function getServerSideProps() {
  const upcomingAnime = await fetchWithRetry(
    "https://api.jikan.moe/v4/seasons/upcoming"
  );
  const popularAnime = await fetchWithRetry(
    "https://api.jikan.moe/v4/top/anime?filter=bypopularity"
  );
  const topAnime = await fetchWithRetry("https://api.jikan.moe/v4/top/anime");
  const airingAnime = await fetchWithRetry(
    "https://api.jikan.moe/v4/top/anime?filter=airing"
  );
  return {
    props: {
      upcomingAnime: upcomingAnime.slice(0, 5),
      popularAnime: popularAnime.slice(0, 5),
      topAnime: topAnime.slice(0, 5),
      airingAnime: airingAnime.slice(0, 5),
    },
  };
}

export default function Home({
  upcomingAnime,
  popularAnime,
  topAnime,
  airingAnime,
}) {
  useEffect(() => {
    const adContainer = document.getElementById('ad-container');
    if (!adContainer) return;
  
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      atOptions = {
        'key' : 'e74b8f52e5e9ebdc51c679eb786809c9',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;
    adContainer.appendChild(script);
  
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//www.highperformanceformat.com/e74b8f52e5e9ebdc51c679eb786809c9/invoke.js';
    adContainer.appendChild(invokeScript);
  
    return () => {
      // Clean up
      adContainer.removeChild(script);
      adContainer.removeChild(invokeScript);
    };
  }, []);
  

  return (
    <Layout title="AniPick | Discover Your Next Favorite Anime">
      <meta name="google-adsense-account" content="ca-pub-7527733954310455"></meta>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7527733954310455"
       crossorigin="anonymous"></script>
      
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>Discover Amazing Anime</h1>
          <p>Your personal guide to the best anime recommendations</p>
          <div className={styles.heroButtons}>
            <Link href="/recommend" className={styles.ctaButton}>
              Get Recommendations
            </Link>
            <Link href="/popular" className={styles.secondaryButton}>
              Browse Popular <FaArrowRight className={styles.buttonIcon} />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.seccontainer}>
            <section className={styles.animeSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.headerLeft}>
                  <FaFire className={styles.sectionIcon} />
                  <h2>Top of the Week</h2>
                </div>
                <Link href="/top-anime" className={styles.viewAllLink}>
                  <span>View All</span>
                  <FaArrowRight className={styles.viewAllIcon} />
                </Link>
              </div>
              <div className={styles.animeGrid}>
                {topAnime.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            </section>

            <section className={styles.animeSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.headerLeft}>
                  <FaClock className={styles.sectionIcon} />
                  <h2>Currently Airing</h2>
                </div>
                <Link href="/airing" className={styles.viewAllLink}>
                  <span>View All</span>
                  <FaArrowRight className={styles.viewAllIcon} />
                </Link>
              </div>
              <div className={styles.animeGrid}>
                {airingAnime.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            </section>

            <div className={styles.adContainer}>
              <div id="ad-container"></div>
            </div>

            <section className={styles.animeSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.headerLeft}>
                  <FaCalendarAlt className={styles.sectionIcon} />
                  <h2>Upcoming Releases</h2>
                </div>
                <Link href="/upcoming" className={styles.viewAllLink}>
                  <span>View All</span>
                  <FaArrowRight className={styles.viewAllIcon} />
                </Link>
              </div>
              <div className={styles.animeGrid}>
                {upcomingAnime.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            </section>

            <section className={styles.animeSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.headerLeft}>
                  <FaStar className={styles.sectionIcon} />
                  <h2>Most Popular</h2>
                </div>
                <Link href="/popular" className={styles.viewAllLink}>
                  <span>View All</span>
                  <FaArrowRight className={styles.viewAllIcon} />
                </Link>
              </div>
              <div className={styles.animeGrid}>
                {popularAnime.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
