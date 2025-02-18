import axios from "axios";
import Image from "next/image";
import styles from "../../../styles/Anime.module.css";
import Layout from "../../../components/Layout";
import { FaStar, FaPlay, FaCalendar, FaClock, FaUsers, FaHeart, FaLink } from 'react-icons/fa';

export async function getServerSideProps({ params }) {
    const { mal_id } = params;
    try {
        const res = await axios.get(`https://api.jikan.moe/v4/anime/${mal_id}/full`);
        const animeDetails = res.data.data;

        return {
            props: {
                animeDetails,
            },
        };
    } catch (error) {
        return {
            notFound: true, // This will show the 404 page
        };
    }
}

export default function AnimeDetails({ animeDetails }) {
    return (
        <Layout title={`${animeDetails.title} | AniPick`}>
            <div className={styles.heroSection}>
                <div className={styles.heroBackground} 
                     style={{ backgroundImage: `url(${animeDetails.images.jpg.large_image_url})` }}>
                    <div className={styles.overlay}></div>
                </div>
                
                <div className={styles.mainContent}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.posterSection}>
                            <div className={styles.posterContainer}>
                                <Image
                                    src={animeDetails.images.jpg.large_image_url}
                                    alt={animeDetails.title}
                                    width={300}
                                    height={450}
                                    className={styles.poster}
                                    priority
                                    unoptimized={true}
                                />
                                <div className={styles.ratingBadge}>
                                    <FaStar />
                                    <span>{animeDetails.score || 'N/A'}</span>
                                </div>
                            </div>
                            <div className={styles.actionButtons}>
                                <a href={animeDetails.url} target="_blank" rel="noopener noreferrer" className={styles.malButton}>
                                    <FaLink /> View on MAL
                                </a>
                                <button className={styles.favoriteButton}>
                                    <FaHeart /> Add to Favorites
                                </button>
                            </div>
                        </div>

                        <div className={styles.detailsSection}>
                            <div className={styles.titleSection}>
                                <h1 className={styles.title}>{animeDetails.title}</h1>
                                {animeDetails.title_japanese && (
                                    <h2 className={styles.japaneseTitle}>{animeDetails.title_japanese}</h2>
                                )}
                            </div>

                            <div className={styles.statsGrid}>
                                {animeDetails.score && (
                                    <div className={styles.statCard}>
                                        <FaStar className={styles.statIcon} />
                                        <div className={styles.statInfo}>
                                            <span className={styles.statValue}>{animeDetails.score}</span>
                                            <span className={styles.statLabel}>Rating</span>
                                        </div>
                                    </div>
                                )}
                                {animeDetails.episodes && (
                                    <div className={styles.statCard}>
                                        <FaPlay className={styles.statIcon} />
                                        <div className={styles.statInfo}>
                                            <span className={styles.statValue}>{animeDetails.episodes}</span>
                                            <span className={styles.statLabel}>Episodes</span>
                                        </div>
                                    </div>
                                )}
                                {animeDetails.duration && (
                                    <div className={styles.statCard}>
                                        <FaClock className={styles.statIcon} />
                                        <div className={styles.statInfo}>
                                            <span className={styles.statValue}>{animeDetails.duration}</span>
                                            <span className={styles.statLabel}>Duration</span>
                                        </div>
                                    </div>
                                )}
                                {animeDetails.members && (
                                    <div className={styles.statCard}>
                                        <FaUsers className={styles.statIcon} />
                                        <div className={styles.statInfo}>
                                            <span className={styles.statValue}>{animeDetails.members.toLocaleString()}</span>
                                            <span className={styles.statLabel}>Members</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={styles.genreSection}>
                                {animeDetails.genres.map(genre => (
                                    <span key={genre.mal_id} className={styles.genreTag}>
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            <div className={styles.synopsisSection}>
                                <h3>Synopsis</h3>
                                <p>{animeDetails.synopsis}</p>
                            </div>

                            <div className={styles.infoGrid}>
                                <div className={styles.infoCard}>
                                    <h4>Status</h4>
                                    <p>{animeDetails.status}</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <h4>Aired</h4>
                                    <p>{animeDetails.aired?.string || 'TBA'}</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <h4>Rating</h4>
                                    <p>{animeDetails.rating || 'TBA'}</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <h4>Source</h4>
                                    <p>{animeDetails.source}</p>
                                </div>
                            </div>

                            {animeDetails.studios?.length > 0 && (
                                <div className={styles.studioSection}>
                                    <h3>Studios</h3>
                                    <div className={styles.studioList}>
                                        {animeDetails.studios.map(studio => (
                                            <span key={studio.mal_id} className={styles.studioTag}>
                                                {studio.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
