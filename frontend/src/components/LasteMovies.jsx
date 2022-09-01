import React from 'react'
import HomeCard from "../components/HomeCard";
import { useSelector } from 'react-redux';

export default function LasteMovies() {
    const latestMovie = useSelector(store => store.moviesReducer.lastMovies)
    const filterMovies = useSelector(store => store.moviesReducer.filterMovies)
    const searchMovies = useSelector(store => store.moviesReducer.searchMovies)
    let data = searchMovies ? filterMovies : latestMovie

    return (
        <div className="h-full w-full flex gap-5 overflow-x-auto pb-2">
            {data?.map((movie, index) => {
            return (
                <div key={index} className="h-full">
                    <HomeCard key={index} catalogo={movie}/>
                </div>
            );
            })}
        </div>
    )
}
