import { Outlet, useNavigate } from "react-router-dom";
import "../css/layout.scss";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DataUserModel } from "../model/auth.models";

import { useDispatch } from "react-redux";
import { UPDATE_USERDATA } from "../redux/main";

import BackDrop from "../components/Backdrop";

const HandleLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetail = useSelector((state: any) => state.main.userDetail);
  const isLoading = useSelector((state: any) => state.main.isLoading);

  const [isRender, setIsRender] = useState(false);

  let fetchApiOnce = true;

  useEffect(() => {
    if (fetchApiOnce) {
      fetchApiOnce = false;

      if (userDetail?.username) {
        setIsRender(true);
      } else {
        checkExpiredUser();
      }
    }
  }, []);

  const checkExpiredUser = (): void => {
    const getAuthName = localStorage.getItem("auth");
    const getUserData: any = localStorage.getItem("user_data");

    let changeData: DataUserModel = JSON.parse(getUserData);

    if (!changeData) {
      navigate("/login");
      return;
    }

    const findUser = changeData.find((x) => {
      return x.username === getAuthName;
    });

    if (!findUser) {
      clearAuth();
    } else {
      checkExpiredDate(findUser);
    }
  };

  const checkExpiredDate = (findUser: any): void => {
    const newDate = new Date();
    const oldDate = new Date(findUser.date);

    if (newDate > oldDate) {
      // ? expired
      clearAuth();
    } else {
      // ? no expired
      setUserDetail(findUser);
    }
  };

  const clearAuth = (): void => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const setUserDetail = (findUser: any): void => {
    dispatch(UPDATE_USERDATA(findUser));
    setIsRender(true);
  };

  return (
    <>
      {isRender && (
        <div className="g-container layout">
          <Sidebar />

          <div className="render-app">
            <Outlet />
          </div>

          <BackDrop isLoading={isLoading} />
        </div>
      )}
    </>
  );
};

export default HandleLayout;
