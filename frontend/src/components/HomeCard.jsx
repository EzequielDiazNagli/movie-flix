import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link as LinkRouter} from "react-router-dom"
import userActions from "../redux/actions/userActions";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "../styles/index.css"

const getImageURL = (posterpath) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`;
};

export default function HomeCard({ catalogo }) {
    const dispatch = useDispatch()
    const loggedUser = useSelector(store => store.userReducer.loggedUser)
    const userFavorites = useSelector(store => store.userReducer.favorites)

    async function onClick() {
        await dispatch(userActions.pushFav(catalogo.id))
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
            {loggedUser ?
                userFavorites.includes(catalogo.id)  ?
                    <AiFillHeart className="text-white text-2xl"/>
                    :
                    <AiOutlineHeart className="text-white text-2xl"/>
                :
                <AiOutlineHeart className="text-white text-2xl"/>
            }
            </button>
            <h1>{catalogo.title}</h1>
            <h2>{catalogo.release_date}</h2>
            <LinkRouter to={`/details/${catalogo.id}`}>
                <button> Read More
                <span></span>
                </button>
            </LinkRouter>
        </div>
        </div>
    );
}
