import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import AnimeCard from '../components/AnimeCard';
import styles from '../styles/Home.module.css';
import { FaSearch } from 'react-icons/fa';

const SearchResults = () => {
    const router = useRouter();
    const { q } = router.query;
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (q) {
            // Try to get results from localStorage first
            const storedResults = localStorage.getItem('searchResults');
            if (storedResults) {
                setResults(JSON.parse(storedResults));
                setLoading(false);
            }

            // Fetch fresh results
            fetch(`https://api.jikan.moe/v4/anime?q=${q}&sfw`)
                .then(res => res.json())
                .then(data => {
                    setResults(data.data);
                    setLoading(false);
                    localStorage.setItem('searchResults', JSON.stringify(data.data));
                })
                .catch(error => {
                    console.error('Search error:', error);
                    setLoading(false);
                });
        }
    }, [q]);

    return (
        <Layout title={`Search Results for "${q}" | AniPick`}>
            <div className={styles.pageHero}>
                <div className={styles.pageHeroOverlay}></div>
                <div className={styles.pageHeroContent}>
                    <FaSearch className={styles.pageHeroIcon} />
                    <h1>Search Results</h1>
                    <p>Found {results.length} results for &quot;{q}&quot;</p>
                </div>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.container}>
                    {loading ? (
                        <div className={styles.loading}>Loading...</div>
                    ) : results.length > 0 ? (
                        <div className={styles.animeGrid}>
                            {results.map(anime => (
                                <AnimeCard key={anime.mal_id} anime={anime} />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noResults}>
                            <p>No results found for &quot;{q}&quot;</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default SearchResults; 