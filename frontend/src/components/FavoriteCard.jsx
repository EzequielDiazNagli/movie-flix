import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {Link as LinkRouter} from "react-router-dom"
import userActions from "../redux/actions/userActions";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const getImageURL = (posterpath) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`;
};

export default function HomeCard({ catalogo, setFavoriteReload }) {
    const dispatch = useDispatch()
    
    async function onClick() {
        await dispatch(userActions.pushFav(catalogo.id))
        setFavoriteReload(r => {
            return (
                console.log("setFavoriteReload"), !r)})
    }

    return (
        <div className="w-56 h-full bg-white rounded-xl movieCard">
        <img
            className="h-full w-full object-cover rounded-xl"
            src={getImageURL(catalogo.poster_path)}
            alt={catalogo.title}
        />
        <div className='movieCard-description'>
            <button onClick={() => onClick()}>
            <AiFillHeart/>
            </button>
            <h1>{catalogo.title || catalogo.name}</h1>
            <h2>{catalogo.release_date || catalogo.first_air_date}</h2>
            <LinkRouter to={`/details/${catalogo.id}`}>
                <button> Read More
                <span></span>
                </button>
            </LinkRouter>
        </div>
        </div>
    );
}
