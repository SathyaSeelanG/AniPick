import Image from "next/image";
import Link from "next/link";
import styles from "../styles/AnimeCard.module.css";

const AnimeCard = ({ anime }) => {
  return (
    <div className={styles.card}>
      <Link href={`/anime/${anime.mal_id}/${encodeURIComponent(anime.title_english)}`}>
        <Image
          src={anime.images.jpg.image_url}
          alt={anime.title_english || anime.title}
          width={200}
          height={280}
          className={styles.image}
        />
      </Link>
      <h3 className={styles.title}>{anime.title_english || anime.title}</h3>
      <p className={styles.episodes}>Episodes: {anime.episodes ?? "N/A"}</p>
    </div>
  );
};

export default AnimeCard;
