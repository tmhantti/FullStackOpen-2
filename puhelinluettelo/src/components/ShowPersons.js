// eriytetty komponentti: kaikkien henkilöiden tiedot
import PersonInfo from './PersonInfo'
const ShowPersons = ({persons, delPerson}) => {
    return (
      <div>
        <ul>
          {persons.map(person =>
            <PersonInfo key={person.name} 
              person={person} 
              delPerson={() => delPerson(person.id)}  
            />
          )}
        </ul>
      </div>
    )
  }
  export default ShowPersons