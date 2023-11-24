import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { backend_url } from "../../constans/constants";

const Event = () => {
    const navigate = useNavigate()
    const { eventId } = useParams();
    const user = useSelector(state => state.auth.user);
    const [event, setEvent] = useState();
    const [notes, setNotes] = useState([])

    //Informacion del evento
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`${backend_url}/get/event/${eventId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "token": user.token
                    }
                });

                if (response.ok) {
                    const eventData = await response.json();
                    setEvent(eventData);
                }
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        fetchEvent();
    }, [eventId, user]);

    //Notas del evento
    useEffect(() => {
        const fetchNotes = async (id) => {
            try {
                const response = fetch(`${backend_url}/get/notes/${id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "token": user.token
                    }
                })
                if (response.ok) {
                    const notesData = await response.json()
                    console.log(notesData);
                    setNotes(notesData)
                }
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        }
        event ? fetchNotes(event._id) : null
    }, [event, user])

    const deleteEvent = async () => {
        try{
            const response = await fetch(`${backend_url}/delete/event/${eventId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "token": user.token
                }
            })
            if (response.ok){
                navigate("/")
            } else{
                throw new Error(response.statusText)
            }
        }catch (e) {
            console.log(e);
        }
    }

    return event ? (
        <div className="card">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <span className="field-title">Fecha</span>
            <p>Inicio: {new Date(event.startDateTime).toLocaleString()}</p>
            <p>Fin: {new Date(event.endDateTime).toLocaleString()}</p>

            {/* Categorias */}
            {event.categories.length > 0 ? (
                <section>
                    <span className="field-title">Categorias</span>
                    <ul>
                        {event.categories.map(category => (
                            <li key={category._id}>
                                <div className="category-item">
                                    {category.name}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}

            {/* Notas */}
            {notes.length > 0 ? (
                <section>
                    <span>Notas</span>
                    <ul>
                        {event.categories.map(category => (
                            <li key={category._id}>
                                <div className="category-item">
                                    {category.name}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}
            <button className="btn-primary">Agregar nota</button>
            <button className="btn-secondary" onClick={() => {
                navigate(`/edit/event/${event._id}`)
            }}>Editar</button>
            <button className="btn-secondary" onClick={deleteEvent}>Borrar</button>
        </div>
    ) : (
        <p>Cargando evento...</p>
    )
};

export default Event;