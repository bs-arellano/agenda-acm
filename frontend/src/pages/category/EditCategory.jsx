import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { backend_url } from "../../constans/constants";
import { useParams, useNavigate } from "react-router-dom";

const EditCategory = () => {
  const navigate = useNavigate();

  const { categoryId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [userCategories, setUserCategories] = useState([]);
  const [eventData, setEventData] = useState({
    name: "",
    selectedCategoryId: null,
  });

  useEffect(() => {
    fetch(`${backend_url}/get/categories/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: user.token,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserCategories(data));
  }, [user]);

  // Cambio en formulario
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
      setEventData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDelete = async () => {
    try {
      // Eliminar solo si hay una categoría seleccionada
      if (eventData.selectedCategoryId) {
        const response = await fetch(
          `${backend_url}/delete/category/${eventData.selectedCategoryId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              token: user.token,
            },
          }
        );

        if (response.ok) {
          // Filtrar la categoría eliminada de la lista local
          const updatedCategories = userCategories.filter(
            (category) => category._id !== eventData.selectedCategoryId
          );
          setUserCategories(updatedCategories);
          setEventData({
            name: "",
            selectedCategoryId: null,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Actualizar solo si hay una categoría seleccionada
      if (eventData.selectedCategoryId) {
        const response = await fetch(
          `${backend_url}/update/category/${eventData.selectedCategoryId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              token: user.token,
            },
            body: JSON.stringify({
              name: eventData.name,
            }),
          }
        );

        if (response.ok) {
          navigate(`/`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Editar categoría</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Categorías:
          <select
            name="selectedCategoryId"
            onChange={handleChange}
            value={eventData.selectedCategoryId || ""}
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {userCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Confirmar</button>
        <button type="button" onClick={handleDelete}>
          Eliminar
        </button>
      </form>
      <button
        onClick={() => {
          navigate(`/`);
        }}
      >
        Cancelar
      </button>
    </>
  );
};

export default EditCategory;
