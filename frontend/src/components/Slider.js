import React, { useState, useEffect, useRef, useContext } from "react";
import "./Slider.css";
import Container from "./Container";
import { useNavigate } from "react-router-dom";
import { MovieData } from "./ContextProvider/Context";

const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const nav = useNavigate();
  const { movidata, setMovieData } = useContext(MovieData);
// ? movidata used for store the selected movie info for next route
  let newslides = slides;

  if (search) {
    newslides = slides.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }
  if (category) {
    newslides = slides.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(category.toLowerCase())
      )
    );
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 3000);

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // console.log("Movidata", movidata)

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value.trim())}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Clear</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Comedy">Comedy</option>
        <option value="Horror">Horror</option>
        <option value="Sci-Fi">Sci-Fi</option>
      </select>
      {search ? <Container slides={newslides} /> : ""}
      {category ? <Container slides={newslides} /> : ""}
      <div className="slider">
        <button onClick={prevSlide} className="slider-button prev">
          &lt;
        </button>
        <div
          className="slider-content"
          style={{ transform: `translateX(-${currentIndex * 20}%)` }}
        >
          {slides.concat(slides.slice(0, 5)).map((slide, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:8009/${slide.image}`}
                alt={slide.name}
              />
              <h3>{slide.name}</h3>
              <p>Rating: {slide.rating}</p>
              <p>Year: {slide.year}</p>
              <p>Category: {slide.category}</p>
              <button
                onClick={() => {
                  setMovieData(slide);
                  nav("/booking");
                }}
              >
                Book
              </button>
            </div>
          ))}
        </div>
        <button onClick={nextSlide} className="slider-button next">
          &gt;
        </button>
      </div>
      <Container slides={slides} />
    </div>
  );
};

export default Slider;
