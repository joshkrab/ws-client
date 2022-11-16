import React, {useContext, useEffect, useState} from 'react';
import { v4 as uuid } from 'uuid';
import {WebsocketContext} from '../contexts/WebsocketContext';
import Button from './common/Button/Button';
import Input from './common/Input/Input';

type MessagePayload = {
	message: string;
	content: string;
}

export const Websocket = () => {
	const [value, setValue] = useState('');
	const [messages, setMessages] = useState<MessagePayload[]>([]);
	const socket = useContext(WebsocketContext);

	useEffect(() => {
		socket.on('connect', () => {
			console.log(`Listening 'connect'`);
		})

		socket.on('onMessage', (data: MessagePayload) => {
			console.log('onMessage event received:');
			console.log(data);
			setMessages((prev) => [...prev, data]);
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
		<div>
			<div>
				<h1>Websocket component</h1>
				<div>{
					messages.length === 0 ? <div>No messages</div> : <div>{
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
			</div>
		</div>
	)
}
