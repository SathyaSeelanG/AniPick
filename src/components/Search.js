import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Search.module.css';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            try {
                const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchTerm}&sfw`);
                const data = await response.json();
                
                // Store the search results in localStorage
                localStorage.setItem('searchResults', JSON.stringify(data.data));
                
                // Navigate to search results page
                router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
            } catch (error) {
                console.error('Search error:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.searchForm}>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search anime..."
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                    <FaSearch />
                </button>
            </div>
        </form>
    );
};

export default Search;
