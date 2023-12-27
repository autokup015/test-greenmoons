import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../../css/modal/ModalRegister.scss";

import {
  DataUserModel,
  RegisterFormModel,
  UserModel,
} from "../../model/auth.models";

// function ModalRegister(props: { openModal: Boolean; handleClose: Function }) {
function ModalRegister({ openModal, handleClose, setOpenModalText }: any) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
  };

  const [register, setRegister] = useState<RegisterFormModel | any>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [textErr, setTextErr] = useState<String>("");
  const [isValidate, setIsValidate] = useState<Boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (!openModal) {
      clearRegister();
    }
  }, [openModal]);

  const clearRegister = (): void => {
    setIsValidate(false);

    setRegister({
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  const onRegister = (): void => {
    setIsValidate(true);
    setTextErr("");

    let isCheck = false;

    for (const key in register) {
      if (Object.prototype.hasOwnProperty.call(register, key)) {
        const x = register[key];
        if (!x) {
          isCheck = true;
          break;
        }
      }
    }

    if (isCheck) {
      return;
    }

    // validate password
    if (register.password !== register.confirmPassword) {
      setTextErr("Password and Confirm password not match");
      return;
    }

    const finalRegister = {
      ...register,
      date: "",
      favorite: [],
    };

    delete finalRegister.confirmPassword;

    let getUserData = localStorage.getItem("user_data");

    if (getUserData) {
      let changeData: DataUserModel = JSON.parse(getUserData);

      const checkDuplicate = findDuplicate(changeData, finalRegister);

      // ! when data have duplicate username
      if (checkDuplicate) {
        setTextErr("Username is duplicate");
      } else {
        const finalAddNewUser = [...changeData, finalRegister];
        localStorage.setItem("user_data", JSON.stringify(finalAddNewUser));
        clearRegister();
        handleClose();
        setOpenModalText(true);
      }
    } else {
      localStorage.setItem("user_data", JSON.stringify([finalRegister]));
      clearRegister();
      handleClose();
      setOpenModalText(true);
    }
  };

  const findDuplicate = (arr: DataUserModel, obj: UserModel): Boolean => {
    const findDup = arr.some((x) => {
      return x.username === obj.username;
    });

    return findDup;
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-register"
        aria-describedby="modal-modal-register-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-register"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Register
          </Typography>
          <div id="modal-modal-register-description">
            <div className="g-form">
              <TextField
                fullWidth
                error={isValidate && !register.username}
                id="username"
                name="username"
                label="Username"
                variant="standard"
                type="text"
                value={register.username}
                onChange={(e) =>
                  setRegister({
                    ...register,
                    username: e.target.value,
                  })
                }
                helperText={
                  isValidate && !register.username
                    ? "Please fill your Username"
                    : ""
                }
              />
            </div>
            <div className="g-form">
              <div className="input">
                <TextField
                  fullWidth
                  error={isValidate && !register.password}
                  id="password"
                  name="password"
                  label="Password"
                  variant="standard"
                  type={isShowPassword.password ? "text" : "password"}
                  value={register.password}
                  onChange={(e) =>
                    setRegister({
                      ...register,
                      password: e.target.value,
                    })
                  }
                  helperText={
                    isValidate && !register.password
                      ? "Please fill your password"
                      : ""
                  }
                />
                <div
                  onClick={() =>
                    setIsShowPassword({
                      ...isShowPassword,
                      password: !isShowPassword.password,
                    })
                  }
                >
                  {isShowPassword.password ? (
                    <VisibilityOffIcon className="icon" fontSize="small" />
                  ) : (
                    <VisibilityIcon className="icon" fontSize="small" />
                  )}
                </div>
              </div>
            </div>
            <div className="g-form">
              <div className="input">
                <TextField
                  fullWidth
                  error={isValidate && !register.confirmPassword}
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm password"
                  variant="standard"
                  type={isShowPassword.confirmPassword ? "text" : "password"}
                  value={register.confirmPassword}
                  onChange={(e) =>
                    setRegister({
                      ...register,
                      confirmPassword: e.target.value,
                    })
                  }
                  helperText={
                    isValidate && !register.confirmPassword
                      ? "Please fill your confirm password"
                      : ""
                  }
                />
                <div
                  onClick={() =>
                    setIsShowPassword({
                      ...isShowPassword,
                      confirmPassword: !isShowPassword.confirmPassword,
                    })
                  }
                >
                  {isShowPassword.confirmPassword ? (
                    <VisibilityOffIcon className="icon" fontSize="small" />
                  ) : (
                    <VisibilityIcon className="icon" fontSize="small" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <p className="g-text font-14 red">{textErr}</p>
          <div className="footer">
            <Button
              className="g-btn btn-register"
              variant="outlined"
              onClick={onRegister}
            >
              Register
            </Button>
            <p
              className="g-text gray pointer max-w have-account"
              onClick={handleClose}
            >
              Do you have account ?
            </p>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default ModalRegister;
