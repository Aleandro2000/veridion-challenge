import React, { useContext } from "react";
import { SearchContext } from "../context/search.context";
import NotFound from "./NotFound.page";
import NavbarTemplate from "../templates/Navbar.template";

export default function ReviewsPage() {
    const [search] = useContext(SearchContext);

    return search ? (
        <div className="fade-in">
            <NavbarTemplate />
            {JSON.stringify(search)}
        </div>
    ) : <NotFound />;
}
