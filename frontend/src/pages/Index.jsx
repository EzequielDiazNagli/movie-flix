import React from "react";
import "../styles/index.css";
import Carrusel from "../components/Carrusel"
import LasteMovies from "../components/LasteMovies";

export default function Body() {

  return (
    <div className="min-h-screen bg-slate-600 flex flex-col">
      <div className="estreno h-[50vh] w-full rounded-xl">
        <Carrusel/>
      </div>
      <div className="bodyIndex h-[50vh] p-5 flex flex-col gap-5">
        <div className="flex justify-center sm:justify-between text-white px-5">
          <h1 className="text-lg sm:text-2xl">Now Playing</h1>
          {/* <h1 className="text-base sm:text-2xl">All Movies</h1> */}
        </div>
          <LasteMovies/>
      </div>
    </div>
  );
}
