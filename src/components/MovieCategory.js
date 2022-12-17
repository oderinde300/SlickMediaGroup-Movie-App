import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import "./MovieCategory.css";

const MovieCategory = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const val = 1;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://www.omdbapi.com/?s=cow&plot=full&apikey=86172ef8`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError("No Movies Found!");
        setMovies([]);
        console.log(error.message);
      });
  }, [val, error]);

  const searchTermHandler = (event) => {
    setSearchTerm(event.target.value);
    if (searchTerm.length >= 3) {
      setIsLoading(true);
      fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&plot=full&apikey=86172ef8`
      )
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.Search);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setError("No Movies Found!");
          setMovies([]);
          console.log(error.message);
        });
    }
  };

  return (
    <>
      <div className="SearchBar">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={searchTermHandler}
        />
      </div>
      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && movies && (
        <section className="MovieCategory">
          <p className="movie-category-name">
            {searchTerm.toLocaleUpperCase() || "COW"}
          </p>
          <div className="movies-container">
            {movies.map((movie) => (
              <Movie
                key={movie.imdbID}
                title={movie.Title}
                src={movie.Poster}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default MovieCategory;
