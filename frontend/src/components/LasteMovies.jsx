import React from 'react'
import { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";

export default function LasteMovies() {
    const [latestMovie, setLatestMovie] = useState([]);
    const [reload,setReload] = useState(false)

    async function getLatestMovie() {
        await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=ee2648f9f1e9bd8b7424b1f5bb21b561&language=en-US&page=1"
        )
        .then((response) => response.json())
        .then((json) => setLatestMovie(json.results));
    }

    useEffect(() => {
        getLatestMovie();
    }, [!reload]);


    return (
        <div className="h-full w-full flex gap-5 overflow-x-auto pb-2">
            {latestMovie?.map((movie, index) => {
            return (
                <div key={index} className="w-full h-full ">
                    <HomeCard key={index} catalogo={movie} setReload={setReload}/>
                </div>
            );
            })}
        </div>
    )
}
