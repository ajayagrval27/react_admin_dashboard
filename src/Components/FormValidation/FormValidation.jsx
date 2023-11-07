import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Accordion, Form, FormControl, FormLabel } from 'react-bootstrap'
import './FormValidation.css'
import validationData from './validationData.json'

const FormValidation = () => {
	let [userObj, setUserObj] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		age: '',
		gender: '',
		hobbies: [],
		dob: '',
		information: '',
	})

	let [blankObj, setblankObj] = useState({ hobbies: [] })
	let [errorObj, setErrorObj] = useState({})
	let [userArr, setUserArr] = useState({})

	const capitalize = (value) => {
		let strArr = value.split(' ')
		strArr.forEach((x, i) => {
			strArr[i] = x.charAt(0).toUpperCase() + x.substring(1)
		})
		return strArr.join(' ')
	}

	const addData = (e) => {
		if (e.target.type === 'checkbox') {
			if (e.target.checked) {
				userObj[e.target.name].push(e.target.value)
			} else {
				userObj[e.target.name] = userObj[e.target.name].filter(
					(x) => x !== e.target.value
				)
			}
			// userObj[e.target.name] = []
			blankObj[e.target.name] = []
		} else if (e.target.name === 'information') {
			userObj[e.target.name] = capitalize(e.target.value)
		} else {
			userObj[e.target.name] = e.target.value
			blankObj[e.target.name] = ''
		}
		setUserObj({ ...userObj })
		setblankObj({ ...blankObj })
		validationF(e.target.name)
	}

	const validationF = (name) => {
		let validationObj = validationData.find((x) => x.name === name)
		let validObj = validationObj?.conditions?.find(x => eval(x.condition))
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

	const validDate = () => {
		let oldDate = new Date()
		oldDate.setFullYear(oldDate.getFullYear() - 18)
		return oldDate < new Date(userObj.dob)
	}

	const submitData = () => {
		Object.keys(userObj).forEach((x) => {
			validationF(x)
		})
		if (Object.keys(errorObj).length === 0) {
			userArr.push(userObj)
			setUserArr([...userArr])
		}
	}

	return (
		<>
			<Accordion style={{ width: '40%' }} className="mx-auto">
				<Accordion.Item eventKey="0">
					<Accordion.Header className="">
						Register Form
					</Accordion.Header>
					<Accordion.Body>
						<div className="form mx-auto shadow p-2">
							{/* <h2 className="ms-3 m-2 fs-2">Form</h2> */}
							<Box
								className="ms-5"
								component="form"
								sx={{
									'& .MuiTextField-root': {
										color: 'red',
										m: 1,
										width: '23rem',
									},
								}}
								noValidate
								autoComplete="off"
							>
								<TextField
									label="First Name"
									name="firstName"
									onChange={addData}
									value={userObj.firstName}
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
									value={userObj.lastName}
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
									type="email"
									onChange={addData}
									value={userObj.email}
								/>
								{errorObj.email && (
									<p className="text-danger ms-2 mb-1">
										{errorObj.email}
									</p>
								)}
								<TextField
									label="Password"
									name="password"
									onChange={addData}
									value={userObj.password}
									type="password"
								/>
								{errorObj.password && (
									<p className="text-danger ms-2 mb-1">
										{errorObj.password}
									</p>
								)}
								<TextField
									label="Confirm Password"
									name="confirmPassword"
									onChange={addData}
									value={userObj.confirmPassword}
									type="password"
								/>
								{errorObj.confirmPassword && (
									<p className="text-danger ms-2 mb-1">
										{errorObj.confirmPassword}
									</p>
								)}
								<FormLabel className="ms-2 d-block">
									Date of Birth
								</FormLabel>
								<Form.Control
									className="text-area ms-2 d-inline-block me-2 mb-2"
									type="date"
									name="dob"
									onChange={addData}
									value={userObj.dob}
								/>
								{errorObj.dob && (
									<p className="text-danger ms-2 mb-1">
										{errorObj.dob}
									</p>
								)}
								<Form.Label className="ms-2 d-block">
									Gender
								</Form.Label>
								<Form.Check
									className="ms-2 d-inline-block me-2"
									type="radio"
									name="gender"
									onChange={addData}
									checked={userObj.gender === 'male'}
									label="Male"
									value={'male'}
								/>
								<Form.Check
									className="d-inline-block me-2"
									type="radio"
									name="gender"
									onChange={addData}
									checked={userObj.gender === 'female'}
									label="Female"
									value={'female'}
								/>
								{errorObj.gender && (
									<p className="text-danger ms-2 mb-1">
										{errorObj.gender}
									</p>
								)}
								<Form.Label className="ms-2 d-block my-2">
									Hobbies
								</Form.Label>
								<Form.Check
									className="ms-2 d-inline-block me-2"
									type="checkbox"
									name="hobbies"
									onChange={addData}
									checked={userObj.hobbies?.includes(
										'Traveling'
									)}
									label="Traveling"
									value="Traveling"
								/>
								<Form.Check
									className="d-inline-block me-2"
									type="checkbox"
									name="hobbies"
									onChange={addData}
									checked={userObj.hobbies?.includes(
										'Gaming'
									)}
									label="Gaming"
									value="Gaming"
								/>
								<Form.Check
									className="d-inline-block me-2"
									type="checkbox"
									name="hobbies"
									onChange={addData}
									checked={userObj.hobbies?.includes(
										'Coding'
									)}
									label="Coding"
									value="Coding"
								/>
								{errorObj.hobbies && (
									<p className="text-danger ms-2 mb-1 my-1">
										{errorObj.hobbies}
									</p>
								)}
								<FormLabel className="ms-2 d-block my-2">
									Information
								</FormLabel>
								<FormControl
									className="text-area"
									as="textarea"
									rows="3"
									name="information"
									onChange={addData}
									value={userObj?.information}
									type="text"
								/>
								<Button
									className="my-3 d-block"
									sx={{ margin: '5px' }}
									variant="contained"
									onClick={submitData}
									color="secondary"
								>
									Submit
								</Button>
							</Box>
						</div>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</>
	)
}

export default FormValidation
