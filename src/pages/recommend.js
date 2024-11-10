import React, { useState, useEffect } from "react";
import AnimeCard from "../components/AnimeCard"; // Assuming you have an AnimeCard component
import styles from "../styles/AnimeRecommendation.module.css";
import Layout from "../components/Layout";

const AnimeRecommendation = () => {
  // Predefined list of genres and their corresponding Jikan genre IDs
  const genreIds = {
    Action: 1,
    Adventure: 2,
    Comedy: 4,
    Drama: 8,
    Fantasy: 10,
    Isekai: 12,
    Romance: 22,
    SciFi: 24,
    Mystery: 28,
    SliceOfLife: 36,
  };

  const [genres, setGenres] = useState(Object.keys(genreIds)); // Set genre keys as options
  const [genre, setGenre] = useState(""); // Default to empty genre
  const [animeList, setAnimeList] = useState([]);
  const [displayedAnimes, setDisplayedAnimes] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch anime recommendations based on genre
  const fetchAnimeRecommendations = async (genreId) => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?genres=${genreId}`
      );
      const data = await response.json();
      return data.data; // Return the list of anime for the selected genre
    } catch (error) {
      setError("Failed to fetch anime recommendations.");
      console.error(error);
      return [];
    }
  };

  // Fetch anime list when genre changes
  useEffect(() => {
    if (genre) {
      const selectedGenreId = genreIds[genre]; // Get the genre ID based on the selected genre name
      if (selectedGenreId) {
        fetchAnimeRecommendations(selectedGenreId)
          .then((animes) => {
            setAnimeList(animes);
            setDisplayedAnimes(getRandomAnimes(animes, 2)); // Display 2 random animes initially
          })
          .catch((err) => setError(err.message));
      }
    }
  }, [genre]);

  // Function to select random anime from the list
  const getRandomAnimes = (animeList, count) => {
    const shuffledAnimes = animeList.sort(() => 0.5 - Math.random());
    return shuffledAnimes.slice(0, count);
  };

  // Handle the "Recommend Another" button click
  const recommendAnother = () => {
    setDisplayedAnimes(getRandomAnimes(animeList, 2)); // Select 2 more random animes
  };

  return (
    <>
      <Layout>
        <div className={styles.recommendationContainer}>
          <h2>Anime Recommendation Based on Genre</h2>

          {/* Genre Selection */}
          <div className={styles.filterSection}>
            <label htmlFor="genre">Select Genre:</label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">--Select Genre--</option>
              {genres.map((genreName) => (
                <option key={genreName} value={genreName}>
                  {genreName}
                </option>
              ))}
            </select>
          </div>

          {/* Displaying Error */}
          {error && <p>{error}</p>}

          {/* Displaying Recommended Animes */}
          <div className={styles.resultsContainer}>
            {displayedAnimes.length > 0 ? (
              <div className={styles.resultsGrid}>
                {displayedAnimes.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            ) : (
              <p>No recommendations found. Try changing your filters!</p>
            )}
          </div>

          {/* Recommend Another Button */}
          <button className={styles.recommendButton} onClick={recommendAnother}>
            Recommend Another
          </button>
        </div>
      </Layout>
    </>
  );
};

export default AnimeRecommendation;
