import React, { useEffect, useState } from "react";

const ShrimpModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [shrimps, setShrimps] = useState([]);

  // Gère ouverture
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      spawnShrimps();
    } else if (isVisible) {
      // Lancer fade-out puis fermer
      setIsFadingOut(true);
      setTimeout(() => {
        setIsVisible(false);
        setIsFadingOut(false);
        setShrimps([]); // Nettoie les crevettes
      }, 500);
    }
  }, [isOpen]);

  const spawnShrimps = () => {
    const shrimpCount = 20;
    const newShrimps = Array.from({ length: shrimpCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // position horizontale en %
      delay: Math.random() * 1.5, // délai de démarrage
    }));
    setShrimps(newShrimps);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 backdrop-blur-md bg-white dark:bg-[#1F1F1F] bg-opacity-80 flex items-center justify-center transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <button
        onClick={onClose}
        className="select-none absolute top-4 right-4 text-black dark:text-white text-2xl font-bold z-50"
      >
        ✕
      </button>

      <div className="select-none relative w-full h-full overflow-hidden pointer-events-none">
        {shrimps.map((shrimp) => (
          <div
            key={shrimp.id}
            className="select-none absolute text-4xl animate-fall"
            style={{
              left: `${shrimp.left}%`,
              top: "-50px",
              animationDelay: `${shrimp.delay}s`,
            }}
          >
            🦐
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShrimpModal;
