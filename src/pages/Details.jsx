import React from 'react'
import "../styles/details.css"
import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";


export default function Details() {

  const [movie, setMovie] = useState();
  console.log(movie);
  const [cast, setCast] = useState();

  const {id} = useParams()

  async function getMovieId() {
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=ee2648f9f1e9bd8b7424b1f5bb21b561&language=en-US`
    )
      .then((response) => response.json())
      .then((json) => setMovie(json));
  }
  async function getCreditId() {
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=ee2648f9f1e9bd8b7424b1f5bb21b561&language=en-US`
    )
      .then((response) => response.json())
      .then((json) => setCast(json));
  }

  useEffect(() => {
    getMovieId();
    getCreditId();
  }, []);
  
  const getImageURL = (posterpath) => {
    return `https://www.themoviedb.org/t/p/w300_and_h450_face${posterpath}`;
  };
  const getBackGroundURL = (backdroppath) => {
    return `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdroppath}`;
  };

  return (
    <div className='min-h-screen bg-slate-600 flex flex-col gap-5'>
      <div className="detailsContainer" style={{backgroundImage:`url(${getBackGroundURL(movie?.backdrop_path)})`}}>
        <div className='detailsContainerA'>
        <div className='detailsBox'>
          <div className='detailsBoxOne'>
            <img src={getImageURL(movie?.poster_path)} alt=""/>
          </div>
          <div className='detailsBoxTwo'>
            <div className='detailsBoxTwo-A'>
              <h1>{movie?.title}</h1>
            </div>
            <div className='detailsBoxTwo-B'>
              <div>Icon</div>
              <div>Icon</div>
              <div>Icon</div>
            </div>
            <div className='detailsBoxTwo-C'>
              <h2>Vista General</h2>
              <div>
                <p>{movie?.overview}</p>
              </div>
              <div className='info'>
                <div>
                  <h3>Nombre</h3>
                  <p>Apellido</p>
                </div>
                <div>
                  <h3>Nombre</h3>
                  <p>Apellido</p>
                </div>
                <div>
                  <h3>Nombre</h3>
                  <p>Apellido</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
