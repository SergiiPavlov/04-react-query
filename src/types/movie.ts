// Общие типы для приложения поиска фильмов

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;

  // пути к изображениям из TMDB (оба встречаются в ответе search/movie)
  poster_path: string | null;
  backdrop_path: string | null;
}

/**
 * Полный тип ответа TMDB для поиска фильмов.
 * Важное поле для пагинации — total_pages.
 */
export interface TMDBSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
