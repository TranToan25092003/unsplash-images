import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
  const mode = window.matchMedia("(prefers-color-scheme:dark)").matches;

  const lightMode = localStorage.getItem("theme") === "true";

  return !lightMode || mode;
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());

  const [searchTerm, setSearchTerm] = useState("dog");

  useEffect(() => {
    const body = document.querySelector("body");
    body.classList.toggle("dark-theme", isDarkTheme);
  }, []);

  //   toggle dark theme func
  const toggleDarkTheme = () => {
    const newTheme = !isDarkTheme;

    setIsDarkTheme(newTheme);

    const body = document.querySelector("body");
    body.classList.toggle("dark-theme", newTheme);

    localStorage.setItem("theme", isDarkTheme);
  };

  return (
    <AppContext.Provider
      value={{
        isDarkTheme,
        toggleDarkTheme,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
