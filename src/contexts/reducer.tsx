interface Istate {
      joined: boolean,
			userName: string | null,
			roomId: string | null,
} 

interface Iaction {
    type: string,
    payload: {
			roomId: string,
			userName: string,
  },
} 

const reducer = (state: Istate, action: Iaction) => { 
	switch (action.type) {
		case 'JOINED':
			return {
				...state,
				joined: true,
				userName: action.payload.userName,
				roomId: action.payload.roomId,
			}
		default:
			return state;
	}
};

export default reducer;