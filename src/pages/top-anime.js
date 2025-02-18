import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import { FaTrophy, FaFilter } from 'react-icons/fa';
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
  const topAnime = await fetchWithRetry("https://api.jikan.moe/v4/top/anime");
  return {
    props: {
      topAnime,
    },
  };
}

export default function TopAnime({ topAnime }) {
    const [sortBy, setSortBy] = useState('rank');
    const [displayCount, setDisplayCount] = useState(20);

    const loadMore = () => {
        setDisplayCount(prev => prev + 20);
    };

    const sortAnime = (animeList, sortType) => {
        const sortedList = [...animeList];
        switch (sortType) {
            case 'rank':
                return sortedList.sort((a, b) => a.rank - b.rank);
            case 'rating':
                return sortedList.sort((a, b) => b.score - a.score);
            case 'title':
                return sortedList.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return sortedList;
        }
    };

    const sortedAnime = sortAnime(topAnime, sortBy);

    return (
        <Layout title="Top Anime | AniPick">
            <div className={styles.pageHero}>
                <div className={styles.pageHeroOverlay}></div>
                <div className={styles.pageHeroContent}>
                    <FaTrophy className={styles.pageHeroIcon} />
                    <h1>Top Rated Anime</h1>
                    <p>The highest rated anime of all time</p>
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
                                <option value="rank">Sort by Rank</option>
                                <option value="rating">Sort by Rating</option>
                                <option value="title">Sort by Title</option>
                            </select>
                        </div>
                        <p className={styles.resultCount}>
                            Showing {displayCount} of {topAnime.length} results
                        </p>
                    </div>

                    <div className={styles.animeGrid}>
                        {sortedAnime.slice(0, displayCount).map((anime) => (
                            <AnimeCard key={anime.mal_id} anime={anime} />
                        ))}
                    </div>

                    {displayCount < topAnime.length && (
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
}
