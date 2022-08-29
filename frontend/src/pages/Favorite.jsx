import React from 'react'
import { useEffect, useState } from "react";
import "../styles/details.css"
// import SearchCard from "../components/SearchCard"

export default function Favorite() {
    const [latestMovie, setLatestMovie] = useState([]);

    async function getLatestMovie() {
        await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=ee2648f9f1e9bd8b7424b1f5bb21b561&language=en-US&page=1"
        )
        .then((response) => response.json())
        .then((json) => setLatestMovie(json.results));
    }

    useEffect(() => {
        getLatestMovie();
    }, []);

    return (
        <div className='min-h-[100vh] bg-slate-600 flex flex-col gap-5'>
            <div className="detailsContainer">
                {/* <SearchCard /> */}
            </div>
        </div>
    )
}
