import React from "react";
import s from "./LoadingIndicator.module.css";

export const LoadingIncdicator: React.FC = () => {
  return (
    <div className={s.loading_indicator}>
      <div className={s.loading_indicator__point}></div>
    </div>
  );
};
