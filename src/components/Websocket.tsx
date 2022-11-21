import React, {useContext, useEffect, useState} from 'react';
import {WebsocketContext} from '../contexts/WebsocketContext';
import Button from './common/Button/Button';
import Textarea from './common/Textarea/Textarea';
import { v4 as uuid } from 'uuid';
import {IMessage} from '../contexts/reducer';

export const Websocket = ({users, messages, userName, roomId}: {
		users: string[] | never[],
		messages: IMessage[] | never[],
		userName: string | null,
		roomId: string | null,
}) => {
	const [messageValue, setMessageValue] = useState('');
	const socket = useContext(WebsocketContext);

	useEffect(() => {
		socket.on('connect', () => {
			console.log(`Listening 'connect'`);
		})

		// When unmount component: close and open, otherwise it is mounted twice:
		return () => {
			console.log('Unregistering Events...');
			socket.off('connect');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const sendMessage = () => {
		socket.emit('ROOM:NEW_MESSAGE', {
			text: messageValue,
			userName,
			roomId,
		});
		setMessageValue('');
	}

	return (
		<div className='chat'>
			<div className="chat-users">
				<b>Online ({users.length}):</b>
				<ul>
					{users.map(name => {
						const unique_id = uuid();
						return <li key={unique_id}>{name}</li>
					})}
				</ul>
			</div>

			<div className="chat-messages">
				<div className="messages">
					{messages.map(message => {
						const unique_id = uuid();
						return <div key={unique_id} className="message">
										<p>{message.text}</p>
										<div>
												<span>{message.userName}</span>
										</div>
									</div>
									}
						)}
				</div>

					<Textarea
						value={messageValue}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageValue(e.target.value)}
						className="form-control"
						rows={3}
						placeholder={'Input your message'}
					></Textarea>
					
						<Button
						buttontext={'Send'}
						onClick={sendMessage}
					/>
			</div>

		</div>
	)
}
