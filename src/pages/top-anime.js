import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
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
  const topAnime = await fetchWithRetry("https://api.jikan.moe/v4/top/anime");
  return {
    props: {
      topAnime,
    },
  };
}

export default function TopAnime({ topAnime }) {
  return (
    <Layout title="Top Anime | AniPick">
    <div className={styles.container}>
        <section className={styles.animeSection}>
            <h2>Top Anime</h2>
            <div className={styles.animeRow}>
                {topAnime.map((anime) => (
                    <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
            </div>
        </section>
    </div>
</Layout>
  );
}
