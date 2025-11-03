"use client"

import { useState } from "react"
import "./RegistrarEvento.css"

export default function RegisterForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nombre: "",
    fecha: "",
    ubicacion: "",
    descripcion: "",
    fechaInicio: "",
    fechaCierre: "",
    aforoMaximo: 0,
    imagen: "",
    precio: 0,
    nBoletasVendidas: 0,
    nAsistentes: 0,
    idUsuario: 0,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "imagen" ? files[0] : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedEvents = JSON.parse(localStorage.getItem("eventos")) || [];


    const newEvent = {
      id: Date.now(),
      nombre: formData.nombre,
      fecha: formData.fecha,
      ubicacion: formData.ubicacion,
      descripcion: formData.descripcion,
      fechaInicio: formData.fechaInicio,
      fechaCierre: formData.fechaCierre,
      aforoMaximo: formData.aforoMaximo,
      imagen: formData.imagen?.name || "",
      precio: formData.precio,
    };


    const updateEvents = [...savedEvents, newEvent];
    localStorage.setItem("eventos", JSON.stringify(updateEvents));
    console.log("evento:",newEvent)
    console.log("eventos:",savedEvents)
    onClose();
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>×</button>

        <div className="register-card">
          <h2 className="register-title">Registrar Evento</h2>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre del evento</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Ingrese el nombre "
              />
            </div>

            <div className="form-group">
              <label htmlFor="fecha">Fecha del evento</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="ubicacion">Ubicación del evento</label>
              <textarea
                name="ubicacion"
                id="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">Descripción del evento</label>
              <textarea
                name="descripcion"
                id="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="fechaInicio">Fecha de apertura de la venta de boletas</label>
              <input
                type="date"
                id="fechaInicio"
                name="fechaInicio"
                value={formData.fechaInicio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fechaCierre">Fecha de cierre de la venta de boletas</label>
              <input
                type="date"
                id="fechaCierre"
                name="fechaCierre"
                value={formData.fechaCierre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="aforoMaximo">Aforo Máximo</label>
              <input
                type="number"
                id="aforoMaximo"
                name="aforoMaximo"
                value={formData.aforoMaximo}
                onChange={handleChange}
                required
                placeholder="100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="imagen">Imagen de publicidad</label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="precio">Precio de boleta</label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
                placeholder="Ingrese el precio de cada boleta"
              />
            </div>

            <button type="submit" className="submit-button">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
