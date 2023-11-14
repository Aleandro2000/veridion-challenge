import React, { useEffect, useState } from "react";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TopRedirectButtonTemplate() {
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => setScrollPosition(window.scrollY);
    const handleClick = () => window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return scrollPosition ? (
        <button type="button" onClick={handleClick} className="fade-in fixed bg-black text-white p-2 rounded-full shadow-lg bottom-10 right-8 sm:right-84 z-10" aria-label="Top Redirect Button">
            <FontAwesomeIcon icon={faCaretUp} />
        </button>
    ) : null;
}
