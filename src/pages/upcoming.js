// pages/airing.js
import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { FaCalendarAlt, FaFilter } from 'react-icons/fa';
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
    const upcomingAnime = await fetchWithRetry("https://api.jikan.moe/v4/seasons/upcoming");
    return {
        props: {
            upcomingAnime: upcomingAnime,
        },
    };
}

const UpcomingAnime = ({ upcomingAnime }) => {
    const [sortBy, setSortBy] = useState('date');
    const [displayCount, setDisplayCount] = useState(20);

    const loadMore = () => {
        setDisplayCount(prev => prev + 20);
    };

    const sortAnime = (animeList, sortType) => {
        const sortedList = [...animeList];
        switch (sortType) {
            case 'date':
                return sortedList.sort((a, b) => new Date(a.aired.from) - new Date(b.aired.from));
            case 'title':
                return sortedList.sort((a, b) => a.title.localeCompare(b.title));
            case 'popularity':
                return sortedList.sort((a, b) => b.members - a.members);
            default:
                return sortedList;
        }
    };

    const sortedAnime = sortAnime(upcomingAnime, sortBy);

    return (
        <Layout title="Upcoming Anime | AniPick">
            <div className={styles.pageHero}>
                <div className={styles.pageHeroOverlay}></div>
                <div className={styles.pageHeroContent}>
                    <FaCalendarAlt className={styles.pageHeroIcon} />
                    <h1>Upcoming Anime</h1>
                    <p>Discover what's coming next in the world of anime</p>
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
                                <option value="date">Sort by Release Date</option>
                                <option value="popularity">Sort by Popularity</option>
                                <option value="title">Sort by Title</option>
                            </select>
                        </div>
                        <p className={styles.resultCount}>
                            Showing {displayCount} of {upcomingAnime.length} results
                        </p>
                    </div>

                    <div className={styles.animeGrid}>
                        {sortedAnime.slice(0, displayCount).map((anime) => (
                            <AnimeCard key={anime.mal_id} anime={anime} />
                        ))}
                    </div>

                    {displayCount < upcomingAnime.length && (
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

export default UpcomingAnime;
