import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { backend_url } from '../../constans/constants';

const CreateNote = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const user = useSelector((state) => state.auth.user);

    const [noteData, setNoteData] = useState({
        title: '',
        body: '',
        eventId: eventId, // El ID del evento al que se asociará la nota
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNoteData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${backend_url}/create/note`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': user.token,
                },
                body: JSON.stringify(noteData),
            });

            if (response.ok) {
                // La nota se creó exitosamente, puedes redirigir a donde sea necesario
                navigate(`/event/${eventId}`);
            } else {
                // Manejar errores de creación de la nota
                console.error('Error creating note');
            }
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    return (
        <>
            <h2>Crear Nota</h2>
            <form onSubmit={handleSubmit}>
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

                <button type="submit">Crear Nota</button>
            </form>
        </>
    );
};

export default CreateNote;