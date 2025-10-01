import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import styles from './App.module.css';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setError(false);
    setMovies([]);
    setLoading(true);
    try {
      const data = await fetchMovies({ query });
      if (!data.results.length) {
        toast.error('No movies found for your request.');
      }
      setMovies(data.results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <main className={styles.app}>
        {loading && <Loader />}
        {!loading && error && <ErrorMessage />}
        {!loading && !error && <MovieGrid movies={movies} onSelect={setSelected} />}
      </main>
      <MovieModal movie={selected} onClose={() => setSelected(null)} />
      <Toaster position="top-center" />
    </>
  );
}
