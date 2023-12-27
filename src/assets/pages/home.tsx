import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Services from "../services/services";
import { MovieArrayModel } from "../model/movie.models";
import MovieCard from "../components/home/MovieCard";
import { Grid } from "@mui/material";

import { UPDATE_LOADING } from "../redux/main";

function Home() {
  const dispatch = useDispatch();
  const userDetail = useSelector((state: any) => state.main.userDetail);
  const [movie, setMovie] = useState<MovieArrayModel[]>([]);

  let fetchApiOnce = true;
  useEffect(() => {
    if (fetchApiOnce) {
      fetchApiOnce = false;
      getMovieData();
    }
  }, []);

  const getMovieData = async () => {
    dispatch(UPDATE_LOADING(true));

    const getData = await Services.movie.getMovieDate();

    setMovie(getData.movies);
    dispatch(UPDATE_LOADING(false));
  };

  return (
    <>
      <h2 className="g-text title mb-2">Movie Finder</h2>

      <Grid container spacing={2}>
        {movie.length > 0 &&
          movie.map((x) => {
            return (
              <Grid key={x.id} item lg={3} md={4} sm={6}>
                <MovieCard
                  data={x}
                  userDetail={userDetail}
                  removeFavorite={null}
                />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}

export default Home;
