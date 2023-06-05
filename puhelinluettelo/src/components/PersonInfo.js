// eriytetty komponentti: yhden henkilön tiedot
const PersonInfo= ({ person, delPerson }) => {
    return (
      <li>{person.name} {person.number} <button onClick={delPerson}>delete</button>
      </li>
    )
  }
export default PersonInfo