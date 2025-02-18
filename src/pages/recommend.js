import { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Recommend.module.css';
import AnimeCard from '../components/AnimeCard';
import { FaSearch, FaRandom, FaHeart, FaStar } from 'react-icons/fa';

export default function Recommend() {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    const genres = [
        { id: 1, name: "Action" }, { id: 2, name: "Adventure" },
        { id: 4, name: "Comedy" }, { id: 8, name: "Drama" },
        { id: 10, name: "Fantasy" }, { id: 7, name: "Mystery" },
        { id: 22, name: "Romance" }, { id: 24, name: "Sci-Fi" },
        { id: 36, name: "Slice of Life" }, { id: 37, name: "Supernatural" },
        { id: 41, name: "Thriller" }, { id: 23, name: "School" }
    ];

    const toggleGenre = (genreId) => {
        setSelectedGenres(prev => 
            prev.includes(genreId)
                ? prev.filter(id => id !== genreId)
                : [...prev, genreId]
        );
    };

    const getRecommendations = async () => {
        if (selectedGenres.length === 0) {
            alert('Please select at least one genre');
            return;
        }

        setLoading(true);
        try {
            const genreString = selectedGenres.join(',');
            const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${genreString}&order_by=score&sort=desc&limit=10`);
            const data = await response.json();
            setRecommendations(data.data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title="Anime Recommendations | AniPick">
            <div className={styles.recommendPage}>
                <div className={styles.heroSection}>
                    <div className={styles.heroContent}>
                        <h1>Discover Your Next Favorite Anime</h1>
                        <p>Select your preferred genres and let us recommend the perfect anime for you</p>
                    </div>
                </div>

                <div className={styles.mainContent}>
                    <div className={styles.genreSection}>
                        <h2>Select Genres <FaHeart className={styles.sectionIcon} /></h2>
                        <div className={styles.genreGrid}>
                            {genres.map(genre => (
                                <button
                                    key={genre.id}
                                    className={`${styles.genreButton} ${
                                        selectedGenres.includes(genre.id) ? styles.selected : ''
                                    }`}
                                    onClick={() => toggleGenre(genre.id)}
                                >
                                    {genre.name}
                                </button>
                            ))}
                        </div>
                        <div className={styles.actionButtons}>
                            <button 
                                className={styles.findButton}
                                onClick={getRecommendations}
                                disabled={loading}
                            >
                                <FaSearch /> Find Anime
                            </button>
                            <button 
                                className={styles.randomButton}
                                onClick={() => {
                                    const randomGenres = genres
                                        .sort(() => 0.5 - Math.random())
                                        .slice(0, 3)
                                        .map(g => g.id);
                                    setSelectedGenres(randomGenres);
                                }}
                            >
                                <FaRandom /> Random Genres
                            </button>
                        </div>
                    </div>

                    {loading && (
                        <div className={styles.loadingContainer}>
                            <div className={styles.loader}></div>
                            <p>Finding perfect anime for you...</p>
                        </div>
                    )}

                    {recommendations.length > 0 && !loading && (
                        <div className={styles.recommendationsSection}>
                            <h2>Recommended Anime <FaStar className={styles.sectionIcon} /></h2>
                            <div className={styles.animeGrid}>
                                {recommendations.map(anime => (
                                    <AnimeCard key={anime.mal_id} anime={anime} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
