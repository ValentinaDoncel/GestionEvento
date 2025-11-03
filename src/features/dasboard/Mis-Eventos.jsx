import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListaEventos } from "./ListaEventos.jsx";

export function MisEventos() {
    const { id } = useParams(); 
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const obtenerEventos = async () => {
        try {
            console.log("aaa")
            const res = await fetch(`https://localhost:7267/api/Eventos/usuario/${id}`);
            console.log("aaa")
            if (res.ok) { 
            const data = await res.json();
            console.log(data)
            setEventos(data);
            } else {
            console.error("Error al obtener eventos del usuario");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
        };
        obtenerEventos();
    }, [id]);

    return (
        <div color="#66023c">
        <ListaEventos eventos={eventos} titulo="Mis eventos" />
        </div>
    );
}