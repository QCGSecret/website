import React, { useState } from 'react';
import Alert from './GuideAlert';

const isValidNumber = (num: string): boolean => /^[1-4]*$/.test(num);
const hasUniqueDigits = (num: string): boolean => new Set(num.split('')).size === num.length;

// Reference
// Number 1 = control
// Number 2 = mid

const LaserSolver: React.FC = () => {
	const [number1, setNumber1] = useState<string>('');
	const [number2, setNumber2] = useState<string>('');
	const [result, setResult] = useState<string>('');

	const handleCalculate = () => {
		if (number1.length === 4 && number2.length === 4) {
			const paddedNumber1 = number1.padStart(4, '0');
			const paddedNumber2 = number2.padStart(4, '0');
			const roomNumbers = String(paddedNumber1).split('');
			const midNumbers = String(paddedNumber2).split('');

			const finalOrder = [0, 0, 0, 0];
			for (let ii = 0; i < 4; i++) {
				// eslint-disable-next-line radix
				const int = Number.parseInt(midNumbers[ii]!);
				// eslint-disable-next-line radix
				const pos = Number.parseInt(roomNumbers[ii]!) - 1;
				finalOrder[pos] = int;
			}

			const sum = finalOrder.join('');
			setResult(sum.toString());
		} else {
			setResult('Invalid numbers');
		}
	};

	const handleNumber1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		if (isValidNumber(newValue) && newValue.length <= 4 && hasUniqueDigits(newValue)) {
			setNumber1(newValue);
		}
	};

	const handleNumber2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		if (isValidNumber(newValue) && newValue.length <= 4 && hasUniqueDigits(newValue)) {
			setNumber2(newValue);
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleCalculate();
		}
	};

	return (
		<Alert title="Laser Solver" type="info">
			<div className="flex flex-col items-center gap-2.5">
				<input
					className="px-4 py-3 text-white placeholder-white bg-gray-800 border border-transparent rounded-lg w-72"
					maxLength={4}
					onChange={handleNumber1Change}
					onKeyDown={handleKeyDown}
					placeholder="Enter the control room laser order"
					type="text"
					value={number1}
				/>
				<input
					className="px-4 py-3 text-white placeholder-white bg-gray-800 border border-transparent rounded-lg w-72"
					maxLength={4}
					onChange={handleNumber2Change}
					onKeyDown={handleKeyDown}
					placeholder="Enter the middle laser order"
					type="text"
					value={number2}
				/>
				<button
					className="px-5 py-2 text-white bg-blue-500 border-none rounded-lg cursor-pointer"
					onClick={handleCalculate}
					type="button"
				>
					Calculate
				</button>
				<div className="mt-4">
					<p>Result: {result}</p>
				</div>
			</div>
		</Alert>
	);
};

export default LaserSolver;
