import axios from 'axios';
import type { Movie } from '../types/movie';

const TMDB_BASE = 'https://api.themoviedb.org/3';
const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

export interface FetchMoviesParams {
  query: string;
  page?: number;
}

export interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export function getImageUrl(path: string | null, size: 'w500' | 'original' = 'w500') {
  if (!path) return '';
  const base = 'https://image.tmdb.org/t/p/';
  return `${base}${size}${path}`;
}

export async function fetchMovies({ query, page = 1 }: FetchMoviesParams): Promise<FetchMoviesResponse> {
  if (!TOKEN) {
    throw new Error('Missing TMDB token. Put it to .env as VITE_TMDB_TOKEN');
  }

  const config = {
    params: { query, page, include_adult: false, language: 'en-US' },
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

 
  const { data } = await axios.get<FetchMoviesResponse>(`${TMDB_BASE}/search/movie`, config);
  return data;
}

