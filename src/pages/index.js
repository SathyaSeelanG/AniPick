import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Layout from "../components/Layout";

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
  //   console.log("topanime", topAnime);
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
    <>
      {/* <Header /> */}
      <Layout>
        <div className={styles.container}>
          {/* <h1 className={styles.heading}>Anime Recommendations</h1> */}
          <div className={styles.seccontainer}>
            <section className={styles.animeSection}>
              <h2>Top of the Week</h2>
              <div className={styles.animeRow}>
                {topAnime.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            </section>
            <section className={styles.animeSection}>
              <h2>Currrent Airing </h2>
              <div className={styles.animeRow}>
                {airingAnime.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            </section>
            <section className={styles.animeSection}>
              <h2>Upcoming </h2>
              <div className={styles.animeRow}>
                {upcomingAnime.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            </section>

            <section className={styles.animeSection}>
              <h2>Popular Anime</h2>
              <div className={styles.animeRow}>
                {popularAnime.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
}
