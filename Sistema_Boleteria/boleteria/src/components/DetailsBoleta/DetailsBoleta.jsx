import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode';
import { useState, useEffect } from 'react';
import Arana from "../../assets/Arana.jpg";
import "./DetailsBoleta.css"

const DetailsBoleta = () => {

  const location = useLocation();
  const { boleta } = location.state || {};
  const [qrUrl, setQrUrl] = useState('');
  const [NameUsuario, setUsuario] = useState(null);

  console.log(boleta)

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario?.id) {
      setUsuario(usuario.nombre);
      console.log("Usuario actual",usuario.nombre)
    } else {
      alert("Usuario no autenticado");
    }
  }, []);

  useEffect(() => {
    
    if (boleta) {

      const qrData = JSON.stringify({
        id: boleta.id,
        titulo: boleta.tituloEvento,
        precio: boleta.precio,
        fecha: boleta.fecha,
        usuario: NameUsuario
      });

      QRCode.toDataURL(qrData)
        .then(url => setQrUrl(url))
        .catch(err => console.error('Error generando QR:', err));
    }
  }, [boleta]);

  console.log("Aaaaaaaaaaaaa",qrUrl);


  return (
    <div className="detalle-boleta">
      <div className="contenido-boleta">
        <img
          className="imagen-boleta"
          src={Arana}
          alt={boleta.title || boleta.tituloEvento}
        />

        <h2 className="titulo-evento">{boleta.tituloEvento}</h2>
        <p><strong>Valor de la boleta:</strong> {boleta.precio}</p>
        <p><strong>Fecha de compra:</strong> {boleta.fechaCompra?.substring(0, 10)}</p>
        <p><strong>Hora de compra:</strong> {boleta.fechaCompra?.substring(11, 16)}</p>
        <p><strong>Fecha del Evento:</strong> {boleta.fecha?.substring(0, 10)}</p>
        <p><strong>Hora del Evento:</strong> {boleta.fecha?.substring(11, 16)}</p>
        <p className="descripcion-boleta">{boleta.descripcion}</p>
      </div>

      {qrUrl && (
        <div className="qr-section">
          <img className="qr-imagen" src={qrUrl} alt="QR de la boleta" />
        </div>
      )}
    </div>

  );
};


export default DetailsBoleta;