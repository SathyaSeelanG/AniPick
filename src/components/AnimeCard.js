import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaPlayCircle } from 'react-icons/fa';
import styles from '../styles/AnimeCard.module.css';

const AnimeCard = ({ anime }) => {
    // Create a URL-friendly version of the title
    const titleForUrl = anime.title_english || anime.title;
    const encodedTitle = encodeURIComponent(titleForUrl.replace(/\s+/g, '-').toLowerCase());

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Link href={`/anime/${anime.mal_id}/${encodedTitle}`}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                            alt={titleForUrl}
                            fill={true}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={styles.image}
                            priority={true}
                        />
                        <div className={styles.overlay}>
                            <FaPlayCircle className={styles.playIcon} />
                            <div className={styles.info}>
                                {anime.genres && (
                                    <div className={styles.genres}>
                                        {anime.genres.slice(0, 2).map(genre => genre.name).join(' • ')}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
                {anime.score && (
                    <div className={styles.ratingBadge}>
                        <FaStar />
                        <span>{anime.score}</span>
                    </div>
                )}
                {anime.episodes && (
                    <div className={styles.episodeBadge}>
                        {anime.episodes} Episodes
                    </div>
                )}
                {anime.status && (
                    <div className={styles.statusBadge}>
                        {anime.status}
                    </div>
                )}
            </div>
            <div className={styles.content}>
                <Link href={`/anime/${anime.mal_id}/${encodedTitle}`}>
                    <h3 className={styles.title}>
                        {titleForUrl}
                    </h3>
                </Link>
                {anime.aired && (
                    <div className={styles.year}>
                        {new Date(anime.aired.from).getFullYear()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimeCard;
