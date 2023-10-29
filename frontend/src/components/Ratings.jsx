import React from "react";
import { FaRegStar, FaStar, FaStarHalf } from "react-icons/fa";
import styles from "./Ratings.module.scss";

function Ratings({ value, text }) {
  return (
    <div className={styles.ratings}>
      <span>
        {value >= 1 ? (
          <FaStar />
        ) : value >= 0.5 ? (
          <FaStarHalf />
        ) : (
          <FaRegStar />
        )}
        {value >= 2 ? (
          <FaStar />
        ) : value >= 1.5 ? (
          <FaStarHalf />
        ) : (
          <FaRegStar />
        )}
        {value >= 3 ? (
          <FaStar />
        ) : value >= 2.5 ? (
          <FaStarHalf />
        ) : (
          <FaRegStar />
        )}
        {value >= 4 ? (
          <FaStar />
        ) : value >= 3.5 ? (
          <FaStarHalf />
        ) : (
          <FaRegStar />
        )}
        {value >= 5 ? (
          <FaStar />
        ) : value >= 4.5 ? (
          <FaStarHalf />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span className={styles.rating_text}>{text && text}</span>
    </div>
  );
}

export default Ratings;
