import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Link from "next/link";
import { useEffect } from 'react';
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
    <Layout title="AniPick | Anime Recommendations">
    <meta name="google-adsense-account" content="ca-pub-7527733954310455"></meta>
      <div className={styles.container}>
        <div className={styles.seccontainer}>
          <section className={styles.animeSection}>
            <div className={styles.sectionHeader}>
              <h2>Top of the Week</h2>
              <Link href="/top-anime">
                <button className={styles.viewAllBtn}>View All</button>
              </Link>
            </div>
            <div className={styles.animeRow}>
              {topAnime.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
          </section>

          <section className={styles.animeSection}>
            <div className={styles.sectionHeader}>
              <h2>Current Airing</h2>
              <Link href="/airing">
                <button className={styles.viewAllBtn}>View All</button>
              </Link>
            </div>
            <div className={styles.animeRow}>
              {airingAnime.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
          </section>

          <section className={styles.animeSection}>
            <div className={styles.sectionHeader}>
              <h2>Upcoming</h2>
              <Link href="/upcoming">
                <button className={styles.viewAllBtn}>View All</button>
              </Link>
            </div>
            <div className={styles.animeRow}>
              {upcomingAnime.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
          </section>

          <section className={styles.animeSection}>
            <div className={styles.sectionHeader}>
              <h2>Popular Anime</h2>
              <Link href="/popular">
                <button className={styles.viewAllBtn}>View All</button>
              </Link>
            </div>
            <div className={styles.animeRow}>
              {popularAnime.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className={styles.adContainer}>
      <h1>ADD</h1>
        <div id="ad-container"></div>
      </div>
    </Layout>
  );
}
