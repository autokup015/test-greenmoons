import React, { useEffect, useState } from "react";
import "../css/login.scss";
import { Button, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// modal
import { DataUserModel, LoginFormModel, UserModel } from "../model/auth.models";

// component
import ModalRegister from "../components/modal/ModalRegister";
import ModalAlertText from "../components/modal/ModalAlertText";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { UPDATE_USERDATA } from "../redux/main";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isShowPassword, setIsShowPassword] = useState<Boolean>(false);
  const [isValidate, setIsValidate] = useState<Boolean>(false);
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [openModalText, setOpenModalText] = useState<Boolean>(false);
  const [error, setError] = useState("");

  let fetchApiOnce = true;

  useEffect(() => {
    if (fetchApiOnce) {
      fetchApiOnce = false;

      const checkAuth = localStorage.getItem("auth");

      if (checkAuth) {
        navigate("/");
      }
    }
  }, []);

  const timeExpired = 10;

  const [form, setForm] = useState<LoginFormModel | any>({
    username: "",
    password: "",
  });

  const handdleIsPassword = (): void => {
    setIsShowPassword(!isShowPassword);
  };

  const handleClose = (): void => {
    clearForm();
    setOpenModal(false);
  };

  const clearForm = (): void => {
    setForm({
      username: "",
      password: "",
    });
    setIsValidate(false);
    setError("");
  };

  const onLogin = async () => {
    setIsValidate(true);
    setError("");

    let isCheck = false;

    for (const key in form) {
      if (Object.prototype.hasOwnProperty.call(form, key)) {
        const x = form[key];

        if (!x) {
          isCheck = true;
          break;
        }
      }
    }

    if (isCheck) {
      return;
    }

    const getUserData = checkUserData();
    if (getUserData) {
      let finalLogin = {
        ...getUserData,
        date: getTimeStamp(),
      };

      await setTimeStampUser(finalLogin);

      finalLogin = {
        ...getUserData,
        date: JSON.stringify(getTimeStamp()),
      };

      dispatch(UPDATE_USERDATA(finalLogin));
      navigate("/");
    } else {
      setError("Username and password is wrong !");
    }
  };

  const checkUserData = (): any => {
    let getUserDate: any = localStorage.getItem("user_data");
    const finalUserDate: DataUserModel = JSON.parse(getUserDate);

    if (finalUserDate) {
      const findDate = finalUserDate.find((x) => {
        return x.username === form.username && x.password === form.password;
      });

      return findDate ? findDate : false;
    } else {
      // ! NO USER DATA GO REGISTER
      return false;
    }
  };

  const setTimeStampUser = (data: UserModel) => {
    return new Promise<Boolean>((resolve, reject) => {
      let getUserDate: any = localStorage.getItem("user_data");
      let finalUserDate: DataUserModel = JSON.parse(getUserDate);

      const finalChangeTime = finalUserDate.map((x) => {
        if (x.username === data.username) {
          x = data;
        }

        return x;
      });

      localStorage.setItem("user_data", JSON.stringify(finalChangeTime));

      resolve(true);
    });
  };

  const getTimeStamp = (): Date => {
    let date = new Date();
    date.setMinutes(date.getMinutes() + timeExpired);

    return date;
  };

  return (
    <div className="login">
      <div className="card-login">
        <div className="title">
          <h2>Login</h2>
        </div>
        <div className="detail">
          <div className="g-form">
            <TextField
              fullWidth
              error={isValidate && !form.username}
              id="username"
              name="username"
              label="Username"
              variant="standard"
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value,
                })
              }
              helperText={
                isValidate && !form.username ? "Please fill your Username" : ""
              }
            />
          </div>
          <div className="g-form">
            <div className="input">
              <TextField
                fullWidth
                error={isValidate && !form.password}
                id="password"
                name="password"
                label="Password"
                type={isShowPassword ? "text" : "password"}
                variant="standard"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                helperText={
                  isValidate && !form.password
                    ? "Please fill your Password"
                    : ""
                }
              />

              {isShowPassword ? (
                <VisibilityOffIcon
                  className="icon"
                  fontSize="small"
                  onClick={handdleIsPassword}
                />
              ) : (
                <VisibilityIcon
                  className="icon"
                  fontSize="small"
                  onClick={handdleIsPassword}
                />
              )}
            </div>
          </div>
          <p className="g-text red font-14 text-left">{error}</p>
        </div>
        <div className="footer">
          <Button
            className="g-btn btn-login"
            variant="outlined"
            onClick={onLogin}
          >
            Login
          </Button>

          <p
            className="g-text gray pointer max-w register "
            onClick={() => setOpenModal(true)}
          >
            You dont have account ?
          </p>
        </div>
      </div>
      <ModalRegister
        openModal={openModal}
        handleClose={handleClose}
        setOpenModalText={setOpenModalText}
      />
      <ModalAlertText
        openModalText={openModalText}
        setOpenModalText={setOpenModalText}
      />
    </div>
  );
}

export default Login;
