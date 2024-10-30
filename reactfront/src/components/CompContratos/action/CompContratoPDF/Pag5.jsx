export const GenerarP5 = (doc) => {
    doc.addPage();
    doc.setFont("Helvetica", "bold");
    const pageWidth = 170; // Ancho disponible en mm para el contenido
    const lineSpacing = 5; // Espaciado entre líneas
    doc.setFontSize(10);

    // Séptima Cláusula
    let posY = 20;
    doc.text("SÉPTIMA: FORMA DE PAGO", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoSeptima = "LAS PARTES acuerdan que la RENTA será pagada a EL SOCIO semanalmente los días lunes de cada semana, mediante efectivo, en el domicilio señalado por el SOCIO.";
    const lineasSeptima = doc.splitTextToSize(textoSeptima, pageWidth);
    doc.text(lineasSeptima, 10, posY + lineSpacing);
    posY += lineasSeptima.length * lineSpacing + 5;

    // Sub-apartados de la séptima cláusula
    posY = agregarDeclaracionConTab("Por la cantidad de: $RENTA Pesos (Cantidad en letra pesos mxn).", posY + 2, doc);
    posY = agregarDeclaracionConTab("Se aplicará una penalidad de pago tardío, esta será por $PENALIDAD pesos (NUMERO EN LETRA pesos mxn) por día.", posY + 2, doc);
    posY = agregarDeclaracionConTab("Y un depósito de $DEPOSITO pesos (Cantidad en letra pesos mxn). Que serán reembolsables.", posY + 2, doc);
    posY = agregarDeclaracionConTab("En dado caso de ser requerida la cancelación del presente contrato antes del tiempo establecido, dicho depósito no podrá ser reembolsable.", posY + 2, doc);

    // Octava Cláusula
    posY += 10;
    doc.setFont("Helvetica", "bold");
    doc.text("OCTAVA: VIGENCIA", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoOctava = "El presente contrato de asociación en participación es de duración determinada. En ese sentido, el período de duración del presente contrato es de $DURACION (duracion en letra) meses contados a partir de la fecha de firma del presente, por lo que vence el día $FECHA DE FIN. Una vez concluida la vigencia del presente instrumento, el Contrato se renovará de manera automática e indefinida, a excepción de que cualquiera de LAS PARTES notifique lo contrario a la otra con 20 (veinte) días de anticipación.";
    const lineasOctava = doc.splitTextToSize(textoOctava, pageWidth);
    doc.text(lineasOctava, 10, posY + lineSpacing);
    posY += lineasOctava.length * lineSpacing + 3;

    const textoOctava2 = "Además, ambas partes acuerdan que EL SOCIO participante tendrá derecho a poseer la unidad un día al mes, con el fin de realizar labores de mantenimiento del vehículo. Este día será acordado previamente entre las partes y se llevará a cabo de manera que no afecte significativamente las operaciones del negocio.";
    const lineasOctava2 = doc.splitTextToSize(textoOctava2, pageWidth);
    doc.text(lineasOctava2, 10, posY + lineSpacing);
    posY += lineasOctava2.length * lineSpacing + 10;

    // Novena Cláusula
    doc.setFont("Helvetica", "bold");
    doc.text("NOVENA: PERSONALIDAD JURÍDICA", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoNovena = "En armonía con lo establecido por los artículos 253 y 256 de la Ley General de Sociedades Mercantiles, LAS PARTES dejan constancia de que el presente contrato de asociación en participación no genera la creación de una persona jurídica y tampoco tiene razón social ni denominación alguna.";
    const lineasNovena = doc.splitTextToSize(textoNovena, pageWidth);
    doc.text(lineasNovena, 10, posY + lineSpacing);
    posY += lineasNovena.length * lineSpacing + 5;

    const textoNovena2 = "En consecuencia, EL SOCIO actuará en nombre propio en las relaciones comerciales que se originen a propósito del presente contrato.";
    const lineasNovena2 = doc.splitTextToSize(textoNovena2, pageWidth);
    doc.text(lineasNovena2, 10, posY + lineSpacing);
    posY += lineasNovena2.length * lineSpacing + 10;

    // Décima Cláusula
    doc.setFont("Helvetica", "bold");
    doc.text("DÉCIMA: CONTROL ADMINISTRATIVO", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoDecima = "El control administrativo será responsabilidad de EL SOCIO, con base en su experiencia tramitará y atenderá las necesidades concretas de EL NEGOCIO, incluyendo impuestos, comisión de UBER, y aquellos que LAS PARTES llegasen a acordar.";
    const lineasDecima = doc.splitTextToSize(textoDecima, pageWidth);
    doc.text(lineasDecima, 10, posY + lineSpacing);
    posY += lineasDecima.length * lineSpacing + 10;

    // Décima Primera Cláusula
    doc.setFont("Helvetica", "bold");
    doc.text("DÉCIMA PRIMERA: RELACIÓN JURÍDICA CON TERCEROS", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoDecimaPrimera = "LAS PARTES declaran expresamente que corresponderá a EL SOCIO cualquier vinculación económica que en el desarrollo del NEGOCIO se acuerde con terceros, para lo cual EL SOCIO actuará en nombre propio al celebrar contratos, al asumir obligaciones o al adquirir créditos.";
    const lineasDecimaPrimera = doc.splitTextToSize(textoDecimaPrimera, pageWidth);
    doc.text(lineasDecimaPrimera, 10, posY + lineSpacing);

    // Número de página en el pie de página
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(10);
    doc.text(`Página ${pageCount - 1}`, 200, 279, { align: "right" });
};

// Función para agregar texto con sangría en todas las líneas
const agregarDeclaracionConTab = (texto, posY, doc) => {
    const pageWidth = 170; // Ancho de página disponible para el contenido
    const indent = 10; // Sangría para cada línea
    const lineSpacing = 5; // Espaciado entre líneas
    const lineas = doc.splitTextToSize(texto, pageWidth);
    lineas.forEach((linea, index) => {
        doc.text(linea, 10 + indent, posY + (index * lineSpacing));
    });
    return posY + (lineas.length * lineSpacing);
};

export default GenerarP5;
