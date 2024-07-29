import React, { Children, createContext, useState } from "react";

export const LoginContext = createContext("");
export const MovieData = createContext(null);
const Context = ({ children }) => {
  const [loginData, setLoginData] = useState("");
  const [movidata, setMovieData] = useState(null);

  return (
    <>
      <LoginContext.Provider value={{ loginData, setLoginData }}>
        <MovieData.Provider value={{ movidata, setMovieData }}>
          {children}
        </MovieData.Provider>
      </LoginContext.Provider>
    </>
  );
};

export default Context;
