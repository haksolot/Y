import React, { createContext, useState, useEffect } from "react";

// Création du contexte
export const ThemeContext = createContext();

// Provider
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialisation depuis le localStorage ou les préférences système
    const saved = localStorage.getItem("darkMode");
    return saved !== null
      ? saved === "true"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    let existingMeta = document.querySelector('meta[name="theme-color"]');
    if (existingMeta) {
      existingMeta.remove(); // ⚠️ On le supprime
    }

    const themeMeta = document.createElement("meta");
    themeMeta.name = "theme-color";
    themeMeta.content = darkMode ? "#1F1F1F" : "#ffffff";
    document.head.appendChild(themeMeta); // Et on le recrée proprement
  }, [darkMode]);

  // Listener pour les changements système (optionnel si l'utilisateur n'a pas forcé un thème)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = (e) => {
      const saved = localStorage.getItem("darkMode");
      if (saved === null) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  // Appliquer la classe dark et mettre à jour le localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Mise à jour de la couleur de la barre navigateur/status bar (meta theme-color)
  useEffect(() => {
    let themeMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeMeta) {
      themeMeta = document.createElement("meta");
      themeMeta.name = "theme-color";
      document.head.appendChild(themeMeta);
    }

    // Tu peux aussi personnaliser ça avec d'autres couleurs si besoin
    themeMeta.setAttribute("content", darkMode ? "#1F1F1F" : "#ffffff");
  }, [darkMode]);

  // Toggle manuel
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode); // on force l'enregistrement ici
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
