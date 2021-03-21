import React from 'react'

const Course = ({ course }) => {
	return (
		<div>
			{course.parts.map(part =>
				<div key={part.id}>
					{part.name} {part.exercises}
				</div>	
			)}
		</div>
	)
}

const App = () => {
	const course = {
		id: 1,
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
				id: 1
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
				id: 2
			},
			{
				name: 'State of a component',
				exercises: 14,
				id: 3
			},
			{
				name: 'Redux',
				exercises: 11,
				id: 4
			}
		]
	}

	return (
		<div>
			<h1>{course.name}</h1>
			<Course course={course} />
			<b>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises </b>
		</div>
	)
}

export default App;