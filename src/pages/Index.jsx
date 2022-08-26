import React from "react";
import { useEffect, useState } from "react";
import "../styles/index.css";
import HomeCard from "../components/HomeCard";

export default function Body() {
  const [popularMovie, setPopularMovie] = useState([]);
  const [popularSerie, setPopularSerie] = useState([]);
  const [tendringMovie, setTrendingMovie] = useState([]);


  const trendingMov =
    tendringMovie[Math.floor(Math.random() * tendringMovie.length)];

  async function getPopularMovie() {
    await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=ee2648f9f1e9bd8b7424b1f5bb21b561"
    )
      .then((response) => response.json())
      .then((json) => setPopularMovie(json.results));
  }

  async function getPopularSeries() {
    await fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=ee2648f9f1e9bd8b7424b1f5bb21b561"
    )
      .then((response) => response.json())
      .then((json) => setPopularSerie(json.results));
  }
  async function getTrendingMovies() {
    await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=ee2648f9f1e9bd8b7424b1f5bb21b561"
    )
      .then((response) => response.json())
      .then((json) => setTrendingMovie(json.results));
  }

  useEffect(() => {
    getPopularMovie();
    getPopularSeries();
    getTrendingMovies();
  }, []);


  return (
    <div className="min-h-screen bg-slate-600 p-9 flex flex-col gap-5">
      <div className="estreno h-[30rem] w-full rounded-xl mb-40">
        {/* <img
          className="h-full w-full object-cover rounded-xl"
          src={getImageURL(trendingMov?.backdrop_path)}
          alt={getImageURL(trendingMov?.title)}
        /> */}
      </div>
      <div className="flex justify-between text-white px-5">
        <h1 className="text-xl">Popular Movies</h1>
        <h1 className="text-xl">All Movies</h1>
      </div>
      <div className="h-2/3 w-full flex gap-5 overflow-x-auto pb-2">
        {popularMovie.map((movie, index) => {
          return (
            <div key={index} className="w-full h-full ">
              <HomeCard key={index} catalogo={movie} />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-white px-5">
        <h1 className="text-xl">Popular Series</h1>
        <h1 className="text-xl">All Series</h1>
      </div>

      <div className="h-2/3 w-full flex gap-5 overflow-x-auto pb-2">
        {popularSerie.map((serie, index) => {
          return (
            <div key={index} className="w-full h-full ">
              <HomeCard key={index} catalogo={serie} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
