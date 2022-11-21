export interface IMessage {
	userName: string,
	text: string,
}

export interface IstateR {
	joined: boolean,
	roomId: string | null,
	userName: string | null,
	users: string[] | never[],
	messages: IMessage[] | never[],
} 

interface Iaction {
	type: string,
	payload: {
	joined?: boolean,
	userName?: string | null,
	roomId?: string | null,
	users?: string[] | never[],
	messages?: IMessage[] | never[],
	},
}

const reducer = (state: IstateR, action: Iaction) => { 
	switch (action.type) {
		case 'JOINED':
			return {
				...state,
				joined: true,
				userName: action.payload.userName as string,
				roomId: action.payload.roomId  as string,
			}
		case 'SET_USERS':
			return {
				...state,
				users: action.payload.users as string[],
			}
		case 'SET_MESSAGES':
			return {
				...state,
				messages: [...state.messages, action.payload] as IMessage[],
			}
		default:
			return state;
	}
};

export default reducer;