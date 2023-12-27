import React, { useEffect, useState } from "react";
import Services from "../services/services";
import { MovieDetails, MovieArrayModel } from "../model/movie.models";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import "../css/favorite.scss";
import { UPDATE_LOADING } from "../redux/main";

import MovieCard from "../components/home/MovieCard";

function Favorite() {
  const dispatch = useDispatch();
  const userDetail = useSelector((state: any) => state.main.userDetail);

  const [movieFavorite, setMovieFavorite] = useState<MovieArrayModel[]>([]);

  let fetchApiOnce = true;
  useEffect(() => {
    if (fetchApiOnce) {
      fetchApiOnce = false;
      getMovieData();
    }
  }, []);

  const getMovieData = async (): Promise<MovieDetails | any> => {
    dispatch(UPDATE_LOADING(true));

    const getData = await Services.movie.getMovieDate();

    const getFavorite = getData.movies.filter((x: MovieArrayModel) => {
      if (userDetail.favorite.includes(x.id)) {
        return x;
      }
    });

    setMovieFavorite(getFavorite);
    dispatch(UPDATE_LOADING(false));
  };

  const removeFavorite = (id: number): any => {
    const filterMovies = movieFavorite.filter((x) => {
      return x.id !== id;
    });
    setMovieFavorite(filterMovies);
  };
  return (
    <div className="favorite">
      <h2 className="g-text title">Favorite Movies</h2>
      <Grid container spacing={2}>
        {movieFavorite.length > 0 &&
          movieFavorite.map((x) => {
            return (
              <Grid key={x.id} item lg={3} md={4} sm={6}>
                <MovieCard
                  data={x}
                  userDetail={userDetail}
                  removeFavorite={removeFavorite}
                />
              </Grid>
            );
          })}
      </Grid>

      {movieFavorite.length === 0 && (
        <div className="no-data">
          <h3 className="g-text gray">No favorite movies</h3>
        </div>
      )}
    </div>
  );
}

export default Favorite;
