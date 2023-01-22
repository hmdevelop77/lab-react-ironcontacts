import { useState } from "react";
import "./App.css";
import allContacts from "./contacts.json";

function App() {
  
  const firstContacts=allContacts.slice(0, 5)
console.log(firstContacts)
  const [contacts, setContacts] = useState(firstContacts);


  function addRandomContacts() {
    const randomContact =
      allContacts[Math.floor(Math.random() * allContacts.length)];
    if (contacts.includes(randomContact)) {
      addRandomContacts();
    } else {
      setContacts([...contacts, randomContact]);
    }
  };

function sortByName(){
  const sortedContacts=[...contacts].sort(function(a, b) {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  });
  setContacts(sortedContacts)
}

const sortByPopularity = () => {
  const sortedContacts = [...contacts].sort((a, b) => {
    if (a.popularity < b.popularity) return 1
    else if (a.popularity > b.popularity) return -1
    else return 0
  })
  setContacts(sortedContacts)
}

function deleteContacts(id){
  const newContactList = [...contacts].filter((contact) => {
    return contact.id !== id
  })
  setContacts(newContactList)
}

  return (
    <div className="App">
      <button onClick={addRandomContacts}>Add Random Contact</button>
      <button onClick={sortByName}>Sort By Name</button>
      <button onClick={sortByPopularity}>Sort By Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contacts) => {
            return (
              <tr key={contacts.id} className="table">
                <td>
                  <img
                    style={{ width: "70px" }}
                    src={contacts.pictureUrl}
                    alt={contacts.name}
                  />
                </td>
                <td>{contacts.name}</td>
                <td>{contacts.popularity}</td>
                <td>{contacts.wonOscar ? "🏆" : ""}</td>
                <td>{contacts.wonEmmy ? "🏆" : ""}</td>
                <td><button onClick={()=>deleteContacts(contacts.id)}>Delete</button></td> 
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
