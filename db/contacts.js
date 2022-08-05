
const fs = require('fs/promises');
const nanoid = require('nanoid');


const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');

async function updateFile(file) {
    await fs.writeFile(contactsPath, JSON.stringify(file, null,2))
} 

async function listContacts() {
    const allContacts = await fs.readFile(contactsPath)
    return JSON.parse(allContacts)
}

async function getContactById(contactId) {
    const allContacts = await listContacts();
    const contact = allContacts.find(({ id }) => id === contactId);
    return contact || null;
}

async function removeContact(contactId) {
    const allContacts = await listContacts();
    const idx = allContacts.findIndex(({ id }) => id === contactId)
    if (idx===-1) {
        return null
    }
    const [contact] = allContacts.splice(idx, 1)
    updateFile(allContacts)
    return contact;

}

async function addContact(name, email, phone) {
    const allContacts = await listContacts()
    const newContact = { name, email, phone, id: nanoid() }
    allContacts.push(newContact)
    updateFile(allContacts)
    return newContact;
    
}

module.exports = {listContacts, getContactById, removeContact, addContact};

