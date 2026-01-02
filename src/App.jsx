import { generateRandomLightColor } from 'make-random-color'
import { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Accordion from 'react-bootstrap/Accordion';
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
              { Object.entries(
                  Object.groupBy(contributionsData, ({skill}) => skill)
                ).map(([skill, contributions], i) =>
                  <SkillBlock {...{skill, contributions, selectedCourses}} key={i} />
                )
              }
            </CardGroup>
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
        { courses.map(({course, title}) =>
            <Course {...{course, title, toggleCourse}} key={course} />
          )
        }
      </Accordion.Body>
    </Accordion.Item>
  )
}

function SkillBlock({skill, contributions, selectedCourses}) {
  const {title} = skillBlocksData.find(x => x.skill.toString() === skill.toString());
  return (
    <Card>
      <Card.Title> {title} </Card.Title>
      <div className="contribution-wrapper">
        { contributions.map((y, j) =>
          <Contribution {...y} {...{selectedCourses}} key={j} />
        )}
      </div>
    </Card>
  );
}

function Contribution({course, selectedCourses}) {
  const display = selectedCourses.includes(course) ? 'inline-flex' : 'none';
  return (
    <span style={{'background': colors[course], display}} className='contribution'>
      {course}
    </span>
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
