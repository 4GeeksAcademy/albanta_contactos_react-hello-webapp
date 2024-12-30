const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: []
        },
        actions: {
            getContacts: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/albanta/contacts');
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ contacts: data.contacts });
                    } else {
                         getActions().crearAlbanta();
                    }
                } catch (error) {
                    console.error('Error fetching contacts:', error);
                     getActions().crearAlbanta();
                }
            },
            crearAlbanta: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/albanta', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        
                    });
                    if (response.ok) {
                         getActions().getContacts();
                    } else {
                        throw new Error('Failed to create Albanta contact');
                    }
                } catch (error) {
                    console.error('Error creating Albanta contact:', error);
                }
            },
            addContact: async (contact) => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/albanta/contacts', {
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
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/albanta/contacts/${id}`, {
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
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/albanta/contacts/${id}`, {
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