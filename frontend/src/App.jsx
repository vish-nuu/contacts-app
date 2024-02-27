import { useEffect, useState } from "react";
import "./App.css";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact([]);
  };
  const openModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  };

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts"); //fetches the contacts by sending a GET request to the backend server
    const data = await response.json(); //takes as json file
    setContacts(data.contacts); //stores to the hook by "setcontacts"
    console.log("(frontend) GET request sent!");
  };

  return (
    <>
      <ContactList
        contacts={contacts}
        updateContact={openEditModal}
        updateCallback={onUpdate}
      />
      <button onClick={openModal}>Create Contact</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span onClick={closeModal} className="close">
              &times;
            </span>
            <ContactForm
              existingContact={currentContact}
              updateCallback={onUpdate}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;