import { Avatar, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuModels } from "../model/layout.models";

// ! css this component use layout

function Sidebar() {
  const userDetail = useSelector((state: any) => state.main.userDetail);
  const navigate = useNavigate();
  const router = useLocation();

  const menu = [
    {
      id: 1,
      text: "Movie Finder",
      router: "/",
    },
    {
      id: 2,
      text: "My Favorite",
      router: "/favorite",
    },
  ];

  const onLogout = (): void => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const handleNavigate = (value: MenuModels): void => {
    navigate(value.router);
  };

  return (
    <>
      <div className="sidebar">
        <div className="detail">
          <h2 className="g-text title">Welcome</h2>
          <div className="user-profile">
            <Avatar
              alt="Travis Howard"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4xeuHkjhpmlOsTOfvtZiet8x4BrGKBPOznA&usqp=CAU"
              sx={{ width: 56, height: 56 }}
            />
            <h4 className="g-text name">Khun : {userDetail.username}</h4>
          </div>
          {menu.map((x) => {
            return (
              <div
                key={x.id}
                className={`list-menu ${
                  router.pathname === x.router ? "active" : ""
                }`}
                onClick={() => handleNavigate(x)}
              >
                <h3>{x.text}</h3>
              </div>
            );
          })}

          <div className="footer">
            <Button className="g-btn" variant="outlined" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
