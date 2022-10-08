import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import requests from "../Requests";
import Movie from "./Movie";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [click, setClick] = useState(0);
  const [clickk, setClickk] = useState(false);
  const handleClick = () => {
    setClickk(true);
  };

  const outsideClick = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (!outsideClick.current.contains(e.target)) {
        setClickk(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
      //   console.log(movies);
    });
  }, []);

  const popular = () => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
    setClick(1);
  };

  const topRated = () => {
    axios.get(requests.requestTopRated).then((response) => {
      setMovies(response.data.results);
    });
    setClick(2);
  };

  const upComing = () => {
    axios.get(requests.requestUpcoming).then((response) => {
      setMovies(response.data.results);
    });
    setClick(3);
  };

  const trending = () => {
    axios.get(requests.requestTrending).then((response) => {
      setMovies(response.data.results);
    });
    setClick(4);
  };

  return (
    <div className="w-full h-full bg-gray-900 grid grid-cols-3 mt-[3.5rem] ">
      <div className="fixed top-[1.2rem] left-[8.4rem] md:left-96 md:top-[1.01rem] h-[20px] w-[70px] z-[500]">
        {clickk ? (
          <AiFillCaretDown
            onClick={handleClick}
            className="md:text-3xl text-2xl text-white "
          />
        ) : (
          <AiFillCaretUp
            onClick={handleClick}
            className="md:text-3xl text-2xl text-white "
          />
        )}

        <div
          ref={outsideClick}
          className={
            clickk
              ? "grid grid-cols-  ml-[-3rem] md:h-[220px] mt-2 bg-black/50 rounded-lg "
              : "hidden"
          }
        >
          <button
            className={
              click === 1 || click === 0
                ? "bg-black/70 text-white rounded m-3 border-white/70 border-2   "
                : "bg-white/70 rounded m-3 hover:bg-white/80"
            }
            onClick={popular}
          >
            Popular
          </button>
          <button
            className={
              click === 2
                ? "bg-black/70 text-white rounded m-2 border-white/70 border-2 "
                : "bg-white/70 rounded m-3 hover:bg-white/80"
            }
            onClick={topRated}
          >
            Top Rated
          </button>
          <button
            className={
              click === 3
                ? "bg-black/70 text-white rounded m-3 border-white/70 border-2 "
                : "bg-white/70 rounded m-3 hover:bg-white/80"
            }
            onClick={upComing}
          >
            Upcoming
          </button>
          <button
            className={
              click === 4
                ? "bg-black/70 text-white rounded m-3 border-white/70 border-2 "
                : "bg-white/70 rounded m-3 hover:bg-white/80"
            }
            onClick={trending}
          >
            Trending
          </button>
        </div>
      </div>
      {movies.map((movie, index) => (
        <Movie movie={movie} key={index} movies={movies} />
      ))}
    </div>
  );
};

export default Main;
