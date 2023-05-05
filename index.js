const fs = require("fs");

const contacts = require("./contacts.js");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      console.log(list);
      break;

    case "get":
      const get = await contacts.getContactById(id);
      console.log(get);
      break;

    case "add":
      const add = await contacts.addContact(id, name, email, phone);
      console.log(add);
      break;

    case "remove":
      await contacts.removeContact(id);
      console.log(`Contact with ID ${id} removed successfully.`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const actionIndex = process.argv.indexOf("--action");
if (actionIndex !== -1) {
  const action = process.argv[actionIndex + 1];
  const id = process.argv[actionIndex + 2];
  const name = process.argv[actionIndex + 3];
  const email = process.argv[actionIndex + 4];
  const phone = process.argv[actionIndex + 5];
  invokeAction({ action, id, name, email, phone });
}
