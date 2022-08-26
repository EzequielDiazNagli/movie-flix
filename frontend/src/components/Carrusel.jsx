import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect} from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/carrusel.css";
// import required modules
import { Navigation, Pagination, Autoplay } from "swiper";

export default function App() {
    const [tendringMovie, setTrendingMovie] = useState([]);

    function fiveRandom(tendringMovie){
        return [...tendringMovie]
            .sort(() => Math.random() > 0.5 ? 1 : -1)
            .slice (0,5)
    }

    const trendingMov =  fiveRandom(tendringMovie);

    async function getTrendingMovies() {
        await fetch(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=ee2648f9f1e9bd8b7424b1f5bb21b561"
        )
        .then((response) => response.json())
        .then((json) => setTrendingMovie(json.results));
    }

    useEffect(() => {
        getTrendingMovies();
    }, []);

    const getBackGroundURL = (backdroppath) => {
        return `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdroppath}`;
    };

    return (
        <>
        <Swiper 
        navigation={true}
        pagination={true}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]} 
        className="mySwiper">
            {trendingMov.map((movie, index) => {
                return (
                    <SwiperSlide 
                    key={index} 
                    style={{backgroundImage:`url(${getBackGroundURL(movie?.backdrop_path)})`, 
                    backgroundPosition: "center", 
                    backgroundSize: "cover"}}>
                        <h1 className="text-5xl text-white">{movie.title}</h1>
                    </SwiperSlide>
                    )
                })
            }
        </Swiper>
        </>
    );
}