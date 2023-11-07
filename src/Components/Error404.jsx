import React from "react"
import { Link } from "react-router-dom"
import "../Assets/Css/Error404.css"

const Error404 = () => {
    return (
        <>
            <div className="not-found-main">
                <div className="not-found-container">
                    <h1>404 - Page Not Found</h1>
                    <p>Oops! The page you are looking for doesn't exist.</p>
                    <Link to="/">Go back to the home page</Link>
                </div>
            </div>
        </>
    )
}

export default Error404
