import data from './assets/sample_data.json'
import './App.css'

function App() {
  return (
    <>
      <header>
        <h1> TeknUTopia </h1>
      </header>
      <main className="container">
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
    <div>
      <header> {skill} </header>
      { contributions.map((y, j) =>
        <Contribution {...y} key={j} />
      )}
    </div>
  );
}

function Contribution({course}) {
  return (
    <article>
      {course}
    </article>
  )
}

export default App
