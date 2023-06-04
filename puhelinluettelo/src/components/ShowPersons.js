// eriytetty komponentti: kaikkien henkilöiden tiedot
import PersonInfo from './PersonInfo'
const ShowPersons = ({persons}) => {
    return (
      <div>
        <ul>
          {persons.map(person =>
            <PersonInfo key={person.name} person={person} />
          )}
        </ul>
      </div>
    )
  }
  export default ShowPersons