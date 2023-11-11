import React from "react";
import { Link } from "react-router-dom";

export default function NavbarTemplate() {
    return (
        <Link to="/">
            <img className="m-5 w-48" src="/assets/img/logo.png" />
        </Link>
    )
}
