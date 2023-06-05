import { useState, useEffect } from 'react'
import services from './services/persons.js'
import Notification from './components/Notification'
import Filter from './components/Filter'
import FillForm from './components/FillForm'
import ShowPersons from './components/ShowPersons'

const App = () => { 
  // tilamuuttuja - "puhelinluettelo"
  const [persons, setPersons] = useState([])  
  // tilamuuttuja - hakumerkkijono
  const [searchString, setSearchString] = useState('') 
  // tilamuuttuja - nimi
  const [newName, setNewName] = useState('')
  // tilamuuttuja - numero
  const [newNumber, setNewNumber] = useState('')
  // tilamuuttuja - onnistunut muutos/lisäys/poisto
  const [successMessage, setSuccessMessage] = useState(null)
  // tilamuuttuja - virhetilanne (muutos/poisto)
  const [errorMessage, setErrorMessage] = useState(null)
   
   // hae data mock-serverilta,
   // käytä persons.js-tiedostossa määriteltyjä metodeja
   useEffect(() => {
    services.getAll()
      .then(initData=> {setPersons(initData)})
    }, [])

  // lisää henkilö "puhelinluetteloon"
  const addPerson = (event) => {
    event.preventDefault()
    // kerää kaikki nimet taulukkoon
    const allNames= persons.reduce(
      (names, cur) => (names.concat(cur.name)), [])
    // tarkista löytyykö nimi jo rakenteesta
    if (allNames.includes(newName)) {
      // alert(`${newName} is already added to phonebook`)
      // jos löytyy, niin päivitä pyydettäessä puhelinnumero:
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
            // tulosta ilmoitus
            setSuccessMessage(
              `Phone number of '${foundPerson.name}' was updated`
            )
            setTimeout(() => {
              setSuccessMessage(null)
              }, 5000)
          })
            // virheilmoitus
          .catch(error => {
            setErrorMessage(
              `Person '${foundPerson.name}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          
      }
    }
    // muussa tapauksessa luo uusi objekti
    else {
      // luo uusi ID:
      const newID = Math.max(...persons.map(pp => pp.id))
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
        // tulosta ilmoitus
        setSuccessMessage(
          `Person '${nameObject.name}' was added to the phone book`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
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
        // tulosta ilmoitus
        setSuccessMessage(
          `Person '${removedPerson.name}' was deleted from the phone book`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        // virheilmoitus
        .catch(error => {
          setErrorMessage(
            `Person '${removedPerson.name}' was already removed from server`
            )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })        
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
      <Notification message={successMessage} />
      <Notification message={errorMessage} />
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