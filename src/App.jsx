import { generateRandomLightColor } from 'make-random-color'
import { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/Table'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import data from './assets/data.json'
import './App.css'

const contributionsData = data.filter(({skill, course}) => skill && course)

const skillBlocksData = data.filter(({skill, title}) => skill && title)

const courseData = data.filter(({course, title}) => course && title)

const tooltipData = data.filter(({tag, title}) => tag && title)

const colors = contributionsData.reduce(
  (result, {course}) => result[course]
    ? result 
    : {...result, [course]: generateRandomLightColor()}, 
  {}
)

function App() {
  const [selectedCourses, setSelectedCourses] = useState([])  
  const coursesBySession = Object.groupBy(courseData, ({level, session}) => [level,session])

  function toggleCourse(id) {
    if (selectedCourses.includes(id)) {
      setSelectedCourses(selectedCourses.filter(x => x !== id))
    } else {
      setSelectedCourses([...selectedCourses, id])    
    }
  }

  return (
    <>
      <Navbar expand="md">
        <Navbar.Brand> TeknUTopia </Navbar.Brand>
      </Navbar>
    
      <Container>
        <Row>
          <Col md={8} >
            <CardGroup>
              { skillBlocksData.filter(x => x.display !== 'horizontal')
                  .map(({skill, title}, i) =>
                    <SkillBlock {...{skill, title, selectedCourses}} key={i} />
                  )
              }
            </CardGroup>
            { skillBlocksData.filter(x => x.display === 'horizontal')
                .map(({skill, title}, i) =>
                  <SkillBlock {...{skill, title, selectedCourses}} key={i} />
                )
            }
          </Col>
          <Col>
            <fieldset>
              <Accordion>
                { Object.entries(coursesBySession).map(([session, courses]) => 
                    <CourseSession {...{session, courses, toggleCourse}} key={session} />
                  )
                }
              </Accordion>
            </fieldset>
            <Report {...{selectedCourses}} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

function CourseSession({session, courses, toggleCourse}) {
  const title = session.split(',')
  return (
    <Accordion.Item eventKey={session}>
      <Accordion.Header> {title[0]} ({title[1]}) </Accordion.Header>
      <Accordion.Body>
        { courses.map(({course, title, future, tags}) =>
            <Course {...{course, title, future, tags, toggleCourse}} key={course} />
          )
        }
      </Accordion.Body>
    </Accordion.Item>
  )
}

function SkillBlock({skill, title, selectedCourses}) {
  const contributions = contributionsData.filter(x => x.skill.toString() === skill.toString())
  return (
    <Card>
      <Card.Body>
        <Card.Title> {title} </Card.Title>
        <div className="contribution-wrapper">
          { contributions.map((y, j) =>
            <Contribution {...y} {...{selectedCourses}} key={j} />
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

function Contribution({course, selectedCourses}) {
  const display = selectedCourses.includes(course) ? 'inline-flex' : 'none'
  return (
    <span style={{'background': colors[course], display}} className='contribution'>
      {course}
    </span>
  )
}

function Course({course, title, future, tags = [], toggleCourse}) {
  return (
    <label>
      <input type="checkbox" name={course}
        onChange={() => toggleCourse(course)}
      /> <b>{course}</b> <Tags {...{tags}} /> — {title}
      {future && ' (bientôt)'}
    </label>
  )
}

function Report({selectedCourses}) {
  const report = courseData.filter(({course}) => selectedCourses.includes(course))
    .reduce((l, {tags, level, type}) => [...l, ...(tags ?? []), level, type], [])
    .reduce((l, x) => {
      l[x] = (l[x] ?? 0) + 1
      return l
    }, {})

  return (
    <Table bordered hover>
      <tbody>
      { Object.entries(report).sort().map(([k, v]) =>
        <tr key={k}>
          <th> <Tags tags={[k]} /> </th>
          <td>{v}</td>
        </tr>
      ) }
      </tbody>
    </Table>
  )
}

function Tags({tags}) {
  const tooltips = tags.map(x =>
    tooltipData.find(({tag}) => tag === x) || {tag: x}
  )

  return tooltips.map(({tag, title}) => title
    ? <OverlayTrigger overlay={ <Tooltip> {title} </Tooltip> } key={tag} >
      <span>{tag}</span>
    </OverlayTrigger>
    : <span key={tag}>{tag}</span> 
  )
}

export default App
