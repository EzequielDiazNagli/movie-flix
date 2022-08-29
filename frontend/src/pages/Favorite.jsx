import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "../styles/details.css"
// import SearchCard from "../components/SearchCard"
import userActions from '../redux/actions/userActions';

export default function Favorite() {
    const dispatch = useDispatch()
    const [latestMovie, setLatestMovie] = useState([]);
    // let favoriteMovies = []

    const idMovies = useSelector(store => store.userReducer.favorites)
    const lastMovies = useSelector(store => store.userReducer.lastMovies)

  
    

console.log(lastMovies)
console.log(idMovies)

function getMatch(lastMovies, idMovies) {
    console.log("fun")
    let matches = [];

    for ( let i = 0; i < lastMovies?.length; i++ ) {
        for ( let e = 0; e < idMovies?.length; e++ ) {
            if ( lastMovies[i].id === idMovies[e] ) matches.push( lastMovies[i] );
        }
    }
    console.log("ter")
    console.log(matches)
    return matches;
}
    
    let asd = getMatch(lastMovies, idMovies)
    console.log(asd)
    
    


    // console.log(favoriteMovies)

    return (
        <div className='min-h-[100vh] bg-slate-600 flex flex-col gap-5'>
            <div className="detailsContainer">
                {/* <SearchCard /> */}
            </div>
        </div>
    )
}
