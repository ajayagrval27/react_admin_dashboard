import { Box, Button, TextField } from '@mui/material'
import React, { useReducer, useState } from 'react'
import { Form, FormLabel, Table } from 'react-bootstrap'
import './UseResCrud.css'
import { crudReducer } from './Reducer'
import { useCookies } from 'react-cookie'

const UseResCrud = () => {
	let [userObj, setuserObj] = useState({})
	let [count, setcount] = useState(0)
	let [blankObj, setblankObj] = useState({})
	const [state, dispatch] = useReducer(crudReducer, [])
	const [cookie, setCookie, removeCookie] = useCookies()

	const addData = (e) => {
		if (e.target.type === 'checkbox') {
			userObj[e.target.name] = userObj[e.target.name] ?? []
			blankObj[e.terget.name] = []
			if (e.target.checked) {			
				userObj[e.target.name] = [
					...userObj[e.target.name],
					e.target.value,
				]
			} else {
				userObj[e.target.name] = userObj[e.target.name].filter(
					(item) => item !== e.target.value
				)
			}
		} else {
			userObj[e.target.name] = e.target.value
			blankObj[e.target.name] = ''
		}
		setuserObj({ ...userObj })
		setblankObj({ ...blankObj })
	}

	const setCookieF = () => {
		setCookie('userArr', state)
	}

	const saveData = () => {
		dispatch({ type: 'add', userObj: userObj, count, setcount, setCookie })
		setuserObj({ ...blankObj })
	}

	const editData = (editObj) => {
		setuserObj({ ...editObj })
	}

	const deleteData = (id) => {
		dispatch({ type: 'delete', id, setCookie, cookie })
	}

	return (
		<>
			<div
				style={{ width: '51.6%', margin: 'auto' }}
				className="shadow p-3"
			>
				<h2 className="mb-4">Welcome To Register</h2>
				<Box
					className="d-flex flex-row flex-wrap justify-content-between"
					component="form"
					sx={{
						'& .MuiTextField-root': {
							color: 'red',
							m: 1,
							width: '19.5rem',
						},
					}}
				>
					<div>
						<TextField
							label="First Name"
							name="firstName"
							onChange={addData}
							value={userObj.firstName ?? ''}
							type="text"
						/>
					</div>
					<div>
						<TextField
							label="Last Name"
							name="lastName"
							onChange={addData}
							value={userObj.lastName ?? ''}
							type="text"
						/>
					</div>
					<div>
						<TextField
							label="Email"
							name="email"
							onChange={addData}
							value={userObj.email ?? ''}
							type="email"
						/>
					</div>
					<div>
						<TextField
							label="Password"
							name="password"
							type="password"
							onChange={addData}
							value={userObj.password ?? ''}
						/>
					</div>
					<div>
						<TextField
							label="Confirm Password"
							name="confirmPassword"
							type="password"
							onChange={addData}
							value={userObj.confirmPassword ?? ''}
						/>
					</div>
					<div>
						<TextField
							label="Phone Number"
							name="phoneNumber"
							type="tel"
							onChange={addData}
							value={userObj.phoneNumber ?? ''}
						/>
					</div>
					<div className="d-block">
						<FormLabel className="ms-3 fw-medium d-block mb-0">
							Date Of Birth
						</FormLabel>
						<TextField
							name="dob"
							type="date"
							onChange={addData}
							value={userObj.dob ?? ''}
						/>
					</div>
					<div className="gender mt-1">
						<FormLabel className="ms-2 d-block fw-medium">
							Gender
						</FormLabel>
						<Form.Check
							className="ms-2 d-inline-block me-2"
							type="radio"
							name="gender"
							label="Male"
							onChange={addData}
							checked={userObj.gender === 'male'}
							value={'male'}
						/>
						<Form.Check
							className="d-inline-block me-2"
							type="radio"
							name="gender"
							label="Female"
							onChange={addData}
							checked={userObj.gender === 'female'}
							value={'female'}
						/>
					</div>
					{/* <div>
						<Form.Label className="ms-2 fw-medium d-block my-2">
							Hobbies
						</Form.Label>
						<Form.Check
							className="ms-2 d-inline-block me-2"
							type="checkbox"
							name="hobbies"
							checked={userObj.hobbies?.includes('Traveling')}
							onChange={addData}
							label="Traveling"
							value="Traveling"
						/>
						<Form.Check
							className="d-inline-block me-2"
							type="checkbox"
							name="hobbies"
							checked={userObj.hobbies?.includes('Gaming')}
							onChange={addData}
							label="Gaming"
							value="Gaming"
						/>
						<Form.Check
							className="d-inline-block me-2"
							type="checkbox"
							name="hobbies"
							checked={userObj.hobbies?.includes('Coding')}
							onChange={addData}
							label="Coding"
							value="Coding"
						/>
					</div> */}
				</Box>
				<Button
					className="ms-2 my-3"
					variant="contained"
					type="button"
					color="secondary"
					onClick={saveData}
				>
					Register
				</Button>
			</div>

			<Table
				className="mt-3 text-center shadow border-dark-subtle"
				style={{ backgroundColor: '#9c27b0' }}
				striped
				bordered
				hover
			>
				<thead>
					<tr>
						<th>Id</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Password</th>
						<th>Phone Number</th>
						<th>Gender</th>
						<th>Date Of Birth</th>
						{/* <th>Hobbies</th> */}
						<th colSpan={2}>Action</th>
					</tr>
				</thead>
				<tbody>
					{cookie.userArr?.map((x, i) => {
						return (
							<tr key={i}>
								<td style={{ padding: '20px 0' }}>{x.id}</td>
								<td style={{ padding: '20px 0' }}>
									{x.firstName}
								</td>
								<td style={{ padding: '20px 0' }}>
									{x.lastName}
								</td>
								<td style={{ padding: '20px 0' }}>{x.email}</td>
								<td style={{ padding: '20px 0' }}>
									{x.password}
								</td>
								<td style={{ padding: '20px 0' }}>
									{x.gender}
								</td>
								<td style={{ padding: '20px 0' }}>
									{x.phoneNumber}
								</td>
								<td style={{ padding: '20px 0' }}>{x.dob}</td>
								{/* <td style={{ padding: '20px 0' }}>
									{x.hobbies?.join(',')}
								</td> */}
								<td
									style={{ padding: '15px 0' }}
									className="d-flex justify-content-evenly"
								>
									<Button
										variant="contained"
										color="info"
										onClick={() => editData(x)}
									>
										Edit
									</Button>
									<Button
										variant="contained"
										color="error"
										onClick={() => deleteData(x.id)}
									>
										Delete
									</Button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		</>
	)
}

export default UseResCrud
