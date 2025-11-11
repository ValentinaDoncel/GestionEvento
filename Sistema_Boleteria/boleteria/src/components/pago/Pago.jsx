import { useState, useEffect } from "react";
import "./Pago.css"

const Pago = ({ evento }) => {
  const [cantidad, setCantidad] = useState(1);
  const [tarjeta, setTarjeta] = useState("");
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario?.id) {
      setIdUsuario(usuario.id);
      console.log("ID DEL USUARIO",usuario.id)
    } else {
      alert("Usuario no autenticado");
    }
  }, []);

  const handleMas = () => {
    cantidad === 4
      ? alert("Máximo 4 boletas por persona")
      : setCantidad(cantidad + 1);
  };

  const handleMenos = () => {
    cantidad === 1
      ? console.log("Cantidad mínima alcanzada")
      : setCantidad(cantidad - 1);
  };

  /* const generarPDF = async () =>{

    const resp = await fetch(`chttps://localhost:7267/api/PDF/boleta/pdf/${}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json"
      },
    });

    if (!resp.ok) throw new Error("Error al registrar la boleta");
  } */

  const handlePago = async (e) => {
    
    e.preventDefault();

    if (!/^\d{12,16}$/.test(tarjeta)) {
      alert("Número de tarjeta inválido");
      return;
    }

    if (!idUsuario) {
      alert("Usuario no autenticado");
      return;
    }

    const disponibles = evento.AforoMaximo - evento.nBoletasVendidas;

    if (cantidad > disponibles) {
      alert(`Solo quedan ${disponibles} cupos disponibles para este evento`);
      return;
    }

    const payload = {
      id: 0,
      fechaCompra: new Date().toISOString(),
      precio: evento.precio,
      idEvento: evento.id,
      idUsuario: idUsuario
    };

    try {

      const nuevasVendidas = Number(evento.nBoletasVendidas) + Number(cantidad);

      console.log("entro al try de compra" )
        for (let i = 0; i < cantidad; i++) {

          const resp = await fetch("https://localhost:7267/api/Boletas", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });

          if (!resp.ok) throw new Error("Error al registrar la boleta");
        }

        await fetch(`https://localhost:7267/api/Eventos/${evento.id}/boletas`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(nuevasVendidas)
        });

        alert("PAgo exitoso");
        } catch (err) {
          console.error("Error en el pago:", err.message);
          alert("Hubo un problema al registrar la boleta");
        }
    };

    return (
        <form onSubmit={handlePago} className="formulario-pago">

          <label>Nombre</label>
          <input type="text" onChange={(e) => setTarjeta(e.target.value)}
            maxLength={16} placeholder="Nombre" required />

          <label>Datos de la tarjeta</label>
          <input type="text" value={tarjeta} onChange={(e) => setTarjeta(e.target.value)}
            maxLength={16} placeholder="Número de tarjeta (16 dígitos)" required />

          <label>Fecha de expiracion</label>
          <input type="text" onChange={(e) => setTarjeta(e.target.value)}
            maxLength={16} placeholder="Fecha de Expiracion (4 dígitos)" required />

          <label>Codigo de seguridad</label>
          <input type="text" onChange={(e) => setTarjeta(e.target.value)}
            maxLength={16} placeholder="Codigo (4 dígitos)" required />

          <div className="cantidad-control">
            <label>Cantidad de boletas:</label>
            <div className="cantidad-botones">
              <button type="button" onClick={handleMenos}>−</button>
              <span>{cantidad}</span>
              <button type="button" onClick={handleMas}>+</button>
            </div>
          </div>

          <button type="submit">Confirmar pago</button>
        </form>

    );
};

export default Pago;
