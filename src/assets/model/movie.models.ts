// export type MovieDetails = MovieArrayModel[];

// export interface MovieArrayModel {
//   id: number;
//   movieCode?: string[];
//   title_en: string;
//   title_th: string;
//   rating: string;
//   rating_id: number;
//   duration: number;
//   release_date: string;
//   sneak_date: string;
//   synopsis_th: string;
//   synopsis_en: string;
//   director: string;
//   actor: string;
//   genre: string;
//   poster_ori: string;
//   poster_url: string;
//   trailer: string;
//   tr_ios?: string;
//   tr_hd?: string;
//   tr_sd?: string;
//   tr_mp4: string;
//   priority?: string;
//   now_showing?: string;
//   advance_ticket?: string;
//   date_update: string;
//   show_buyticket?: string;
//   trailer_cms_id: string;
//   trailer_ivx_key?: string;
// }

export interface MovieDetails {
  movies: MovieArrayModel[];
}

export interface MovieArrayModel {
  id: number;
  movieCode?: string[];
  title_en: string;
  title_th: string;
  rating: string;
  rating_id: number;
  duration: number;
  release_date: string;
  sneak_date: string;
  synopsis_th: string;
  synopsis_en: string;
  director: string;
  actor: string;
  genre: string;
  poster_ori: string;
  poster_url: string;
  trailer: string;
  tr_ios?: string;
  tr_hd?: string;
  tr_sd?: string;
  tr_mp4: string;
  priority?: string;
  now_showing?: string;
  advance_ticket?: string;
  date_update: string;
  show_buyticket?: string;
  trailer_cms_id: string;
  trailer_ivx_key?: string;
}
