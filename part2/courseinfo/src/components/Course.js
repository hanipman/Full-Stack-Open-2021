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

export default Course