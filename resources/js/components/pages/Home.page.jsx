import React from "react";

export default function HomePage() {
    return (
        <div className="fade-in">
            <img className="m-5 w-48" src="/assets/img/logo.png" />
            <div className="max-w-2xl mx-auto my-12">
                <div className="max-w-lg text-center mx-auto mb-5 font-bold text-5xl">
                    Where you go for services
                </div>
                <div className="text-center mx-auto mb-5 text-2xl">
                    Find the right services based on real reviews.
                </div>
                <input type="text" className="bg-black text-white p-5 rounded-full w-full" placeholder="Search here..." />
            </div>
        </div>
    );
}
