import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { RiDashboardFill, RiSettings5Fill } from 'react-icons/ri'
import { FaUserTie } from 'react-icons/fa'
import { FcAbout } from 'react-icons/fc'
import { motion } from 'framer-motion'
import { UserContext } from '../App'
import Swal from 'sweetalert2'

export const Hoc = (Component1) => {
	const NewComponet = (props) => {
		let fData = useContext(UserContext)
		let navigate = useNavigate()

		const logout = () => {
			Swal.fire({
				title: 'Are you sure?',
				text: 'You want to log out!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Log Out',
				toast: true,
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						customClass: {
							container: 'custom-toast-container',
							popup: 'custom-toast-popup',
							title: 'custom-toast-title',
							content: 'custom-toast-content',
						},
						title: 'User Log Out Successfully',
						showConfirmButton: false,
						timer: 1500,
						toast: true,
					})
					setTimeout(() => {
						localStorage.setItem('isLogin', false)
						fData.setIsLogin(false)
						navigate('/login')
					}, 1500)
				}
			})
		}

		return (
			<>
				<div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.5 }}
					className="bg-white header d-flex justify-content-between position-fixed w-100"
				>
					<div className="py-2">
						<Link className="logo" to="/">
							<div>Admin</div>
						</Link>
					</div>
					<div className="p-2 pe-5 ">
						<InputGroup>
							<FormControl type="text" placeholder="Search..." />
							<Button
								variant="contained"
								color="secondary"
								type="submit"
							>
								Search
							</Button>
						</InputGroup>
					</div>
					<div className="p-2 pe-3">
						<Button
							onClick={logout}
							className=""
							variant="contained"
							color="secondary"
						>
							Logout
						</Button>
					</div>
				</div>

				<div className="row d-flex ">
					<div className="col-3 sidebar fixed-bottom">
						<div className="mt-4">
							<ul className="list-unstyled menu px-2">
								<NavLink to="/dashboard">
									<li>
										<RiDashboardFill
											className="mb-1 ms-2 me-2"
											size={15}
										/>
										Dashboard
									</li>
								</NavLink>
								<NavLink to="/employedata">
									<li>
										<FaUserTie
											className="mb-1 ms-2 me-2"
											size={15}
										/>
										Employe Data
									</li>
								</NavLink>
								<NavLink to="/settings">
									<li>
										<RiSettings5Fill
											className="mb-1 ms-2 me-2"
											size={15}
										/>
										Settings
									</li>
								</NavLink>
								<NavLink to="/about">
									<li>
										<FcAbout
											className="mb-1 ms-2 me-2"
											size={15}
										/>
										About
									</li>
								</NavLink>
							</ul>
						</div>
					</div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						style={{ marginTop: '6rem', marginLeft: '4rem' }}
						className="col-9"
					>
						<Component1/>
					</motion.div>
				</div>
			</>
		)
	}
	return NewComponet
}
