import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// import Dashboard from './Components/Dashboard'
// import Employedata from './Components/Employedata'
// import Settings from './Components/Settings'
// import About from './Components/About'
// import Login from './Components/Login'
// import Singup from './Components/Singup'
// import { createContext, useState } from 'react'
// import Error404 from './Components/Error404'
// import FormValidation from './Components/FormValidation/FormValidation';
// import UseResCrud from './Components/UseResCrud/UseResCrud'
import ApiUseResCrud from './Components/ApiUseResCrud/ApiUseResCrud'

// export const UserContext = createContext()

function App() {
	// let [userObj, setUserObj] = useState({})
	// let [userArr, setUserArr] = useState(
	// 	JSON.parse(localStorage.getItem('userArr')) ?? []
	// )
	// let [blankObj, setBlankObj] = useState({})
	// const [isLogin, setIsLogin] = useState(
	// 	JSON.parse(localStorage.getItem('isLogin')) ?? false
	// )

	// let data = {
	// 	userObj,
	// 	setUserObj,
	// 	userArr,
	// 	setUserArr,
	// 	blankObj,
	// 	setBlankObj,
	// 	isLogin,
	//     setIsLogin
	// }

	return (
		<>
			{/* <UseResCrud	/> */}
			<ApiUseResCrud />
			{/* <FormValidation /> */}
			{/* <UserContext.Provider value={data}>
				<BrowserRouter>
					<Routes>
						{isLogin ? (
							<>
								<Route
									path="/"
									element={<Navigate to="Dashboard" />}
								/>
								<Route
									path="/Dashboard"
									element={
										<Dashboard setIsLogin={setIsLogin} />
									}
								/>
								<Route
									path="/employedata"
									element={<Employedata />}
								/>
								<Route
									path="/settings"
									element={<Settings />}
								/>
								<Route path="/about" element={<About />} />
							</>
						) : (
							<>
								<Route
									path="/"
									element={<Navigate to="/login" />}
								/>
								<Route
									path="/login"
									element={<Login setIsLogin={setIsLogin} />}
								/>
							</>
						)}
						<Route path="/register" element={<Singup />} />
						<Route path="*" element={<Error404 />} />
					</Routes>
				</BrowserRouter>
			</UserContext.Provider> */}
		</>
	)
}

export default App
