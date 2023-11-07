import React, { useContext, useState } from "react"
import { Form } from "react-bootstrap"
import "../Assets/Css/Login.css"
import { Box, Button, TextField } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../App"
import { motion } from "framer-motion"
import Swal from "sweetalert2"

const Login = () => {
    let fData = useContext(UserContext)
    let navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({})

    const [arr, setArr] = useState(
        JSON.parse(localStorage.getItem("userArr")) ?? []
    )

    const login = () => {
        let data = arr.find((obj) => {
            return obj.email === email && obj.password === password
        })
        console.log(data)
        if (data) {
            Swal.fire({
                position: "center",
                icon: "success",
                customClass: {
                    container: "custom-toast-container",
                    popup: "custom-toast-popup",
                    title: "custom-toast-title",
                    content: "custom-toast-content",
                },
                title: "User Log in Successfully",
                showConfirmButton: false,
                timer: 1500,
                toast: true,
            })
            setTimeout(() => {
                localStorage.setItem("isLogin", true)
                fData.setIsLogin(true)
                navigate("/")
            }, 1500)
        } else if (email === "" && password === "") {
            setError({
                password: "Email Password is Required",
            })
        } else {
            // alert("Invalid Email or Password")
            setError({
                email: "Invalid Email or Password",
                password: "Invalid Email or Password",
            })
        }
    }

    const addData = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="form-main">
                <Form className="form shadow">
                    <h2 className="mb-4">Welcome To Login</h2>
                    <Box
                        component=""
                        sx={{
                            "& .MuiTextField-root": {
                                color: "red",
                                m: 1,
                                width: "24rem",
                            },
                        }}>
                        <div>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                onChange={addData}
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                onChange={addData}
                            />
                            <span className="text-danger ps-2">
                                {error.password}
                            </span>
                        </div>
                        <Button
                            onClick={login}
                            className="ms-2 my-3"
                            variant="contained"
                            color="secondary">
                            Log in
                        </Button>
                        <span className="ms-5">
                            Don't have account
                            <Link className="singup-btn ms-1" to="/register">
                                Register Now
                            </Link>
                        </span>
                    </Box>
                </Form>
            </motion.div>
        </>
    )
}

export default Login
