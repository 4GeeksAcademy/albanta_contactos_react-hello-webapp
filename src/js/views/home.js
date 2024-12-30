import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import ContactCard from "../component/contactCard";
import { Link } from "react-router-dom";

const Home = () => {
    const { store, actions } = useContext(Context);
    console.log(store.contacts);
    useEffect(() => {
        actions.getContacts(); 
    }, []);

    return (
        <div className="container text-center mt-5">
            <h1>Contact List</h1>
            <Link to="/add-contact" className="btn btn-primary mb-4">Add New Contact</Link>
            <div className="row">
                {store.contacts.map((contact, index) => (
                    <ContactCard key={index} contact={contact} />
                ))}
            </div>
        </div>
    );
};

export default Home;