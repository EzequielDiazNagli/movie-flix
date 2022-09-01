import React from 'react'
import { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";
import { useSelector,useDispatch } from 'react-redux';
import moviesActions from '../redux/actions/moviesActions';

export default function LasteMovies() {
    const [latestMovie, setLatestMovie] = useState([]);
    const [reload,setReload] = useState(false);
    const dispatch = useDispatch();
    const filterMovies = useSelector(store => store.moviesReducer.filterMovies)
    const searchMovies = useSelector(store => store.moviesReducer.searchMovies)

    async function getLatestMovie() {
        await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=ee2648f9f1e9bd8b7424b1f5bb21b561&language=en-US&page=1"
        )
        .then((response) => response.json())
        .then((json) => setLatestMovie(json.results));
    }

    useEffect(() => {
        getLatestMovie();
        dispatch(moviesActions.lastMovies(latestMovie))
    }, [!reload]);

    let data = searchMovies ? filterMovies : latestMovie
    console.log(data);

    return (
        <div className="h-full w-full flex gap-5 overflow-x-auto pb-2">
            {data?.map((movie, index) => {
            return (
                <div key={index} className="h-full">
                    <HomeCard key={index} catalogo={movie} setReload={setReload}/>
                </div>
            );
            })}
        </div>
    )
}
