import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import FillForm from './components/FillForm'
import ShowPersons from './components/ShowPersons'

const App = () => { 
  // tilamuuttujat - "puhelinluettelo"
  const [persons, setPersons] = useState([])  
  // tilamuuttujat - hakumerkkijono
  const [searchString, setSearchString] = useState('') 
  // tilamuuttujat - nimi
  const [newName, setNewName] = useState('')
  // tilamuuttujat - numero
  const [newNumber, setNewNumber] = useState('')

  // hae data mock-serverilta:
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  // effect hook - ajetaan vain kerran (kun 'persons' on [])  
  useEffect(hook, [])

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
        searchString= {searchString}/>

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