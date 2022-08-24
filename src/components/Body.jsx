import React from "react";
import { useEffect, useState } from "react";
import "./body.css";
import PopularMovieCard from "./PopularMovieCard";

export default function Body() {
  const [popularMovie, setPopularMovie] = useState([])
  async function getDataFromAPI() {
    await fetch("https://api.themoviedb.org/3/movie/popular?api_key=ee2648f9f1e9bd8b7424b1f5bb21b561")
      .then((response) => response.json())
      .then((json) => setPopularMovie(json.results));
  }
  useEffect(() => {
    getDataFromAPI();
  },[]) 

  // console.log(popularMovie);

  return (
    <div>
      <div className="h-screen bg-slate-600 p-9 flex flex-col gap-5">
        <div className="estreno h-1/3 w-full bg-red-500 rounded-xl"></div>
        <div className="flex justify-between text-white px-5">
          <h1 className="text-xl">Popular Movies</h1>
          <h1 className="text-xl">All Movies</h1>
        </div>
        <div className="h-1/3 w-full flex gap-5">
        {popularMovie.map((movie, index) => {
          return (
            <PopularMovieCard key={index} movie={movie}/>
          )
        })}
        </div>
        <div className="flex justify-between text-white px-5">
          <h1 className="text-xl">Popular Series</h1>
          <h1 className="text-xl">All Series</h1>
        </div>
        <div className="h-1/3 w-full flex gap-5 rounded-xl">
          <div className="w-1/3 bg-white rounded-xl"></div>
          <div className="w-1/3 bg-yellow-600 rounded-xl"></div>
          <div className="w-1/3 bg-slate-700 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
