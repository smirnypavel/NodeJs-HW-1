const fs = require("fs/promises");

const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");
console.log(contactsPath);

function updateContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
}

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  return contact;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== id);
  await updateContacts(updatedContacts);
}

async function addContact(id, name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(8), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
