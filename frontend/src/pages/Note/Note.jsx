import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { backend_url } from "../../constans/constants";

const Note = () => {
    const { noteId } = useParams();
    //Nota local
    const [note, setNote] = useState(null);
    //Nota remota
    const [noteData, setNoteData] = useState({
        title: "",
        body: "",
    });

    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(`${backend_url}/get/note/${noteId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "token": user.token
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setNote({
                        ...data,
                        //eventId: data.event,
                    });
                    setNoteData({
                        title: data.title,
                        body: data.body
                    });
                } else if (response.status === 404) {
                    console.error("Nota no encontrada");
                } else {
                    console.error("Error al obtener la nota");
                }
            } catch (error) {
                console.error("Error al obtener la nota:", error);
            }
        };
        fetchNote();
    }, [noteId, user.token]);

    const handleChange = (e) => {
        setNoteData(prevNoteData => ({
            ...prevNoteData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backend_url}/update/note/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': user.token,
                },
                body: JSON.stringify(noteData),
            });

            if (response.ok) {
                setNote({
                    ...note,
                    title: noteData.title,
                    body: noteData.body
                });
            } else {
                console.error("Error al actualizar la nota");
            }
        } catch (error) {
            console.error("Error al actualizar la nota:", error);
        }
    };
    return note ? (
        <>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <form onSubmit={handleSubmit} className="data-form">
                <label>
                    Título:
                    <input
                        type="text"
                        name="title"
                        value={noteData.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Contenido:
                    <textarea
                        name="body"
                        value={noteData.body}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <button type="submit" className="btn-primary">Guardar cambios</button>
                <button  className="btn-secondary" onClick={(e)=>{
                    e.preventDefault()
                    navigate(`/event/${note.event}`)
                }}>Volver</button>

            </form>
        </>
    ) : (
        <p>Cargando nota...</p>
    );
};

export default Note;