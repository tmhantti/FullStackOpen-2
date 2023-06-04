import { useState } from 'react'
import Filter from './components/Filter'
import FillForm from './components/FillForm'
import ShowPersons from './components/ShowPersons'

// eriytetty komponentti: yksittäisen henkilön tiedot
const PersonInfo= ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const App = () => {
  // esimerkkidata:
  const initData= 
  [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]
  // tilamuuttujat - "puhelinluettelo"
  const [persons, setPersons] = useState(initData)  
  // tilamuuttujat - suodatettu "puhelinluettelo"
  const [searchString, setSearchString] = useState('') 
  // tilamuuttujat - nimi
  const [newName, setNewName] = useState('')
  // tilamuuttujat - numero
  const [newNumber, setNewNumber] = useState('')

  // lisää henkilö "puhelinluetteloon": 
  const addPerson = (event) => {
    event.preventDefault()
    // tarkista, että onko nimi jo listassa:
    // kerää kaikki nimet taulukkoon
    const allNames= persons.reduce(
      (names, cur) => (names.concat(cur.name)), [])
    // ilmoita, jos nimi löytyy jo taulukosta
    if (allNames.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    // muussa tapauksessa lisää objekti
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }  
      setPersons (persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }
  
  // tapahtumien käsittelijät:
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchStringChange = (event) => {
    setSearchString(event.target.value)
    // console.log(filteredPersons)
  }

  // suodata henkilöt hakumerkkijonon perusteella: 
  const filteredPersons = 
    persons.filter(p=> p.name.toLowerCase().includes(searchString.toLowerCase()))

    return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        handleSearchStringChange= {handleSearchStringChange}
        searchString= {searchString}
        />

      <h2>Add a new</h2>
      <FillForm 
        persons= {persons} 
        newName= {newName} 
        newNumber= {newNumber} 
        addPerson= {addPerson} 
        handleNameChange= {handleNameChange} 
        handleNumberChange= {handleNumberChange} />

      <h2>Numbers</h2>
      <ShowPersons 
        persons= {filteredPersons}/>
    </div>
  )

}

export default App