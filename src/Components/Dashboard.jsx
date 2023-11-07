import React, { useContext } from 'react'
import '../Assets/Css/Dashboard.css'
import { Hoc } from './Hoc'
import { UserContext } from '../App'

const Dashboard = (props) => {
    const uData = useContext(UserContext)

	return (
		<>
			<h3 className="p-2">Dashboard</h3>
		</>
	)
}

export default Hoc(Dashboard)
