import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const ContactCard = ({ contact }) => {
    const { actions } = useContext(Context);

    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{contact.full_name}</h5>
                    <p className="card-text"><strong>Address:</strong> {contact.address}</p>
                    <p className="card-text"><strong>Phone:</strong> {contact.phone}</p>
                    <p className="card-text"><strong>Email:</strong> {contact.email}</p>
                    <div className="d-flex justify-content-between">
                        <Link to={`/edit-contact/${contact.id}`} className="btn btn-warning">Edit</Link>
                        <button className="btn btn-danger" onClick={() => actions.deleteContact(contact.id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;