import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import SearchCard from '../components/SearchCard'
import { useEffect } from 'react';
import "../styles/index.css";

export default function Buscador() {

  const [movieFilter, setMovieFilter] = useState([])
  
  const search = useSelector(store => store.filterReducer.search)

  async function getFilter(search) {
    await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=ee2648f9f1e9bd8b7424b1f5bb21b561&language=en-US&query=${search}&page=1&include_adult=false`
      )
      .then((response) => response.json())
      .then((json) => setMovieFilter(json.results));
  }
  


  useEffect(() => {
    getFilter(search)
  }, [search]);


  return (
    <div className="bg-slate-600 flex flex-col min-h-screen gap-3 items-center ">
      <div className='bodyIndex min-h-[100vh] w-full flex flex-col gap-5 pt-[15vh] pb-[10vh] px-10'>
        {movieFilter?.length ? 
        movieFilter?.map((movie, index) => {
          return(
            
            <div key={index} className='flex'>
              <SearchCard movie={movie}/>
            </div>
          )
        })
        : <p className='text-3xl '>not found</p>
        }
      </div>
    </div>
  )
}
