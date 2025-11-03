import React from "react";
import { useNavigate } from "react-router-dom";
import "./ListaEventos.css";

export function ListaEventos({ eventos, titulo }) {
    const navigate = useNavigate();

    const handleClick = (evento) => {
        navigate('/evento/${evento.id}', { state: { evento } });
    };

    return (
        <div className="lista-eventos-container">
        {titulo && <h2 className="lista-eventos-titulo">{titulo}</h2>}

        {eventos && eventos.length > 0 ? (
            <div className="grid-eventos">
            {eventos.map((evento) => (
                <div
                key={evento.id}
                className="eventon-card"
                onClick={() => handleClick(evento)}
                >
                <img
                    src={evento.imagen ? `https://localhost:7267${evento.imagen}` : "/placeholder.jpg"}
                    alt={evento.nombre}
                    className="evento-imagen"
                />
                <div className="evento-info">
                    <h3 className="evento-nombre">{evento.nombre}</h3>
                    <p className="evento-fecha">
                    📅 {new Date(evento.fecha).toLocaleDateString()}
                    </p>
                    <p className="evento-ubicacion">📍 {evento.ubicacion}</p>
                    <p className="evento-precio">💲 {evento.precio}</p>
                </div>
                </div>
            ))}
            </div>
        ) : (
            <p className="sin-eventos">No hay eventos para mostrar.</p>
        )}
        </div>
    );
}