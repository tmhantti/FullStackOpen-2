const Course= ({courses}) => {
  return (
      <div> {
        courses.map(course =>         
        <SingleCourse key={course.id} course={course}/>
      )} 
      </div>
      )
}

// tulostaa yksittäisen kurssin tiedot
const SingleCourse = ({course}) => {
  return (<div>
    <Header course={course.name} />
    <Content parts= {course.parts}/>
    <Total parts= {course.parts}/>
  </div>)
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
    
const Content = (props) => {
  const parts = props.parts  
    return (
      <div>
        {parts.map(part => 
          <Part key= {part.id} name= {part.name} exercises= {part.exercises}/>
         )}
      </div>
    )
  }

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  const parts = props.parts 
  const tot= parts.reduce( 
    (sum, cur)=> sum + cur.exercises, 0
    )
  return (
    <div>      
      <p><b>total of {tot} exercises</b></p>
    </div>
  )
}

export default Course