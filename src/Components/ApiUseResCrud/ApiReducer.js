import axios from 'axios'

let auth = {
	headers: {
		Authorization:
			'Bearer 1cd9919d0972e2cdd9744606eac394c287cc25bc90aaf4d0c5281fea39224ec9',
	},
}

export const apiReducer = (state, action) => {

	const getApiData = () => {
		return axios
			.get('https://gorest.co.in/public/v2/users', auth)
			.then(async (response) => {
				return await response.data
			})
			.catch((error) => {
				console.log(error)
			})
	}

	switch (action.type) {
		case 'get': {
			return getApiData()
		}
		case 'add': {
			return axios
				.post(
					'https://gorest.co.in/public/v2/users',
					action.userObj,
					auth
				)
				.then((response) => {
					return getApiData()
				})
				.catch((error) => {
					console.log(error)
				})
		}
		case 'edit': {
			return axios
				.patch(
					`https://gorest.co.in/public/v2/users/${action.userObj.id}`,
					action.userObj,
					auth
				)
				.then((response) => {
					return getApiData()
				})
				.catch((error) => {
					console.log(error)
				})
		}

		case 'delete': {
			return axios
				.delete(
					`https://gorest.co.in/public/v2/users/${action.id}`,
					auth
				)
				.then((response) => {
					return getApiData()
				})
				.catch((error) => {
					console.log(error)
				})
		}

		default: {
			return state
		}
	}
}
