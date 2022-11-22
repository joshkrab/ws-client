import axios from 'axios';
import React, {useState} from 'react'
import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput'

export default function EnterMenu({onLogin}:{ onLogin: (obj:{
			roomId: string,
			userName: string,
		})  => void; }) {
	const [roomId, setRoomId] = useState('');
	const [userName, setUserName] = useState('');
	const [isLoading, setLoading] = useState(false);

	const onEnter = async () => {
		if (!roomId || !userName) {
		return alert('Input correct data!')
		}

		const obj = {
			roomId,
			userName,
		}
		
		setLoading(true);
		await axios.post('http://localhost:9001/chat', obj);
		onLogin(obj);
	}

	return (
		<div className='enter-menu'>
			<div className="enter-wrapper">
				<MyInput type="text"
				placeholder="Room ID"
				value={roomId}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setRoomId(e.target.value)
				}}
			/>
			<MyInput
				type="text"
				placeholder="Your name"
				value={userName}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setUserName(e.target.value)
				}}
			/>
			<MyButton disabled={isLoading} onClick={onEnter}>{isLoading ? '...Entering': 'Enter' }</MyButton>
			</div>
			
		</div>
	);
};
