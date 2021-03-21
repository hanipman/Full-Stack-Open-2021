import React from 'react'

const Course = ({ courses }) => {
	return (
		<div>
			{courses.map(course =>
				<div key={course.id}>
					<h2>{course.name}</h2>
					{course.parts.map(part =>
						<div key={part.id}>
							{part.name} {part.exercises}
						</div>
					)}
					<b>
						total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
					</b>
				</div>	
			)}
		</div>
	)
}

const App = () => {
	const courses = [
		{
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
		},
		{
			name: 'Node.js',
			id: 2,
			parts: [
				{
					name: 'Routing',
					exercises: 3,
					id: 1
				},
				{
					name: 'Middlewares',
					exercises: 7,
					id: 2
				}
			]
		}
	]

	return (
		<div>
			<h1>Web development curriculum</h1>
			<Course courses={courses} />
			{/* <b>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises </b> */}
		</div>
	)
}

export default App;