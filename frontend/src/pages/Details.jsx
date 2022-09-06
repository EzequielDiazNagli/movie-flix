import React from 'react'
import "../styles/details.css"
import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import userActions from "../redux/actions/userActions";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import moviesActions from '../redux/actions/moviesActions';


export default function Details() {
  const {id} = useParams()
  const dispatch = useDispatch()

  const [movie, setMovie] = useState();
  // console.log(movie);
  const [cast, setCast] = useState();

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

  // async function getLatestMovie() {
  //   await fetch(
  //   "https://api.themoviedb.org/3/movie/now_playing?api_key=ee2648f9f1e9bd8b7424b1f5bb21b561&language=en-US&page=1"
  //   )
  //   .then((response) => response.json())
  //   .then((json) => dispatch(moviesActions.lastMovies(json)));
  // }

  useEffect(() => {
    getMovieId();
    getCreditId();
    // getLatestMovie()
  }, []);
  
  const getImageURL = (posterpath) => {
    return `https://www.themoviedb.org/t/p/w300_and_h450_face${posterpath}`;
  };
  const getBackGroundURL = (backdroppath) => {
    return `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdroppath}`;
  };

  const loggedUser = useSelector(store => store.userReducer.loggedUser)
  const userFavorites = useSelector(store => store.userReducer.favorites)

  async function onClick() {
      await dispatch(userActions.pushFav(movie.id))
  }

  return (
    <div className='min-h-[100vh] bg-slate-600 flex flex-col gap-5'>
      <div className="detailsContainer" style={{backgroundImage:`url(${getBackGroundURL(movie?.backdrop_path)})`}}>
        <div className='detailsContainerA'>
        <div className='detailsBox'>
          <div className='poi'>
            <div className='detailsBoxOne'>
              <img src={getImageURL(movie?.poster_path)} alt=""/>
            </div>
          </div>
          <div className='detailsBoxTwo'>
            <div className='detailsBoxTwo-A'>
              <h1>{movie?.title}</h1>
              <div className='detailsBoxTwo-A-info'>
                <p>{movie?.release_date}</p>
                {movie?.genres.map((gen, index) => {
                  return(
                  <p key={index}>{gen.name}</p>
                  )
                })}
              </div>
            </div>
            <div className='detailsBoxTwo-B'>
              <div>
                <button onClick={() => onClick()}>
                  {loggedUser ?
                      userFavorites.includes(movie?.id)  ?
                          <AiFillHeart className="text-white text-2xl"/>
                          :
                          <AiOutlineHeart className="text-white text-2xl"/>
                      :
                      <AiOutlineHeart className="text-white text-2xl"/>
                  }
                </button>
              </div>
            </div>
            <div className='detailsBoxTwo-C'>
              <h2>Overview</h2>
              <div>
                <p>{movie?.overview}</p>
              </div>
              <div className='info'>
                {/* <div className='infoCreator'>
                  <h3>Production</h3>
                  {movie?.production_companies.map(company => {
                  return(
                  <p>{company.name}</p>
                  )
                })}
                </div> */}
                <div className='infoCreator'>
                  <a href={movie?.homepage} target="_blank" rel="noopener noreferrer">HomePage</a>
                  <a href={movie?.homepage} target="_blank" rel="noopener noreferrer"><BsFillArrowRightCircleFill/></a>
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
