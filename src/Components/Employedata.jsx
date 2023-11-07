import React, { useContext, useEffect } from 'react'
import { Hoc } from './Hoc'
import { useCookies } from 'react-cookie'
import { UserContext } from '../App'
import { Table } from 'react-bootstrap'

const Employedata = () => {
	const uData = useContext(UserContext)
	const [cookie, setCookie, removeCookie] = useCookies()

	const setCookieF = () => {
		setCookie('userArr', uData.userArr, {
			path: '/employedata',
		})
	}
	
	useEffect(() => {
		setCookieF()
	}, [])

	return (
		<>
			<h3 className="p-2">Employe Data</h3>

			<Table
				className="w-50 mt-4 text-center shadow border-dark-subtle"
				striped
				bordered
				hover
				style={{ cursor: 'pointer' }}
			>
				<thead style={{ fontSize: '1rem' }}>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Gender</th>
					</tr>
				</thead>
				<tbody>
					{cookie.userArr?.map((x, i) => {
						return (
							<tr key={i}>
								<td style={{ padding: '20px 0' }}>
									{x.firstName}
								</td>
								<td style={{ padding: '20px 0' }}>
									{x.lastName}
								</td>
								<td style={{ padding: '20px 0' }}>
									{x.gender}
								</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		</>
	)
}

export default Hoc(Employedata)
