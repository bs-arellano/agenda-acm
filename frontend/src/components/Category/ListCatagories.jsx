import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { backend_url } from "../../constans/constants";

const ListCategories = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async (userId) => {
            try {
                const response = await fetch(`${backend_url}/get/categories/${userId}`, {
                    headers: {
                        "token": user.token
                    }
                })
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                const data = await response.json()
                setCategories(data)
            } catch (e) {
                console.log(e);
            }
        }
        if (user) fetchCategories(user.id)
    }, [user])
    const newCategory = () => {
        navigate("/create/category");
    };
    const editCategory = () => {
        navigate(`/edit/categories/${user.id}`);
    };
    return (
        <div>
            <h2>Categorias</h2>
            {categories.length > 0 ? (
                <ul>
                    {categories.map(category => (
                        <li key={category._id}>
                            <div className="category-item" style={{ backgroundColor: category.color }}>{category.name}</div>
                        </li>
                    ))}
                </ul>
            ) : null}
            <button className="btn-primary" onClick={newCategory}>Crear categoria</button>
            <button className="btn-secondary" onClick={editCategory}>Editar categorias</button>
        </div>
    )
}

export default ListCategories