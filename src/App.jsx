import { generateRandomLightColor } from 'make-random-color'
import { useState } from 'react'
import data from './assets/sample_data.json'
import './App.css'

const contributionsData = data.filter(({skill, course}) => skill && course)

const skillBlocksData = data.filter(({skill, title}) => skill && title)

const courseData = data.filter(({course, title}) => course && title)

const colors = contributionsData.reduce(
  (result, {course}) => result[course]
    ? result 
    : {...result, [course]: generateRandomLightColor()}, 
  {}
)

function App() {
  const [selectedCourses, setSelectedCourses] = useState([])  

  function toggleCourse(id) {
    if (selectedCourses.includes(id)) {
      setSelectedCourses(selectedCourses.filter(x => x !== id))
    } else {
      setSelectedCourses([...selectedCourses, id])    
    }
  }

  return (
    <>
      <header>
        <h1> TeknUTopia </h1>
      </header>
      <main className="container grid">
        { Object.entries(
            Object.groupBy(contributionsData, ({skill}) => skill)
          ).map(([skill, contributions], i) =>
            <SkillBlock {...{skill, contributions, selectedCourses}} key={i} />
          )
        }
        <fieldset>
          <legend>
            <h2> Parcours à la carte </h2>
          </legend>
          { courseData.map(({course, title}) =>
              <Course {...{course, title, toggleCourse}} key={course} />
            )
          }
        </fieldset>
      </main>    
    </>
  )
}

function SkillBlock({skill, contributions, selectedCourses}) {
  const {title} = skillBlocksData.find(x => x.skill.toString() === skill.toString());
  return (
    <article>
      <header>
        <h3> {title} </h3>
      </header>
      { contributions.map((y, j) =>
        <Contribution {...y} {...{selectedCourses}} key={j} />
      )}
    </article>
  );
}

function Contribution({course, selectedCourses}) {
  const display = selectedCourses.includes(course) ? 'block' : 'none';
  return (
    <article style={{background: colors[course], display}} >
      {course}
    </article>
  )
}

function Course({course, title, toggleCourse}) {
  return (
    <label>
      <input type="checkbox" name={course}
        onChange={() => toggleCourse(course)}
      />
        <b> {course} </b> — {title}
    </label>
  )
}

export default App
