import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { backend_url } from '../../constans/constants';
import { useParams, useNavigate } from 'react-router-dom';

const EditEvent = () => {
    const navigate = useNavigate()

    const { eventId } = useParams()
    const user = useSelector(state => state.auth.user)
    const [userCategories, setUserCategories] = useState([])

    //Informacion editable
    const [eventData, setEventData] = useState({
        startDateTime: '',
        endDateTime: '',
        title: '',
        description: '',
        categories: [],
    });

    //Informacion del evento
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
                    const data = await response.json();
                    const formatedData = {
                        ...data,
                        startDateTime: new Date(data.startDateTime).toISOString().slice(0, -1),
                        endDateTime: new Date(data.endDateTime).toISOString().slice(0, -1),
                    }
                    setEventData(formatedData)
                }
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        fetchEvent();
    }, [eventId, user]);

    //Categorias del usuario
    useEffect(() => {
        fetch(`${backend_url}/get/categories/${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': user.token
            },
        })
            .then((response) => response.json())
            .then((data) => setUserCategories(data))
    }, [user])

    //Cambio en formulario
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        // Manejar el cambio para select múltiple
        if (type === "select-multiple") {
            const selectedValues = Array.from(e.target.options)
                .filter((option) => option.selected)
                .map((option) => option.value);

            setEventData((prevData) => ({
                ...prevData,
                [name]: selectedValues,
            }));
        } else {
            // Manejar otros tipos de campos (textos, fechas, etc.)
            setEventData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${backend_url}/update/event/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': user.token
                },
                body: JSON.stringify(eventData),
            });
            if (response.ok) {
                navigate(`/event/${eventId}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h2>Editar evento</h2>
            <form className='data-form' onSubmit={handleSubmit}>
                <label>
                    Fecha y hora de inicio:
                    <input
                        type="datetime-local"
                        name="startDateTime"
                        value={eventData.startDateTime}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Fecha y hora de fin:
                    <input
                        type="datetime-local"
                        name="endDateTime"
                        value={eventData.endDateTime}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Título:
                    <input
                        type="text"
                        name="title"
                        value={eventData.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Descripción:
                    <textarea
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Categorías:
                    <select
                        name="categories"
                        onChange={handleChange}
                        multiple
                    >
                        {userCategories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <button className='btn-primary' type="submit">Confirmar</button>
                <button className='btn-secondary' onClick={() => {
                    navigate(`/event/${eventId}`)
                }}>Cancelar</button>
            </form>

        </>
    )
}

export default EditEvent