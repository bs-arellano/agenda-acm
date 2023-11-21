import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { backend_url } from "../../constans/constants"

const Profile = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const [profile, setProfile] = useState()
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        if (!isAuthenticated) {
            return navigate("/signin")
        }
        else {
            fetch(`${backend_url}/get/user/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': user.token,
                },
            })
                .then((response) => {
                    if (response.status == 200) {
                        response.json().then(data => setProfile(data))
                    }
                })
        }
    }, [navigate, isAuthenticated, user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            "name": name,
            "email": email,
            "password": password
        }
        try {
            const response = await fetch(`${backend_url}/update/user/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': user.token
                },
                body: JSON.stringify(data)
            })
            if (response.status == 200) {
                window.location.reload()
            }
            else { throw new Error('Error al iniciar sesion') }
        } catch (e) {
            navigate("/profile")
        }
    }

    return profile ? (
        <>
            <span>Nombre</span>: {profile.name}
            <br />
            <span>Correo</span>: {profile.email}
            <br />
            <button onClick={()=>setEditing(true)}>Editar</button>
            {editing?(
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input type="text" value={name} onChange={handleNameChange} />
                    </label>
                    <br />
                    <label>
                        Correo electrónico:
                        <input type="email" value={email} onChange={handleEmailChange} />
                    </label>
                    <br />
                    <label>
                        Contraseña:
                        <input type="password" value={password} onChange={handlePasswordChange} />
                    </label>
                    <br />
                    <button type="submit">Actualizar</button>
                </form>
            ):null}
        </>
    ) : null
}

export default Profile