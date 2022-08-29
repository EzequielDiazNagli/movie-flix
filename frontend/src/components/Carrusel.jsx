import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect} from "react";
import {Link as LinkRouter} from "react-router-dom"

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/carrusel.css";
import "swiper/css/effect-fade";
// import required modules
import {Pagination, Autoplay, EffectFade } from "swiper";

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
        // navigation={true}
        pagination={true}
        loop={true}
        effect={"fade"}
        speed={1500}        
        autoplay={{
            delay: 5000,
            disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay, EffectFade]} 
        className="mySwiper">
            {trendingMov.map((movie, index) => {
                return (
                    <SwiperSlide 
                    key={index} 
                    style={{backgroundImage:`url(${getBackGroundURL(movie?.backdrop_path)})`, 
                    backgroundPosition: "center", 
                    backgroundSize: "cover"}}>
                        <div className="asd">
                            <div className="infoSlide">
                                <h1>{movie.title}</h1>
                                <p className="line-clamp-3">{movie.overview}</p>
                                <LinkRouter to={`/details/${movie.id}`}>
                                    <button className="btnCarosuel">More Info</button>
                                </LinkRouter>
                            </div>
                        </div>
                    </SwiperSlide>
                    )
                })
            }
        </Swiper>
        </>
    );
}