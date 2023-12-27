import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "../../css/moviecard.scss";

import { MovieArrayModel } from "../../model/movie.models";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { UserModel } from "../../model/auth.models";

import { UPDATE_FAVORITE_MOViE } from "../../redux/main";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function MovieCard(props: {
  data: MovieArrayModel;
  userDetail: UserModel;
  removeFavorite: Function | null;
}) {
  const { data, userDetail, removeFavorite } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goDetailMovie = (id: number) => {
    navigate(`/detail/${id}`);
  };

  const handleFavorite = (value: MovieArrayModel) => {
    let arrFavorite: any = [...userDetail.favorite];

    const checkFavorite = arrFavorite.some((x: number) => {
      return x === value.id;
    });

    if (!checkFavorite) {
      arrFavorite = [...arrFavorite, value.id];
    } else {
      arrFavorite = arrFavorite.filter((x: number) => {
        return x !== value.id;
      });
    }

    dispatch(UPDATE_FAVORITE_MOViE(arrFavorite));

    // use for remove state from favorite pages
    if (removeFavorite) {
      removeFavorite(value.id);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        onClick={() => goDetailMovie(data.id)}
        sx={{ height: 250 }}
        image={data.poster_url}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="p">
          {data.title_en}
          <FavoriteIcon
            className={`icon-favorite ${
              userDetail.favorite.includes(data.id) ? "active" : ""
            }`}
            fontSize="large"
            onClick={() => handleFavorite(data)}
          />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.synopsis_en}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
