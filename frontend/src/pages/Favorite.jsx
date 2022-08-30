import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "../styles/details.css"
import FavoriteCard from "../components/FavoriteCard"

export default function Favorite({setReload}) {
    const idMovies = useSelector(store => store.userReducer.favorites)
    const lastMovies = useSelector(store => store.userReducer.lastMovies)
    const [reload,setFavoriteReload] = useState(false)

    useEffect(() =>{
        console.log("PROBANDO LA RECARGA");
        setReload(r => {
            return (
                console.log("setReload"), !r)})
    },[!reload])

function getMatch(lastMovies, idMovies) {
    let matches = [];

    for ( let i = 0; i < lastMovies?.length; i++ ) {
        for ( let e = 0; e < idMovies?.length; e++ ) {
            if ( lastMovies[i].id === idMovies[e] ) matches.push( lastMovies[i] );
        }
    }
    return matches;
}
    
    let favorites = getMatch(lastMovies, idMovies)
    console.log(favorites)

    return (
        <div className='min-h-[100vh] bg-slate-600 flex justify-center flex-wrap gap-5 pt-[15vh] px-10'>
                {favorites.map((fav, index) => {
                    return (
                        <FavoriteCard key={index} catalogo={fav} setFavoriteReload={setFavoriteReload}/>
                    )
                })}
        </div>
    )
}
