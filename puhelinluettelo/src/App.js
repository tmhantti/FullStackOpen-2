import { useState, useEffect } from 'react'
import services from './services/persons.js'
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
   // käytä persons.js-tiedostossa määriteltyjä metodeja:
   useEffect(() => {
    services.getAll()
      .then(initData=> {setPersons(initData)})
    }, [])

  // lisää henkilö "puhelinluetteloon": 
  const addPerson = (event) => {
    event.preventDefault()
    // kerää kaikki nimet taulukkoon
    const allNames= persons.reduce(
      (names, cur) => (names.concat(cur.name)), [])
    // tarkista löytyykö nimi jo rakenteesta
    if (allNames.includes(newName)) {
      // alert(`${newName} is already added to phonebook`)
      // jos löytyy, päivitä pyydettäessä puhelinnumero:
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        // etsi nimeä vastaava objekti
        const foundPerson = persons.find(p=> p.name === newName)   
        const tmp= newNumber 
        const id= foundPerson.id
        const updatedPerson= { ...foundPerson, number: tmp}
        // päivitä mock-serveri ja persons-rakenne
        services
          .update(id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            // tyhjennä kentät
            setNewName('')
            setNewNumber('')
          })
      }
    }
    // muussa tapauksessa luo uusi objekti
    else {
      // luo uusi ID:
      const newID = Math.max(...persons.map(pp => pp.id))
      console.log(newID)
      const nameObject = {
        name: newName,
        number: newNumber,
        id: newID + 1
      }  
      // lisää objekti mock-serverille + rakenteeseen
      services
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        // tyhjennä kentät
        setNewName('')
        setNewNumber('')
      })
    }
  }
  
  // poista henkilö "puhelinluettelosta"
  const deletePerson = id => {
    // etsi id:tä vastaava objekti
    const removedPerson = persons.find(p=> p.id === id)
    // varmista pyyntö
    if (window.confirm(`Delete ${removedPerson.name}?`)) {
      // poista objekti mock-serveriltä + rakenteesta
      services
        .del(id, removedPerson)
        .then(setPersons(persons.filter(p => p.id !== id)))
      console.log(`person with id ${id} deleted`)
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
        handleNumberChange= {handleNumberChange}           
        />

      <h2>Numbers</h2>
      <ShowPersons 
        persons= {filteredPersons}
        delPerson= {deletePerson}
        />
    </div>
  )

}

export default App