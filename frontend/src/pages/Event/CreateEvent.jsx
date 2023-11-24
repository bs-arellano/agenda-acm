import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import { backend_url } from '../../constans/constants';

const CreateEvent = () => {
    const navigate = useNavigate()

    const user = useSelector(state => state.auth.user)

    const [eventData, setEventData] = useState({
        startDateTime: '',
        endDateTime: '',
        title: '',
        description: '',
        categories: [],
    });
    const [userCategories, setUserCategories] = useState([])

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
            const response = await fetch(`${backend_url}/create/event`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': user.token
                },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                navigate("/")
            } else {
                navigate("/")
            }
        } catch (error) {
            navigate("/")
        }
    };

    return (
        <>
            <h2>Crear Evento</h2>
            <form onSubmit={handleSubmit} className='data-form'>
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

                <button className='btn-primary' type="submit">Crear Evento</button>
            </form>
        </>
    );
};

export default CreateEvent;