import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Eventos.css";
import Arana from "../../assets/Arana.jpg";

const EventList = () => {

    const [evento, setEvento] = useState([]);
    const [error, setError] = useState([]);
    const navigate = useNavigate();


    //Agregar el componente de carga OJO
 
    useEffect(()=>{

        const obtenerEventos = async () => {
            try {

                // respuesta = ESPERAR FECHT ( URL, METODO GET)
                const resp = await fetch('https://localhost:7267/api/Eventos',{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!resp.ok) throw new Error("Error al obtener los eventos");

                console.log("respuesta de la api", resp);

                const eventos = await resp.json();

                console.log("respuesta de la api eventos", eventos);

                setEvento(eventos);
            } catch (err) {
                console.error("Error en la solicitud:", err);
                alert("No se pudieron cargar los eventos");
                return [];
            }
        };

        obtenerEventos();
    }, []);

    const handleEventoDetails = (Evento)=>{
        
           navigate(`/Evento/${Evento.id}`);
    }

    return (

        <section>
            
            <div> 
                {evento.map((Evento) => (

                    <figure className="boleta" key={Evento.id}  onClick={()=> handleEventoDetails(Evento)}>
                        <div className="contenedor-imagen">
                            <img className="imagen-Evento" src={Arana} alt={Evento.title} />
                        </div>
                        <figcaption>
                            <p className="title_Evento">{Evento.nombre}</p>
                            <p className="description_general"> {Evento.descripcion} </p>
                            <p className="fecha">Fecha del evento:  {Evento.fecha && Evento.fecha.substring(0, 10)}</p>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </section>
    )
}


export default EventList;