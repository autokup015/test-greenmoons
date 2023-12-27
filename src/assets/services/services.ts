import Axios from "axios";
import { MovieServices } from "./movie/movie.services";

const api = Axios.create({
  baseURL: "https://www.majorcineplex.com/apis",
});

api.interceptors.request.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

const Services = {
  movie: new MovieServices(api),
};

export default Services;
