import { arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";

const Movie = ({ movie }) => {
  const [like, setLike] = useState(false);

  const { user } = UserAuth();
  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
        }),
      });
    } else {
      alert("Please login to save a movie");
    }
  };

  return (
    <div className="relative ">
      <div className="m-3 bg-black rounded shadow-xl shadow-black/90 text-white">
        <div>
          <img
            className="rounded"
            src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
            alt="movie-image"
          />
        </div>
        <p className="ml-2 font-medium">{movie?.title}</p>
        <div className="w-full">
          <p className="ml-2 text-gray-400">
            {" "}
            Release Date - {movie?.release_date}
          </p>
        </div>
      </div>
      <p onClick={saveShow}>
        {like ? (
          <FaHeart className="text-red-600 absolute top-4 left-4" />
        ) : (
          <FaRegHeart className="text-red-400 absolute top-4 left-4" />
        )}
      </p>
    </div>
  );
};

export default Movie;
