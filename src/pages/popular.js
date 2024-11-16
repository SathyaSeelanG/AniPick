// pages/airing.js
import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import styles from "../styles/Home.module.css";
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
    const popularAnime = await fetchWithRetry("https://api.jikan.moe/v4/top/anime?filter=bypopularity");
    return {
        props: {
            popularAnime: popularAnime,
        },
    };
}

const PopularAnime = ({ popularAnime }) => {
    return (
        <Layout title="Popular Anime | AniPick">
            <div className={styles.container}>
                <section className={styles.animeSection}>
                    <h2>Popular Anime</h2>
                    <div className={styles.animeRow}>
                        {popularAnime.map((anime) => (
                            <AnimeCard key={anime.mal_id} anime={anime} />
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default PopularAnime;
