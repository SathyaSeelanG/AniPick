// pages/airing.js
import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { FaStar, FaFilter } from 'react-icons/fa';
import { useState } from 'react';

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
    const [sortBy, setSortBy] = useState('popularity');
    const [displayCount, setDisplayCount] = useState(20);

    const loadMore = () => {
        setDisplayCount(prev => prev + 20);
    };

    const sortAnime = (animeList, sortType) => {
        const sortedList = [...animeList];
        switch (sortType) {
            case 'popularity':
                return sortedList.sort((a, b) => b.popularity - a.popularity);
            case 'rating':
                return sortedList.sort((a, b) => b.score - a.score);
            case 'title':
                return sortedList.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return sortedList;
        }
    };

    const sortedAnime = sortAnime(popularAnime, sortBy);

    return (
        <Layout title="Popular Anime | AniPick">
            <div className={styles.pageHero}>
                <div className={styles.pageHeroOverlay}></div>
                <div className={styles.pageHeroContent}>
                    <FaStar className={styles.pageHeroIcon} />
                    <h1>Popular Anime</h1>
                    <p>Discover the most beloved anime series of all time</p>
                </div>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.container}>
                    <div className={styles.filterSection}>
                        <div className={styles.filterWrapper}>
                            <FaFilter className={styles.filterIcon} />
                            <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)}
                                className={styles.filterSelect}
                            >
                                <option value="popularity">Sort by Popularity</option>
                                <option value="rating">Sort by Rating</option>
                                <option value="title">Sort by Title</option>
                            </select>
                        </div>
                        <p className={styles.resultCount}>
                            Showing {displayCount} of {popularAnime.length} results
                        </p>
                    </div>

                    <div className={styles.animeGrid}>
                        {sortedAnime.slice(0, displayCount).map((anime) => (
                            <AnimeCard key={anime.mal_id} anime={anime} />
                        ))}
                    </div>

                    {displayCount < popularAnime.length && (
                        <div className={styles.loadMoreContainer}>
                            <button onClick={loadMore} className={styles.loadMoreButton}>
                                Load More Anime
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default PopularAnime;
