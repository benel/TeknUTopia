import { generateRandomLightColor } from 'make-random-color'
import data from './assets/sample_data.json'
import './App.css'

const colors = data.reduce(
  (result, {course}) => result[course]
    ? result 
    : {...result, [course]: generateRandomLightColor()}, 
  {}
)

function App() {
  return (
    <>
      <header>
        <h1> TeknUTopia </h1>
      </header>
      <main className="container grid">
        { Object.entries(
            Object.groupBy(data, ({skill}) => skill)
          ).map(([skill, contributions], i) =>
            <SkillBlock {...{skill, contributions}} key={i} />
          )
        }
      </main>    
    </>
  )
}

function SkillBlock({skill, contributions}) {
  return (
    <article>
      <header> {skill} </header>
      { contributions.map((y, j) =>
        <Contribution {...y} key={j} />
      )}
    </article>
  );
}

function Contribution({course}) {
  return (
    <article style={{background: colors[course]}} >
      {course}
    </article>
  )
}

export default App
