import React,{useContext} from "react";
import "./Container.css";
import { useNavigate } from "react-router-dom";
import { MovieData } from "./ContextProvider/Context";

const Container = ({ slides }) => {
  const rows = [];
  for (let i = 0; i < slides.length; i += 5) {
    rows.push(slides.slice(i, i + 5));
  }
  const nav = useNavigate();
  const { movidata, setMovieData } = useContext(MovieData);

  return (
    <>
      {/*  */}
      <div className="container">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="row"
            style={{
              justifyContent: row.length < 5 ? "flex-start" : "space-around",
            }}
          >
            {row.map((item, index) => (
              <div key={index} className="item">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${item.image}`}
                  alt={item.name}
                />
                <h3>{item.name}</h3>
                <p>Rating: {item.rating}</p>
                <p>Year: {item.year}</p>
                <p>Category: {item.category}</p>
                <button onClick={() => {
                  setMovieData(item);
                  nav("/booking");
                }}>
                  Book
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Container;
