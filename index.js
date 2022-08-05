const methods = require('./db/contacts')
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          const allContacts = await methods.listContacts()
          console.log(allContacts)
      break;

    case "get":
          const contact = await methods.getContactById(id)
          console.log(contact)
      break;

    case "add":
          const newContact = await methods.addContact(name, email, phone)
          console.log(newContact)
      break;

    case "remove":
          const removedContact = await methods.removeContact(id)
          console.log(removedContact)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}



invokeAction(argv);