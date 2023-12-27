import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Services from "../services/services";
import { MovieArrayModel } from "../model/movie.models";
import "../css/detail.scss";
import { Grid, Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_FAVORITE_MOViE } from "../redux/main";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { UPDATE_LOADING } from "../redux/main";

export default function Detail() {
  const params = useParams();
  const dispatch = useDispatch();
  const userDetail = useSelector((state: any) => state.main.userDetail);

  const [dataMovie, setDataMovie] = useState<MovieArrayModel | null>(null);
  const [isRender, setIsRender] = useState(false);

  let fetchApiOnce = true;
  useEffect(() => {
    if (fetchApiOnce) {
      fetchApiOnce = false;
      getMovieData();
    }
  }, []);

  const getMovieData = async () => {
    dispatch(UPDATE_LOADING(true));

    const getData: any = await Services.movie.getMovieDate();

    const findMovies = getData.movies.find((x: MovieArrayModel) => {
      return x.id === Number(params.id);
    });

    setDataMovie(findMovies);
    dispatch(UPDATE_LOADING(false));
    setIsRender(true);
  };

  const handleFavorite = (value: MovieArrayModel | null) => {
    let arrFavorite: any = [...userDetail.favorite];

    const checkFavorite = arrFavorite.some((x: number) => {
      return x === value?.id;
    });

    if (!checkFavorite) {
      arrFavorite = [...arrFavorite, value?.id];
    } else {
      arrFavorite = arrFavorite.filter((x: number) => {
        return x !== value?.id;
      });
    }

    dispatch(UPDATE_FAVORITE_MOViE(arrFavorite));
  };

  return (
    <div className="detail">
      {isRender && (
        <>
          {/* <h2 className="g-text title">{dataMovie?.title_en}</h2> */}
          <h2 className="g-text title">Movie Details</h2>

          <Grid container spacing={2}>
            <Grid item md={4} sm={12}>
              <div className="box-movie">
                <img className="img-movie " src={dataMovie?.poster_url} />
                <FavoriteIcon
                  className={`icon-favorite ${
                    userDetail.favorite.includes(dataMovie?.id) ? "active" : ""
                  }
              `}
                  fontSize="large"
                  onClick={() => handleFavorite(dataMovie)}
                />
                <Rating
                  name="read-only"
                  value={dataMovie?.rating_id}
                  readOnly
                />
              </div>
            </Grid>
            <Grid item md={8} sm={12}>
              <div className="detail-movie">
                <h4>
                  Movie :
                  <span className="secound">
                    {dataMovie?.title_en} ( {dataMovie?.title_th} )
                  </span>
                </h4>
              </div>
              <div className="detail-movie">
                <h4>
                  Genre :<span className="secound">{dataMovie?.genre}</span>
                </h4>
              </div>
              <div className="detail-movie">
                <h4>
                  Synopsis :
                  <span className="secound">{dataMovie?.synopsis_en}</span>
                </h4>
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}
