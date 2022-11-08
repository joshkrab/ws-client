import React, {useContext, useEffect, useState} from 'react'
import {WebsocketContext} from '../contexts/WebsocketContext'
import Button from './common/Button/Button';
import Input from './common/Input/Input';

export const Websocket = () => {
	const [value, setValue] = useState('');
	const socket = useContext(WebsocketContext);

	useEffect(() => {
		socket.on('connect', () => {
			console.log('Connected!');
		})

		socket.on('onMessage', (data) => {
			console.log('onMessage event received:');
			console.log(data);
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
				<Input
					labeltext={'label text'}
					placeholder={'placeholder'}
					value={value}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
				/>
				<Button
					buttontext={'Submit'}
					onClick={onSubmit}
				/>
			</div>
		</div>
	)
}
