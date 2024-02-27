import React from "react";
const ContactList = ({ contacts, updateContact, updateCallback }) => {
  const onDelete = async (e) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete_contact/${e.id}`,
        options
      );
      if (response.status == 200) {
        updateCallback();
      } else {
        console.error("DELETE FAILED");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h2 className="head">Contacts</h2>
      <table>
        <thead>
          <tr>
            
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>EMAIL</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>
                <button onClick={() => updateContact(contact)}>UPDATE</button>
                <button onClick={() => onDelete(contact)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
