import { Button } from '@/components/ui/button'
import type React from 'react'
import { useState } from 'react'

// Helper function to shuffle an array and ensure it contains only numbers
const shuffleArray = (array: number[]) => {
	const shuffledArray: number[] = []
	const availableNumbers = [...array]
	while (availableNumbers.length > 0) {
		const randomIndex = Math.floor(Math.random() * availableNumbers.length)
		const selectedNumber = availableNumbers.splice(randomIndex, 1)[0]
		shuffledArray.push(selectedNumber!)
	}

	return shuffledArray
}

const NumberGame: React.FC = () => {
	const initialNumbers: number[] = Array.from({ length: 10 }, (_, int) => int + 1)
	const [numbers, setNumbers] = useState<number[]>(initialNumbers)
	const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])

	const selectNumber = (number: number) => {
		setSelectedNumbers((prevSelectedNumbers) => {
			if (prevSelectedNumbers.includes(number)) {
				// If the number is already selected, remove it
				return prevSelectedNumbers.filter((num) => num !== number)
			} else {
				// If the number is not selected, add it
				return [...prevSelectedNumbers, number]
			}
		})
	}

	const nextRound = () => {
		const availableNumbers = numbers.filter((number) => !selectedNumbers.includes(number))

		// Shuffle the available numbers while keeping selected numbers in their original order
		const shuffledAvailableNumbers = shuffleArray(availableNumbers)
		const newNumbers: number[] = []

		const nonSelectedNumbers = shuffledAvailableNumbers.slice(0, numbers.length - selectedNumbers.length)
		const selectedNumberIndices: { [key: number]: boolean } = {}

		for (const number_ of numbers) {
			if (selectedNumbers.includes(number_)) {
				newNumbers.push(number_)
				selectedNumberIndices[number_] = true
			} else {
				// Find the first non-selected number that hasn't been placed in a position
				let found = false
				for (const nonSelectedNumber of nonSelectedNumbers) {
					if (!selectedNumberIndices[nonSelectedNumber]) {
						newNumbers.push(nonSelectedNumber)
						selectedNumberIndices[nonSelectedNumber] = true
						found = true
						break
					}
				}

				if (!found) {
					// In case all non-selected numbers have been placed, you can handle it as needed.
					// For simplicity, we add a placeholder value here.
					newNumbers.push(-1)
				}
			}
		}

		setNumbers(newNumbers)
	}

	const resetGame = () => {
		setNumbers(initialNumbers)
		setSelectedNumbers([])
	}

	return (
		<div>
			<div>
				<h2>Click to Freeze Numbers:</h2>
				{numbers.map((number) => (
					<Button
						className={`${
							selectedNumbers.includes(number) ? 'bg-green-600' : ''
						} hover:bg-green-500 py-2 px-4 rounded-md m-1`}
						key={number}
						onClick={() => selectNumber(number)}
						type="button"
					>
						{number}
					</Button>
				))}
			</div>
			<div>
				<h2>Selected Numbers:</h2>
				{selectedNumbers.map((number) => (
					<span key={number}>{number} </span>
				))}
			</div>
			<div className="mt-4">
				<Button className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-lg" onClick={nextRound} type="button">
					Next Round
				</Button>
				<Button className="px-4 py-2 text-white bg-red-500 rounded-lg" onClick={resetGame} type="button">
					Reset Game
				</Button>
			</div>
		</div>
	)
}

export default NumberGame
