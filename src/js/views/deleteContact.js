import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const DeleteContact = () => {
    const { actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        await actions.deleteContact(id);
        navigate("/");
    };

    return (
        <div className="container">
            <h1>Delete Contact</h1>
            <p>Are you sure you want to delete this contact?</p>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            <button className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
        </div>
    );
};

export default DeleteContact;