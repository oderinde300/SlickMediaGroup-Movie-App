import React from "react";
import "./Movie.css";

const Movie = ({ src, title }) => {
  return (
    <div className="movie">
      <img className="movie-image" src={src} alt={title} />
    </div>
  );
};

export default Movie;
