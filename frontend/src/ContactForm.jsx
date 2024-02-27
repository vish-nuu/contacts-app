import React from "react";
import { useState } from "react";

const ContactForm = ({ existingContact = {}, updateCallback }) => {
  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName] = useState(existingContact.lastName || "");
  const [email, setEmail] = useState(existingContact.email || "");

  const isUpdating = Object.entries(existingContact).length !== 0;
  console.log("UPDATE MODE", isUpdating)

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = { firstName, lastName, email };
    console.log(`element added`, data);
    const options = {
      method: isUpdating?"PATCH":"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    if(isUpdating){
      const response = await fetch(
        `http://127.0.0.1:5000/update_contact/${existingContact.id}`,
        options
      );
    }else{
      const response = await fetch(
        "http://127.0.0.1:5000/create_contact",
        options
      );
    }
    
    updateCallback();
  };

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          placeholder="firstName"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          placeholder="lastName"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)
          }
        />
      </div>
      <button type="submit">{isUpdating ? "Update" : "Create"}</button>
    </form>
  );
};
export default ContactForm;
