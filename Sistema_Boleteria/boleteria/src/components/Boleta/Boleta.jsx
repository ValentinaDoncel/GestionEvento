import { useNavigate } from "react-router-dom";
import Arana from "../../assets/Arana.jpg";
import "./Boleta.css"

const Boleta = ({boleta}) =>{

    const navigate = useNavigate();

     const handleDetalles = (boleta)=>{
        
        navigate(`/Boleta/${boleta.id}`, { state: { boleta } });
    }

    console.log("Boleta en Boleta", boleta)

    return(

        <div key={boleta.id} className="boleta-wrapper">
            <figure className="boleta">
                <div className="contenedor-imagen">
                            <img
                            className="imagen-boleta"
                            src={Arana}
                            alt={boleta.tituloEvento}
                            />
                </div>
                <figcaption>
                            <p className="title_boleta">{boleta.tituloEvento}</p>
                            <p>Valor de la boleta: {boleta.precio}</p>
                            <p>Fecha del Evento: {boleta.fecha?.substring(0, 10)}</p>
                            <p>{boleta.descripcion}</p>
                </figcaption>
                
                <button  className="boton-ver-pdf" onClick={() => handleDetalles(boleta)} >Ver Detalles</button>
            </figure>
        </div>
    )
}

export default Boleta;
