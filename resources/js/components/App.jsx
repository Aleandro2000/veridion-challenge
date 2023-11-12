import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import HomePage from './pages/Home.page';
import ReviewsPage from './pages/Reviews.page';
import NotFound from './pages/NotFound.page';
import { SearchContext } from './context/search.context';
import ReviewRoute from './routes/Review.route';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/reviews",
        element: (
            <ReviewRoute>
                <ReviewsPage />
            </ReviewRoute>
        ),
    },
    {
        path: "*",
        element: <NotFound />,
    }
]);

export default function App() {
    const [search, setSearch] = useState();

    return (
        <SearchContext.Provider value={[search, setSearch]}>
            <RouterProvider router={router} />
        </SearchContext.Provider>
    );
}

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}
