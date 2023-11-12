import React, { useContext } from "react";
import { SearchContext } from "../context/search.context";
import { Navigate } from "react-router-dom";

export default function ReviewRoute({ children }) {
    const [search] = useContext(SearchContext);

    return search ? (
        <>
            {children}
        </>
    ) : <Navigate to="/" replace />;
}
