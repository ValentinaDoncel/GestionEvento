import React from "react"
import "./eventCard.css"

export default function EventCard({ event, onClose }) {
  if (!event) return null

  return (
    <div className="eventCardOverlay" onClick={onClose}>
      <div
        className="eventCardContainer"
        onClick={(e) => e.stopPropagation()} // evita cerrar al hacer click dentro
      >
        <button className="eventCloseButton" onClick={onClose}>
          ✕
        </button>

        <div className="eventCardHeader">
          <h2 className="eventTitle">{event.nombre}</h2>
          <p>
            Fecha del evento:
          </p>
          <p className="eventDate">
            {new Date(event.fecha).toLocaleDateString("es-ES")}
          </p>
        </div>

        <div className="eventCardBody">
          <p>
            <b>
            Descripcion:
            </b>
          </p>
          <p className="eventDescription">{event.descripcion}</p>

          <div className="eventInfoGroup">
            <p>
              <strong>Ubicación:</strong> {event.ubicacion}
            </p>
            <p>
              <strong>Inicio:</strong>{" "}
              {new Date(event.fechaInicio).toLocaleDateString("es-ES")}
            </p>
            <p>
              <strong>Cierre:</strong>{" "}
              {new Date(event.fechaCierre).toLocaleDateString("es-ES")}
            </p>
            <p>
              <strong>Aforo Máximo:</strong> {event.aforoMaximo}
            </p>
            <p>
              <strong>Precio:</strong> ${event.precio}
            </p>
          </div>

          {event.imagen && (
            <div className="eventImageContainer">
              <img
                src={event.imagen}
                alt="imagen del evento"
                className="eventImage"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
