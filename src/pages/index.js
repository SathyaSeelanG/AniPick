import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Link from "next/link";

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
  return (
    <Layout title="AniPick | Anime Recommendations">
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
    </Layout>
  );
}
