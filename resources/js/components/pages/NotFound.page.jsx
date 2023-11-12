import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function NotfoundPage() {
    return (
        <div className="flex flex-col items-center justify-center text-center h-screen fade-in">
            <span className="max-w-md mb-10 px-10">
                <img src="/assets/img/logo.png" alt="Veridion Logo" />
            </span>
            <h1 className="text-5xl font-bold text-black mb-4">404 - Page Not Found :(</h1>
            <p className="text-xl text-black mb-4">Sorry, we could not find the page you are looking for.</p>
            <Link to="/">
                <button type="button" className="bg-black text-white font-bold max-w-[200px] px-4 py-2 mt-5 rounded-lg"><FontAwesomeIcon icon={faArrowLeft} /> Go back home</button>
            </Link>
        </div>
    );
}
