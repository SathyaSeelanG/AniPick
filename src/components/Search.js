import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { IoMdClose } from "react-icons/io"; // Cancel icon from react-icons
import styles from "../styles/Search.module.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [animeResults, setAnimeResults] = useState([]);
  const [isHovered, setIsHovered] = useState(false); // Track mouse hover
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      const searchUrl = `https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=5`; // Get 5 results
      try {
        const response = await axios.get(searchUrl);
        console.log("Search response:", response.data); // Debugging the response
        setAnimeResults(response.data.data); // Store results for rendering
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    } else {
      setAnimeResults([]); // Clear results if search query is empty
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setAnimeResults([]); // Clear results when search is cleared
  };

  useEffect(() => {
    const handleMouseMove = () => setIsHovered(false);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Search Anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <IoMdClose
              className={styles.clearIcon}
              onClick={handleClearSearch} // Clear search on click
            />
          )}
        </div>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {animeResults.length > 0 && searchQuery && (
        <div className={styles.resultsContainer}>
          <ul className={styles.resultsList}>
            {animeResults.map((anime) => (
              <li key={anime.mal_id} className={styles.resultItem}>
                <Link
                  href={`/anime/${anime.mal_id}/${encodeURIComponent(
                    anime.title_english || anime.title
                  )}`}
                >
                  <h4>{anime.title_english || anime.title}</h4>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
