/* 
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const fs = require('fs');

async function generarPDFBoleta(boleta) {

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(`boleta_${boleta.id}.pdf`);
    doc.pipe(stream);

    doc.fontSize(18).text('Boleta de Evento', { align: 'center' });
    doc.moveDown();

    
    if (boleta.img && boleta.img.startsWith('http')) {
        try {
        const imageBuffer = await fetch(boleta.img).then(res => res.arrayBuffer());
        doc.image(Buffer.from(imageBuffer), {
            fit: [250, 150],
            align: 'center',
            valign: 'center'
        });
        doc.moveDown();
        } catch (error) {
        doc.fontSize(10).fillColor('red').text('No se pudo cargar la imagen.');
        }
    }

    doc.fontSize(12).fillColor('black');
    doc.text(`Título: ${boleta.title || boleta.tituloEvento}`);
    doc.text(`Precio: ${boleta.precio}`);
    doc.text(`Fecha: ${boleta.fecha?.substring(0, 10)}`);
    doc.text(`Descripción: ${boleta.descripcion}`);
    doc.moveDown();

    
    const contenidoQR = `Evento: ${boleta.title || boleta.tituloEvento}\nFecha: ${boleta.fecha?.substring(0, 10)}\nPrecio: ${boleta.precio}`;
    const qrDataURL = await QRCode.toDataURL(contenidoQR);
    const base64Data = qrDataURL.replace(/^data:image\/png;base64,/, '');
    const qrBuffer = Buffer.from(base64Data, 'base64');

    doc.image(qrBuffer, {
        fit: [120, 120],
        align: 'center',
        valign: 'center'
    });

    doc.end();

    stream.on('finish', () => {
        console.log(`PDF generado: boleta_${boleta.id}.pdf`);
    });
}

export default generarPDFBoleta(); */