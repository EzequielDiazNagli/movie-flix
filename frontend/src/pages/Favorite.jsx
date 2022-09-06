import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "../styles/index.css"
import FavoriteCard from "../components/FavoriteCard"

export default function Favorite({setReload}) {
    const idMovies = useSelector(store => store.userReducer.favorites)
    const lastMovies = useSelector(store => store.userReducer.lastMovies)
    const [reload,setFavoriteReload] = useState(false)
    const loggedUser = useSelector(store => store.userReducer.loggedUser)
    // console.log(loggedUser);

    useEffect(() =>{
        setReload(r => {
            return (!r)})
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
    // console.log(favorites);
    // function fiveRandom(favorites){
    //     return [...favorites]
    //         .sort(() => Math.random() > 0.5 ? 1 : -1)
    //         .slice (0,1)
    // }

    // const trendingMov =  fiveRandom(favorites);
    // console.log(trendingMov);
    // const getBackGroundURL = (backdroppath) => {
    //     return `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdroppath}`;
    // };
    // style={{backgroundImage:`url(${getBackGroundURL(movie?.backdrop_path)})`}}

    return (
        <div className='min-h-[100vh] bg-slate-600'>
            <div className='bodyIndex min-h-[100vh] flex flex-col gap-5 pt-[15vh] pb-[10vh] px-10'>
                <div className='text-center'>
                {loggedUser !== null ?
                    favorites.length > 0 ?
                    <h1 className='text-white text-4xl font-medium'>Favorites</h1>
                    :
                    <h1 className='text-white text-4xl font-medium'>You have no favorites yet</h1>
                    :
                    <h1 className='text-white text-4xl font-medium'>Please log in to see your favorites</h1>
                }
                </div>
                <div className='flex gap-5 justify-center flex-wrap'>
                    {favorites.map((fav, index) => {
                        return (
                            <FavoriteCard key={index} catalogo={fav} setFavoriteReload={setFavoriteReload}/>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}
