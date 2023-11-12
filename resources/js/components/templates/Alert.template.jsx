import React from "react";

export default function AlertTemplate({ message, type = false, className }) {
    return (
        <div className={`${type ? "bg-green-200 border-green-400" : "bg-red-200 border-red-400"} border-2 rounded-lg p-2 ${className}`} role="alert">
            <p className="text-sm">{message}</p>
        </div>
    );
}
