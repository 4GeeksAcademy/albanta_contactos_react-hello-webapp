import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const AddContact = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState({
            "name": "",
            "phone": "",
            "email": "",
            "address": "",
          
    });

    useEffect(() => {
        if (id) {
            const contactToEdit = store.contacts.find(contact => contact.id === parseInt(id));
            console.log(contactToEdit)
            if (contactToEdit) {
                setContact(contactToEdit);
            }
        }
    }, [store.contacts, id]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            // Si hay un id, actualizar el contacto existente
            await actions.updateContact(id, contact);
        } else {
            // Si no hay id, agregar un nuevo contacto
            await actions.addContact(contact);
        }
        navigate("/");
    };

    const handleDelete = async () => {
        if (id) {
            await actions.deleteContact(id);
            navigate("/");
        }
    };

    return (
        <div className="container">
            <h1>{id ? "Edit Contact" : "Add New Contact"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={contact.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">{id ? "Save Changes" : "Save"}</button>
                {id && (
                    <button type="button" className="btn btn-danger ml-2" onClick={handleDelete}>
                        Delete
                    </button>
                )}
            </form>
        </div>
    );
};

export default AddContact;