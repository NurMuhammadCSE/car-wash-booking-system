import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // You can use any icon library

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 p-2 rounded-full bg-purple-600 text-white shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-label="Scroll to Top"
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default ScrollToTopButton;
