import React, { useState } from 'react';

// Helper function to shuffle an array and ensure it contains only numbers
const shuffleArray = (array: number[]) => {
	const shuffledArray: number[] = [];
	const availableNumbers = [...array];
	while (availableNumbers.length > 0) {
		const randomIndex = Math.floor(Math.random() * availableNumbers.length);
		const selectedNumber = availableNumbers.splice(randomIndex, 1)[0];
		shuffledArray.push(selectedNumber!);
	}

	return shuffledArray;
};

const NumberGame: React.FC = () => {
	const initialNumbers: number[] = Array.from({ length: 10 }, (_, int) => int + 1);
	const [numbers, setNumbers] = useState<number[]>(initialNumbers);
	const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

	const selectNumber = (number: number) => {
		setSelectedNumbers((prevSelectedNumbers) => {
			if (prevSelectedNumbers.includes(number)) {
				// If the number is already selected, remove it
				return prevSelectedNumbers.filter((num) => num !== number);
			} else {
				// If the number is not selected, add it
				return [...prevSelectedNumbers, number];
			}
		});
	};

	const nextRound = () => {
		const availableNumbers = numbers.filter((number) => !selectedNumbers.includes(number));

		// Shuffle the available numbers while keeping selected numbers in their original order
		const shuffledAvailableNumbers = shuffleArray(availableNumbers);
		const newNumbers: number[] = [];

		for (let ii = 0, jj = 0; ii < numbers.length; ii++) {
			if (selectedNumbers.includes(numbers[ii]!)) {
				newNumbers.push(numbers[ii]!);
			} else if (jj < shuffledAvailableNumbers.length) {
				newNumbers.push(shuffledAvailableNumbers[jj]!);
				jj++;
			}
		}

		setNumbers(newNumbers);
	};

	const resetGame = () => {
		setNumbers(initialNumbers);
		setSelectedNumbers([]);
	};

	return (
		<div className="text-white">
			<div>
				<h2>Click to Freeze Numbers:</h2>
				{numbers.map((number) => (
					<button
						className={`${
							selectedNumbers.includes(number) ? 'bg-green-300' : 'bg-gray-300'
						} hover:bg-green-300 py-2 px-4 rounded-md m-1`}
						key={number}
						onClick={() => selectNumber(number)}
						type="button"
					>
						{number}
					</button>
				))}
			</div>
			<div>
				<h2>Selected Numbers:</h2>
				{selectedNumbers.map((number) => (
					<span key={number}>{number}</span>
				))}
			</div>
			<div className="mt-4">
				<button className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2" onClick={nextRound} type="button">
					Next Round
				</button>
				<button className="bg-red-500 text-white py-2 px-4 rounded-lg" onClick={resetGame} type="button">
					Reset Game
				</button>
			</div>
		</div>
	);
};

export default NumberGame;
