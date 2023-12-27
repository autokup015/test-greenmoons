import React from "react";
import "../css/nopage.scss";
import { useNavigate } from "react-router-dom";

function Nopage() {
  const navigate = useNavigate();

  const goHome = (): void => {
    navigate("/");
  };
  return (
    <div className="no-page">
      <div className="box-nopage">
        <div>
          <h1 className="g-text gray">No page naja eiei</h1>
          <h1 className="g-text gray underline pointer" onClick={goHome}>
            Pai nar home kun mai kup
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Nopage;
