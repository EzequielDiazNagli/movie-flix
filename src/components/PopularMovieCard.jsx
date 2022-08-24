import React from 'react'

const getImageURL = (posterpath) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`
}

export default function PopularMovieCard({movie}) {
    console.log(movie);
    return (
        <div className='w-1/4 h-full bg-white rounded-xl'>
            <img className='h-full w-full object-cover' src={getImageURL(movie.poster_path)} alt={movie.title}/>
        </div>
    )
}
