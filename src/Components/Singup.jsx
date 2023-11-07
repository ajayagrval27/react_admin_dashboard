import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import '../Assets/Css/Login.css'
import '../Assets/Css/Singup.css'
import { Box, Button, FormLabel, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { motion } from 'framer-motion'
import { UserContext } from '../App'
import validation from './validation.json'

const Singup = () => {
	let uData = useContext(UserContext)
	let navigate = useNavigate()
	let [errorObj, setErrorObj] = useState({})

	useEffect(() => {
		localStorage.setItem('userArr', JSON.stringify(uData.userArr))
	}, [uData.userArr])

	const addData = (e) => {
		uData.userObj[e.target.name] = e.target.value
		uData.blankObj[e.target.name] = ''
		uData.setUserObj({ ...uData.userObj })
		uData.setBlankObj({ ...uData.blankObj })
		validationFunc(e.target.name)
	}

	const validationFunc = (name) => {
		let validationObj = validation.find((x) => x.name === name)
		let validObj = validationObj?.conditions?.find((x) => eval(x.condition))
		if (validObj) {
			if (validObj.otherField) {
				if (validObj.error) {
					errorObj[validObj.otherField] = validObj.error
					delete errorObj[name]
				} else {
					delete errorObj[validObj.otherField]
				}
			} else {
				errorObj[name] = validObj.error
			}
		} else {
			delete errorObj[name]
		}
		setErrorObj({ ...errorObj })
	}
	console.log(errorObj);

	const submitData = () => {
		let checkObj = uData.userArr.find(
			(obj) => obj.email === uData.userObj.email
		)
		if (checkObj) {
			alert('User Already Exist')
		} else {
			Object.keys(uData.userObj).forEach((key) => {
				console.log(validationFunc(key))
			})
			if (Object.keys(errorObj).length === 0) {
				uData.userArr.push(uData.userObj)
				uData.setUserArr([...uData.userArr])
				uData.setUserObj({ ...uData.blankObj })
				// localStorage.setItem('userArr', JSON.stringify(uData.userArr))
				Swal.fire({
					position: 'center',
					icon: 'success',
					customClass: {
						container: 'custom-toast-container',
						popup: 'custom-toast-popup',
						title: 'custom-toast-title',
						content: 'custom-toast-content',
					},
					title: 'User Register Successfully',
					showConfirmButton: false,
					timer: 1500,
					toast: true,
				})
				setTimeout(() => {
					navigate('/login')
				}, 1500)
			}
		}
	}

	const validDate = () => {
		let oldDate = new Date()
		oldDate.setFullYear(oldDate.getFullYear() - 18)
		return oldDate < new Date(uData.userObj.dob)
	}

	// const handlePhoneNumberChange = (e) => {
	// 	const inputValue = e.target.value
	// 	const phoneNumber = inputValue.replace(/[^\d]/g, '')
	// 	if (uData.userObj.phoneNumber.length <= 10) {
	// 		uData.userObj.phoneNumber = phoneNumber
	// 		uData.setUserObj({ ...uData.userObj })
	// 	}
	// }

	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1.5 }}
				className="form-main h-auto"
			>
				<div className="form shadow">
					<h2 className="mb-4">Welcome To Register</h2>
					<Box
						component=""
						sx={{
							'& .MuiTextField-root': {
								color: 'red',
								m: 1,
								width: '23rem',
							},
						}}
					>
						<div>
							<TextField
								label="First Name"
								name="firstName"
								onChange={addData}
								value={uData.userObj.firstName ?? ''}
								type="text"
							/>
							{errorObj.firstName && (
								<p className="text-danger ms-2 mb-1">
									{errorObj.firstName}
								</p>
							)}
							<TextField
								label="Last Name"
								name="lastName"
								onChange={addData}
								value={uData.userObj.lastName ?? ''}
								type="text"
							/>
							{errorObj.lastName && (
								<p className="text-danger ms-2 mb-1">
									{errorObj.lastName}
								</p>
							)}
							<TextField
								label="Email"
								name="email"
								onChange={addData}
								value={uData.userObj.email ?? ''}
								type="email"
							/>
							{errorObj.lastName && (
								<p className="text-danger ms-2 mb-1">
									{errorObj.email}
								</p>
							)}
							<TextField
								label="Password"
								name="password"
								type="password"
								onChange={addData}
								value={uData.userObj.password ?? ''}
							/>
							{errorObj.lastName && (
								<p className="text-danger ms-2 mb-1">
									{errorObj.password}
								</p>
							)}
							<TextField
								label="Confirm Password"
								name="confirmPassword"
								type="password"
								onChange={addData}
								value={uData.userObj.confirmPassword ?? ''}
							/>
							{errorObj.lastName && (
								<p className="text-danger ms-2 mb-1">
									{errorObj.confirmPassword}
								</p>
							)}
							<TextField
								label="Phone Number"
								name="phoneNumber"
								type="tel"
								onChange={addData}
								value={uData.userObj.phoneNumber ?? ''}
							/>
							{errorObj.lastName && (
								<p className="text-danger ms-2 mb-1">
									{errorObj.phoneNumber}
								</p>
							)}
							<FormLabel className="ms-3 fw-medium">
								Date Of Birth
							</FormLabel>
							<TextField
								name="dob"
								type="date"
								onChange={addData}
								value={uData.userObj.dob ?? ''}
							/>
							{errorObj.lastName && (
								<p className="text-danger ms-2 mb-1">
									{errorObj.dob}
								</p>
							)}
							<Form.Label className="ms-2 d-block fw-medium">
								Gender
							</Form.Label>
							<Form.Check
								className="ms-2 d-inline-block me-2"
								type="radio"
								name="gender"
								label="Male"
								onChange={addData}
								checked={uData.userObj.gender === 'male'}
								value={'male'}
							/>
							<Form.Check
								className="d-inline-block me-2"
								type="radio"
								name="gender"
								label="Female"
								onChange={addData}
								checked={uData.userObj.gender === 'female'}
								value={'female'}
							/>
							{errorObj.lastName && (
								<p className="text-danger ms-2 mb-1">
									{errorObj.gender}
								</p>
							)}
						</div>
						<Button
							className="ms-2 my-3"
							variant="contained"
							type="button"
							color="secondary"
							onClick={submitData}
						>
							Register
						</Button>
						<span className="ms-5">
							Already have account
							<Link className="singup-btn ms-1" to="/login">
								Login Now
							</Link>
						</span>
					</Box>
				</div>
			</motion.div>
		</>
	)
}

export default Singup
