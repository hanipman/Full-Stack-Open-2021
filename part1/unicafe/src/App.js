import React, { useState } from 'react'

const Button = ({text, onClick}) => {
	return (
		<button onClick={onClick}>
			{text}
		</button>
	)
}

const Statistic = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{Math.round(value * 10)/10} {text === "positive" ? "%":""}</td>
		</tr>
	)
}

const Statistics = ({ stats }) => {
	if (stats.all === 0) {
		return (
			<p>No feedback given</p>
		)
	}

	return (
		<table>
			<tbody>
				<Statistic text="good" value={stats.good} />
				<Statistic text="neutral" value={stats.neutral} />
				<Statistic text="bad" value={stats.bad} />
				<Statistic text="all" value={stats.all} />
				<Statistic text="average" value={stats.average} />
				<Statistic text="positive" value={stats.positive} />
			</tbody>
		</table>
	);
}

const App = () => {
	const [stats, setStats] = useState(
		{
			good: 0,
			neutral: 0,
			bad: 0,
			all: 0,
			average: 0,
			positive: 0
		}
	)

	const handleGood = () => {
		setStats({
			...stats,
			good: stats.good + 1,
			all: stats.all + 1,
			average: (stats.good - stats.bad + 1)/(stats.all + 1),
			positive: 100 * (stats.good + 1)/(stats.all + 1)
		})
	}

	const handleNeutral = () => {
		setStats({
			...stats,
			neutral: stats.neutral + 1,
			all: stats.all + 1,
			average: (stats.good - stats.bad + 1)/(stats.all + 1),
			positive: 100 * (stats.good)/(stats.all + 1)
		})
	}

	const handleBad = () => {
		setStats({
			...stats,
			bad: stats.bad + 1,
			all: stats.all + 1,
			average: (stats.good - stats.bad - 1)/(stats.all + 1),
			positive: 100 * (stats.good)/(stats.all + 1)
		})
	}

	return (
		<div>
			<h1>give feedback</h1>
			<Button text="good" onClick={handleGood}/>
			<Button text="neutral" onClick={handleNeutral}/>
			<Button text="bad" onClick={handleBad}/>
			<h1>statistics</h1>
			<Statistics stats={stats} />
		</div>
	)
}

export default App;
