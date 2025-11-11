import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pago from "../pago/Pago";
import Arana from "../../assets/Arana.jpg";
import "./DetailsEvent.css";

const DetailsEvent = () => {

    const {id} = useParams();

    const [Evento, setEvento] = useState({});
    const [error, setError] = useState(false);
    const [mostrarComponent, setMostrarComponent] = useState (false);
    const [ocultarCompra, setOcultarCompra] = useState(false);

    const handleComprar = ()=>{
        setMostrarComponent(true);
        setOcultarCompra(true)
    }

    useEffect(()=>{

        const fetchEvento = async () =>{

            try {
                const resp = await fetch(`https://localhost:7267/api/Eventos/${id}`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }) 
               console.log(resp)
                if(!resp.ok) throw new Error("Error al cargar los productos");
                const data = await resp.json();
                 console.log("respuesta", data)
                setEvento(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchEvento();
    }, [id]);

    const handlePago = ()=>{
        setMostrarComponent(false); 
        setOcultarCompra(false);
    }

    const cupos = Evento.aforoMaximo- Evento.nBoletasVendidas;

    return(
        <div className="evento-container">

            {error? <h3>"Evento no Disponible"</h3> :  
            
                (<div> 
                    <h3>{ Evento.nombre} </h3>
                    <img className="imagen-Evento" src={Arana} alt={Evento.title} />
                    <div className="evento-info">
                        <p>Valor de la boleta: {Evento.precio}</p>
                        <p>Fecha del evento:  {Evento.fecha && Evento.fecha.substring(0, 10)}</p>
                        <p>Hora del Evento { Evento.fecha?.substring(11, 16)}</p> 
                        <p>Fecha de cierre de inscripciones:  {Evento.fechaCierre && Evento.fechaCierre.substring(0, 10)}</p>
                        <p>{Evento.descripcion}</p>
                        <p>Cupos disponibles: {cupos}</p>
                    </div>

                    <button hidden={error||ocultarCompra} onClick={handleComprar} >Comprar</button>
                    
                    {mostrarComponent && (

                        <div className="modal-overlay">
                            <div className="modal-content">
                            <button className="modal-close" onClick={handlePago}>✕</button>
                            <Pago evento={Evento} />
                            </div>
                        </div>
                    )}
                </div>  
                )    
            }
        </div>
    )
}


export default DetailsEvent;