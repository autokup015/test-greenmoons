import { MovieDetails } from "../../model/movie.models";
import { UtilsServices } from "../utils/utils.services";

export class MovieServices extends UtilsServices {
  private $axios: any;

  constructor($axios: any) {
    super();
    this.$axios = $axios;
  }

  async getMovieDate(): Promise<MovieDetails> {
    const { data } = await this.$axios.get(`/get_movie_avaiable`);
    const response: MovieDetails = data;

    this.handleTimeStamp();

    return response;
  }
}
