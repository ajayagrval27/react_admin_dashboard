import { Button } from "@mui/material"
import React from "react"
import { Nav, Navbar } from "react-bootstrap"
import "../Assets/Css/Header.css"

const Header = () => {
    return (
        <>
            <Navbar
                className="header fixed-top"
                bg="light"
                data-bs-theme="light">
                <Navbar.Brand
                    className="d-flex align-items-center justify-content-start ps-5 text-info fw-bold fs-5"
                    href="#home">
                    Admin Dashboard
                </Navbar.Brand>
                <Nav className="pe-5 w-100 d-flex justify-content-between">
                    <div className="">
                        <div className="input-group search">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-info"
                                    type="button">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <Button color="info" variant="contained">
                        Log In
                    </Button>
                </Nav>
            </Navbar>
        </>
    )
}

export default Header
