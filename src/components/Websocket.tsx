import React, {useContext, useEffect, useState} from 'react';
import {WebsocketContext} from '../contexts/WebsocketContext';
import Button from './common/Button/Button';
import Textarea from './common/Textarea/Textarea';
import { v4 as uuid } from 'uuid';

type MessagePayload = {
	message: string;
	content: string;
}

export const Websocket = ({users, messages}: {
		users: string[] | never[],
		messages: string[] | never[],
}) => {
	const [value, setValue] = useState('');
	const [messageValue, setMessageValue] = useState('');
	//const [messages, setMessages] = useState<MessagePayload[]>([]);
	const socket = useContext(WebsocketContext);

	useEffect(() => {
		socket.on('connect', () => {
			console.log(`Listening 'connect'`);
		})

		socket.on('onMessage', (data: MessagePayload) => {
			console.log('onMessage event received:');
			console.log(data);
			//setMessages((prev) => [...prev, data]);
		})

		// When unmount component: close and open, otherwise it is mounted twice:
		return () => {
			console.log('Unregistering Events...');
			socket.off('connect');
			socket.off('onMessage');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onSubmit = () => {
		socket.emit('newMessage', value);
		setValue('');
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
					<div className="message">
						<p>Lorem ipsum dolor sit amet.</p>
						<div>
							<span>Test User</span>
						</div>
					</div>

					<div className="message">
						<p>Lorem ipsum dolor sit amet.</p>
						<div>
							<span>Test User</span>
						</div>
					</div>
				</div>

				<form>		
					<Textarea
						value={messageValue}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageValue(e.target.value)}
						className="form-control"
						rows={3}
						placeholder={'Input your message'}
					></Textarea>
					
						<Button
						buttontext={'Send'}
						onClick={onSubmit}
					/>
				</form>
			</div>


			{/* First example, not actual */}
			{/* <div>
					<div>{
					messages.length === 0 ? <div>No messages</div> :
						<div>{
									messages.map(msg => { 
										const unique_id = uuid();
										return <div key={unique_id}>{ msg.content}</div>
									})
								}</div>
							}</div>
						<Input
							//labeltext={'label text'}
							placeholder={'Input your message'}
							value={value}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
						/>
						<Button
							buttontext={'Send'}
							onClick={onSubmit}
						/>
			</div> */}
		</div>
	)
}
