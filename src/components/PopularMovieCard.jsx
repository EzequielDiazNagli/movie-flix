import React from "react";

const getImageURL = (posterpath) => {
  return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`;
};

export default function PopularMovieCard({ movie }) {
    console.log(movie);
    return (
        <div className="w-56 h-full bg-white rounded-xl movieCard">
        <img
            className="h-full w-full object-cover rounded-xl"
            src={getImageURL(movie.poster_path)}
            alt={movie.title}
        />
        <div className='movieCard-description'>
            <h1>{movie.title}</h1>
            <h2>{movie.release_date}</h2>
            <button> Read More
            <span></span>
            </button>
        </div>
        </div>
    );
}
