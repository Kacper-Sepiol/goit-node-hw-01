const fs = require("fs").promises;
const { resolve } = require("node:path");

const contactsPath = resolve("./db/contacts.json");

async function listContacts() {
    try {
        const filePath = resolve(contactsPath);
        const contents = await fs.readFile(filePath, { encoding: "utf8" });
        const contacts = JSON.parse(contents);

        const contactList = contacts.map((contact) => {
            return {
                id: contact.id,
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
            };
        });

        console.table(contactList);
    } catch (error) {
        console.error(error.message);
    }
}

async function getContactById(contactId) {
    try {
        const filePath = resolve(contactsPath);
        const contents = await fs.readFile(filePath, { encoding: "utf8" });
        const contacts = JSON.parse(contents);

        const foundContact = contacts.find(
            (contact) => contact.id === contactId
        );

        if (foundContact) {
            console.log(foundContact);
        } else {
            console.log(
                `kontakt ktory posiada id  ${contactId} nie zostal odnaleziony.`
            );
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function removeContact(contactId) {
    try {
        const filePath = resolve(contactsPath);
        const contents = await fs.readFile(filePath, { encoding: "utf8" });
        const contacts = JSON.parse(contents);

        const contactIndex = contacts.findIndex(
            (contact) => contact.id === contactId
        );

        if (contactIndex !== -1) {
            contacts.splice(contactIndex, 1);

            await fs.writeFile(filePath, JSON.stringify(contacts, null, 2), {
                encoding: "utf8",
            });

            console.log(`kontakt z id ${contactId} zostal usuniety.`);
        } else {
            console.log(
                `kontakt ktory posiada id ${contactId} nie zostal odnaleziony.`
            );
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function addContact(name, email, phone) {
    const newContact = {
        name: name,
        email: email,
        phone: phone,
    };

    try {
        const filePath = resolve(contactsPath);
        const contents = await fs.readFile(filePath, { encoding: "utf8" });

        let dataContact = JSON.parse(contents);
        dataContact.push(newContact);

        await fs.writeFile(filePath, JSON.stringify(dataContact, null, 2), {
            encoding: "utf8",
        });

        console.log("Kontakt został dodany");
    } catch (error) {
        console.error("Błąd podczas dodawania kontaktu:", error.message);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
