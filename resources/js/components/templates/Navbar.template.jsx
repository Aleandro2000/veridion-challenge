import React from "react";
import { Link } from "react-router-dom";

export default function NavbarTemplate() {
    return (
        <Link to="/web/home">
            <img className="m-5 w-48" src="/assets/img/logo.png" aria-label="Veridion Logo" />
        </Link>
    )
}
