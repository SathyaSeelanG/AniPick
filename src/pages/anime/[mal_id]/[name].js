import axios from "axios";
import Image from "next/image";
import styles from "../../../styles/Anime.module.css";
import Layout from "../../../components/Layout";

export async function getServerSideProps({ params }) {
  const { mal_id } = params;
  const res = await axios.get(`https://api.jikan.moe/v4/anime/${mal_id}`);
  const animeDetails = res.data.data;

  return {
    props: {
      animeDetails,
    },
  };
}

export default function AnimeDetails({ animeDetails }) {
  return (
    <>
      <Layout title={`${animeDetails.title} | AniPick`}>
        <div className={styles.container}>
          <div className={styles.imageSection}>
            <Image
              src={animeDetails.images.jpg.large_image_url}
              alt={animeDetails.title}
              width={400}
              height={600}
              layout="responsive"
            />
          </div>

          <div className={styles.detailsSection}>
            <h1 className={styles.title}>{animeDetails.title}</h1>
            <div className={styles.details}>
              <p>
                <strong>Rank:</strong> {animeDetails.rank}
              </p>
              <p>
                <strong>Source:</strong> {animeDetails.source}
              </p>
              <p>
                <strong>Popularity:</strong> {animeDetails.popularity}
              </p>
              <p>
                <strong>Duration:</strong> {animeDetails.duration}
              </p>
              <p>
                <strong>Episodes:</strong> {animeDetails.episodes || "TBA"}
              </p>
              <p>
                <strong>Rating:</strong> {animeDetails.rating}
              </p>
              <p>
                <strong>Status:</strong> {animeDetails.status}
              </p>
              <p>
                <strong>Score:</strong> {animeDetails.score}
              </p>
            </div>

            <h2 className={styles.sectionTitle}>Synopsis</h2>
            <p className={styles.synopsis}>{animeDetails.synopsis}</p>

            <h2 className={styles.sectionTitle}>Broadcast Information</h2>
            <p>
              <strong>Season:</strong> {animeDetails.season} {animeDetails.year}
            </p>
            <p>
              <strong>Broadcast:</strong> {animeDetails.broadcast.string}
            </p>
          </div>

          {/* Extra info sections below the image */}
          <div className={styles.extraInfo}>
            <div className={styles.extraSection}>
              <h2>Studios</h2>
              <ul className={styles.list}>
                {animeDetails.studios.map((studio) => (
                  <li key={studio.mal_id}>
                    <a
                      href={studio.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {studio.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.extraSection}>
              <h2>Genres</h2>
              <ul className={styles.list}>
                {animeDetails.genres.map((genre) => (
                  <li key={genre.mal_id}>
                    <a
                      href={genre.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {genre.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.extraSection}>
              <h2>Themes</h2>
              <ul className={styles.list}>
                {animeDetails.themes.map((theme) => (
                  <li key={theme.mal_id}>
                    <a
                      href={theme.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {theme.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.extraSection}>
              <h2>Producers</h2>
              <ul className={styles.list}>
                {animeDetails.producers.map((producer) => (
                  <li key={producer.mal_id}>
                    <a
                      href={producer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {producer.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
