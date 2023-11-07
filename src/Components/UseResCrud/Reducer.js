export const crudReducer = (state, action) => {
	console.log('crudReducer', state, action)

	switch (action.type) {
		case 'add': {
			if (action.userObj.id) {
				let index = state.findIndex(
					(user) => user.id === action.userObj.id
				)
				state.splice(index, 1, action.userObj)
				action.setCookie('userArr', state)
			} else {
				action.count++
				action.setcount(action.count)
				action.userObj.id = action.count
				state.push(action.userObj)
				action.setCookie('userArr', state)
			}
			return [...state]
		}
		case 'get': {
			return [...state]
		}
		case 'delete': {
			return state.filter((user) => user.id !== action.id)
		}
		default: {
			return [...state]
		}
	}
}
