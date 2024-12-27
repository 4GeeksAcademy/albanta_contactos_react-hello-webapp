const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            contacts: []
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            loadSomeData: () => {
                /**
                    fetch().then().then(data => setStore({ "foo": data.bar }))
                */
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },
            getContacts: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/apis/fake/contact/agenda/my_agenda');
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ contacts: data });
                    } else {
                        await getActions().crearAlbanta();
                    }
                } catch (error) {
                    console.error('Error fetching contacts:', error);
                    await getActions().crearAlbanta();
                }
            },
            crearAlbanta: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/apis/fake/contact/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            full_name: "Albanta",
                            email: "albanta.leondelgado@gmail.com",
                            agenda_slug: "my_agenda",
                            address: "123 Main St",
                            phone: "555-555-555"
                        })
                    });
                    if (response.ok) {
                        await getActions().getContacts();
                    } else {
                        throw new Error('Failed to create Albanta contact');
                    }
                } catch (error) {
                    console.error('Error creating Albanta contact:', error);
                }
            },
            addContact: async (contact) => {
                try {
                    const response = await fetch('https://playground.4geeks.com/apis/fake/contact/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(contact)
                    });
                    if (response.ok) {
                        getActions().getContacts();
                    } else {
                        throw new Error('Failed to add contact');
                    }
                } catch (error) {
                    console.error('Error adding contact:', error);
                }
            },
            updateContact: async (id, updatedContact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedContact)
                    });
                    if (response.ok) {
                        getActions().getContacts();
                    } else {
                        throw new Error('Failed to update contact');
                    }
                } catch (error) {
                    console.error('Error updating contact:', error);
                }
            },
            deleteContact: async (id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        getActions().getContacts();
                    } else {
                        throw new Error('Failed to delete contact');
                    }
                } catch (error) {
                    console.error('Error deleting contact:', error);
                }
            }
        }
    };
};

export default getState;