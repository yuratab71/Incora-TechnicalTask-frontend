import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./circularProgress.css";

const CircularProgressCustom = () => {
  return (
    <div className="progress_container">
      <div>
        <CircularProgress />
      </div>
    </div>
  );
};

export default CircularProgressCustom;
