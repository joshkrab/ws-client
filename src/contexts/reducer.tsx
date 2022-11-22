export interface IMessage {
	userName: string | null,
	text: string,
}

export interface IstateR {
	joined: boolean,
	roomId: string | null,
	userName: string | null,
	users: string[] | never[],
	messages: IMessage[] | never[],
	userWrite: string,
} 

interface Iaction {
	type: string,
	payload: {
	joined?: boolean,
	userName?: string | null,
	roomId?: string | null,
	users?: string[] | never[],
	messages?: IMessage[] | never[],
	userWrite?: string,
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
		case 'SET_DATA':
			return {
				...state,
				users: action.payload.users as string[],
				messages: action.payload.messages as IMessage[],
			}
		case 'SET_USER_WRITE':
			return {
				...state,
				userWrite: `${action.payload.userName} write a message...` as string,
			}
		case 'REMOVE_USER_WRITE':
			return {
				...state,
				userWrite: '' as string,
			}
		default:
			return state;
	}
};

export default reducer;