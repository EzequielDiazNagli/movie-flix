import React from "react";

const getImageURL = (posterpath) => {
  return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`;
};

export default function PopularSerieCard({ serie }) {
  // console.log(serie);
  return (
    <div className="w-56 h-full bg-white rounded-xl">
      <img
        className="h-full w-full object-cover rounded-xl"
        src={getImageURL(serie.poster_path)}
        alt={serie.title}
      />
    </div>
  );
}
