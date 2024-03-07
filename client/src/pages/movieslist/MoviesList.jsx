import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import movieslist from './movieslist.css'
const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axios.get(`/movies`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovies(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getMovies();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='cards'>
        {movies.map((movie) => (
          <div key={movie._id} className="card">
            <a href={movie.video}>
              <img
                src={movie.imgSm}
                alt={movie.title}
              a/>
            </a>
            <div className="card-details">
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
