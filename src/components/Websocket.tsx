import React, {useContext, useEffect, useRef, useState} from 'react';
import {WebsocketContext} from '../contexts/WebsocketContext';
import Button from './common/Button/Button';
import Textarea from './common/Textarea/Textarea';
import { v4 as uuid } from 'uuid';
import {IMessage} from '../contexts/reducer';

export const Websocket = ({users, messages, userName, roomId, userWrite, addMessage}: {
		users: string[] | never[],
		messages: IMessage[] | never[],
		userName: string | null,
		roomId: string | null,
		userWrite: string,
		addMessage: (message: IMessage) => void,
}) => {
	const [messageValue, setMessageValue] = useState('');
	const socket = useContext(WebsocketContext);
	const messagesRef = useRef<HTMLDivElement>(null);

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
		// Add message for myself
		addMessage({
			text: messageValue,
			userName,
		});
		setMessageValue('');
	}

	useEffect(() => { 
		messagesRef.current?.scrollTo(0, 999);
	}, [messages]);

	const writingMonitor = () => { 
			socket.emit('USER_WRITE', {
			userName,
			roomId,
		});
	};

	const writingBlurMonitor = () => { 
			socket.emit('USER_BLUR', {
			roomId,
		});
	};

	return (
		<div className='chat'>
			
			<div className="chat-users">
				<h2>Room: {roomId}</h2>
				<hr/>
				<b>Online ({users.length}):</b>
				
				<ul>
					{users.map(name => {
						const unique_id = uuid();
						return <li key={unique_id}>{name}</li>
					})}
				</ul>

				<hr />
				<p>
					<b className='user-write'>{userWrite}</b>
				</p>
				
			</div>

			<div className="chat-messages">
				<div ref={messagesRef} className="messages">
					{messages.map(message => {
						const classArr = ['message'];
						if (message.userName === userName) {
							classArr.push('my-message');
						}
						const unique_id = uuid();
						return <div key={unique_id} className={classArr.join(' ')}>
										<p>{message.text}</p>
										<div>
												<span>{message.userName}</span>
										</div>
									</div>
									}
						)}
				</div>
				<div className="chat-input">
					<Textarea
						value={messageValue}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageValue(e.target.value)}
						onFocus={(e: React.FocusEvent<HTMLInputElement>) => writingMonitor()}
						onBlur={(e: React.FocusEvent<HTMLInputElement>) => writingBlurMonitor()}
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

		</div>
	)
}
