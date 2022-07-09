/*
 * https://frontendeval.com/questions/countdown-timer
 *
 * Create a countdown timer that notifies the user
 */

import { useState, useEffect } from 'react';
import './styles.css';

const TimerInputField = (props) => {
	const { name, placeholder, value, setValue, size, isPauseBtn } = props;

	const handleChange = ({ target }) => {
		const { validity, value } = target;
		setValue((prev) => (validity.valid ? value.slice(0, size) : prev));
	};

	return isPauseBtn ? (
		<span>{value.toString().padStart(2, '0')}</span>
	) : (
		<input
			id={name}
			name={name}
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
			size={size}
			pattern="[0-9]*"
		/>
	);
};

const CountdownTimer = () => {
	const [hours, setHours] = useState('');
	const [minutes, setMinutes] = useState('');
	const [seconds, setSeconds] = useState('');
	const [btn, setBtn] = useState('Start');

	const isPauseBtn = btn === 'Pause';

	useEffect(() => {
		const hasTimeLeft = hours + minutes + seconds > 0;

		function countdown() {
			if (+minutes === 0 && +seconds === 0) {
				setHours(hours - 1);
				setMinutes(60);
			} else if (+seconds === 0) {
				setMinutes(minutes - 1);
				setSeconds(60);
			} else {
				setSeconds(seconds - 1);
			}
		}

		if (isPauseBtn && hasTimeLeft) {
			const timer = setInterval(countdown, 1000);
			return () => clearInterval(timer);
		}
	}, [isPauseBtn, hours, minutes, seconds]);

	const handleStartPauseClick = () => {
		setBtn(isPauseBtn ? 'Start' : 'Pause');
	};
	const handleResetClick = () => {
		setHours('');
		setMinutes('');
		setSeconds('');
		setBtn('Start');
		clearInterval();
	};

	return (
		<>
			<h1>Countdown timer</h1>
			<div className="container">
				<TimerInputField
					name="hour"
					placeholder="HH"
					value={hours}
					setValue={setHours}
					size="2"
					isPauseBtn={isPauseBtn}
				/>
				:
				<TimerInputField
					name="minute"
					placeholder="MM"
					value={minutes}
					setValue={setMinutes}
					size="2"
					isPauseBtn={isPauseBtn}
				/>
				:
				<TimerInputField
					name="second"
					placeholder="SS"
					value={seconds}
					setValue={setSeconds}
					size="2"
					isPauseBtn={isPauseBtn}
				/>
				<button onClick={handleStartPauseClick}>{btn}</button>
				{isPauseBtn && <button onClick={handleResetClick}>Reset</button>}
			</div>
		</>
	);
};

export default function App() {
	return (
		<div className="App">
			<CountdownTimer />
		</div>
	);
}
