import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { backend_url } from "../../constans/constants"
import "./listevent.css"

const ListEvents = ({ date }) => {
    const navigate = useNavigate()

    //Obtiene el usuario actual
    const user = useSelector(state => state.auth.user)

    const [events, setEvents] = useState([])
    const [viewingEvents, setViewingEvents] = useState([])
    const [eventFilter, setEventFilter] = useState('month')

    //Obtiene los eventos del usuario
    useEffect(() => {
        fetch(`${backend_url}/get/events/${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': user.token,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setEvents(data)
            })
    }, [user])

    //Filtra los eventos del usaurio por dia, mes o año
    useEffect(() => {
        const filtrarEventos = (tipoFiltro) => {
            const eventosFiltrados = events.filter((evento) => {
                const fechaEvento = new Date(evento.startDateTime);
                if (tipoFiltro === 'day') {
                    return (
                        fechaEvento.getDate() === date.getDate() &&
                        fechaEvento.getMonth() === date.getMonth() &&
                        fechaEvento.getFullYear() === date.getFullYear()
                    );
                } else if (tipoFiltro === 'month') {
                    return (
                        fechaEvento.getMonth() === date.getMonth() &&
                        fechaEvento.getFullYear() === date.getFullYear()
                    );
                } else if (tipoFiltro === 'year') {
                    return fechaEvento.getFullYear() === date.getFullYear();
                }

                return false;
            });

            // Actualizar el estado con los eventos filtrados
            setViewingEvents(eventosFiltrados)
        };

        events.length > 0 && date ? filtrarEventos(eventFilter) : null
    }, [date, events, eventFilter]);

    const newEvent = () => {
        navigate("/create/event")
    }

    return (
        <div className="event-list">
            {/*Indicador del filtro actual */}
            <strong>Eventos de: {
                eventFilter === 'day' ? date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) :
                    eventFilter === 'month' ? date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) :
                        date.toLocaleDateString('es-ES', { year: 'numeric' })
            }</strong>
            <br />
            {/* Selector para cambiar el filtro */}
            <label htmlFor="eventFilter">Filtrar por:</label>
            <select
                id="eventFilter"
                value={eventFilter}
                onChange={e => setEventFilter(e.target.value)}
            >
                <option value="day">Día</option>
                <option value="month">Mes</option>
                <option value="year">Año</option>
            </select>
            {/* Lista de eventos */}
            {viewingEvents.length > 0 ? (
                <ul>
                    {viewingEvents.map(event => (
                        <li key={event._id}>
                            <div className="event-item">
                                <Link to={`/event/${event._id}`}><h3>{event.title}</h3></Link>
                                <p>{new Date(event.startDateTime).toLocaleString()}</p>
                                {/* Sublista de categorías */}
                                <ul>
                                    {event.categories.map(category => (
                                        <li key={category._id}>
                                            <div className="category-item" style={{backgroundColor:category.color}}>
                                                {category.name}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : null}
            <button className="btn-primary" onClick={newEvent}>Crear evento</button>
        </div>
    )
}

export default ListEvents