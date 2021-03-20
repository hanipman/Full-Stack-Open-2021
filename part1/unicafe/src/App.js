import React, { useState } from 'react'

function App() {
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
			<button onClick={handleGood}>good</button>
			<button onClick={handleNeutral}>neutral</button>
			<button onClick={handleBad}>bad</button>
			<h1>statistics</h1>
			<p>good {stats.good}</p>
			<p>neutral {stats.neutral}</p>
			<p>bad {stats.bad}</p>
			<p>all {stats.all}</p>
			<p>average {stats.average}</p>
			<p>positive {stats.positive} %</p>
		</div>
	)
}

export default App;
