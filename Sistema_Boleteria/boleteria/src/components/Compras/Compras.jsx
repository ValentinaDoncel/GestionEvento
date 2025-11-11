
import { useEffect, useState } from "react";
import Boleta from "../Boleta/Boleta";
import "./Compras.css"


const Compras = () => {

    const [error, setError] = useState(false);
    const [idUsuario, setIdUsuario] = useState(null);
    const [boletasConEvento, setBoletasConEvento] = useState([]);

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (usuario?.id) {
        setIdUsuario(usuario.id);
        } else {
        alert("Usuario no autenticado");
        }
    }, []);

   
    const obtenerBoletas = async (idUsuario) => {
        try {
            const resp = await fetch(`https://localhost:7267/api/Boletas/usuario/${idUsuario}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
            });

            if (!resp.ok) throw new Error("Error al cargar las boletas");

            const boletas = await resp.json();
            return boletas;

        } catch (err) {
            console.error("Error en obtenerBoletas:", err);
            throw err;
        }
    };

    const obtenerEventoPorId = async (idEvento) => {
        try {
            const resp = await fetch(`https://localhost:7267/api/Eventos/${idEvento}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
            });

            if (!resp.ok) throw new Error("Error al cargar el evento");

            const evento = await resp.json();
            return evento;
        } catch (err) {
            console.error(`Error en obtenerEventoPorId (${idEvento}):`, err);
            return { title: "Evento no disponible" };
        }
    };

    const combinarBoletasConEventos = async (idUsuario) => {
        try {
            const boletas = await obtenerBoletas(idUsuario);

            const boletasConTitulo = await Promise.all(
            boletas.map(async (boleta) => {
                const evento = await obtenerEventoPorId(boleta.idEvento);
                console.log(evento.imagen)
                return {
                ...boleta,
                tituloEvento: evento.nombre,
                img: evento.imagen,
                fecha: evento.fecha,
                descripcion: evento.descripcion
                };
            })
            );

            return boletasConTitulo;
        } catch (err) {
            console.error("Error en combinarBoletasConEventos:", err);
        }
    };

    useEffect(() => {
        const cargarDatos = async () => {
            if (!idUsuario) {
            console.warn("idUsuario aún no está disponible");
            return;
            }

            try {
            const resultado = await combinarBoletasConEventos(idUsuario);
            setBoletasConEvento(resultado);
            } catch (err) {
            setError(err.message);
            }
        };

        cargarDatos();
    }, [idUsuario]);

    return(

        <section>
            <div>
                {error ? (
                <h3>Boletas no disponibles</h3>
                ) : boletasConEvento == null ? (
                <h3>No hay boletas</h3>
                ) : (
                boletasConEvento.map((b) => (
                    <Boleta key={b.id} boleta={b} />
                ))
                )}
            </div>
        </section>
    )
}

export default Compras;