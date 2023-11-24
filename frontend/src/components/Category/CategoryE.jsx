import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { backend_url } from "../../constans/constants";
import "./CategoryB.css";

const CategoryE = () => {
  const navigate = useNavigate();

  //Obtiene el usuario actual
  const user = useSelector((state) => state.auth.user);

  const [events, setEvents] = useState([]);
  const [viewingEvents, setViewingEvents] = useState([]);
  const [eventFilter, setEventFilter] = useState("month");

  //Obtiene los eventos del usuario
  useEffect(() => {
    fetch(`${backend_url}/get/category/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: user.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });
  }, [user]);

  const editCategory = () => {
    navigate(`/edit/category/${user.id}`);
  };

  return (
    <div>
      <button onClick={editCategory}>Editar categoria</button>
    </div>
  );
};

export default CategoryE;
