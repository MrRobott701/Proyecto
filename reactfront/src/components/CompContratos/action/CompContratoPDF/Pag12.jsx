export const GenerarP12 = (doc,propietario,conductor) => {
    doc.addPage();
    doc.setFont("Helvetica", "bold");
    const pageWidth = 170; // Ancho disponible en mm para el contenido
    const lineSpacing = 5; // Espaciado entre líneas
    doc.setFontSize(10);

    // Trigésima Cuarta Cláusula
    let posY = 20;
    doc.text("TRIGÉSIMA CUARTA: DOMICILIOS", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoTrigesimaCuarta = "LAS PARTES señalan como domicilio para todos los efectos de este contrato, los siguientes:";
    const lineasTrigesimaCuarta = doc.splitTextToSize(textoTrigesimaCuarta, pageWidth);
    doc.text(lineasTrigesimaCuarta, 10, posY + lineSpacing);
    posY += lineasTrigesimaCuarta.length * lineSpacing + 5;

    posY = agregarDeclaracionConTab(`• EL SOCIO en: ${propietario.direccion.toUpperCase()}.`, posY + 5, doc);
    posY = agregarDeclaracionConTab(`• EL CONDUCTOR en: ${conductor.direccion.toUpperCase()}.`, posY + 5, doc);

    posY += 10;
    const textoCambioDomicilio = "LAS PARTES deberán informar del cambio en su domicilio, con cuando menos 10 (diez) días hábiles de anticipación. En caso de no hacerlo, todos los avisos, notificaciones y demás diligencias judiciales o extrajudiciales que se hagan en el domicilio indicado por las mismas, en esta cláusula, surtirán plenamente sus efectos.";
    const lineasCambioDomicilio = doc.splitTextToSize(textoCambioDomicilio, pageWidth);
    doc.text(lineasCambioDomicilio, 10, posY + lineSpacing);
    posY += lineasCambioDomicilio.length * lineSpacing + 10;

    // Trigésima Quinta Cláusula
    doc.setFont("Helvetica", "bold");
    doc.text("TRIGÉSIMA QUINTA: ENCABEZADOS", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoTrigesimaQuinta = "Los encabezados que hacen referencia al contenido del tipo de relaciones particulares en este contrato, son insertados únicamente para la conveniencia de LAS PARTES y de ninguna manera podrán considerarse como parte de este contrato o como limitación al alcance de cualesquiera de los términos o estipulaciones del mismo.";
    const lineasTrigesimaQuinta = doc.splitTextToSize(textoTrigesimaQuinta, pageWidth);
    doc.text(lineasTrigesimaQuinta, 10, posY + lineSpacing);
    posY += lineasTrigesimaQuinta.length * lineSpacing + 10;

    // Trigésima Sexta Cláusula
    doc.setFont("Helvetica", "bold");
    doc.text("TRIGÉSIMA SEXTA: CESIÓN DEL CONTRATO", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoTrigesimaSexta = "LAS PARTES no pueden ceder, transferir ni delegar el presente contrato o alguna de sus obligaciones, ni subrogar a terceros en cualquier forma válida en derecho, ni gravar o hipotecar alguno de los derechos contemplados en el contrato, sin la previa conformidad escrita de la otra parte.";
    const lineasTrigesimaSexta = doc.splitTextToSize(textoTrigesimaSexta, pageWidth);
    doc.text(lineasTrigesimaSexta, 10, posY + lineSpacing);
    posY += lineasTrigesimaSexta.length * lineSpacing + 10;

    // Trigésima Séptima Cláusula
    doc.setFont("Helvetica", "bold");
    doc.text("TRIGÉSIMA SÉPTIMA: MODIFICACIONES", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoTrigesimaSeptima = "Este contrato no podrá ser modificado o alterado de ninguna manera, excepto mediante la celebración de un instrumento por escrito suscrito por LAS PARTES. Una vez suscritas dichas modificaciones se convertirán en un parte integrante del presente contrato, sujeto a todos los términos y condiciones contenidos en el mismo y tendrán plena fuerza y causarán todos sus efectos legales.";
    const lineasTrigesimaSeptima = doc.splitTextToSize(textoTrigesimaSeptima, pageWidth);
    doc.text(lineasTrigesimaSeptima, 10, posY + lineSpacing);
    posY += lineasTrigesimaSeptima.length * lineSpacing + 10;

    // Trigésima Octava Cláusula
    doc.setFont("Helvetica", "bold");
    doc.text("TRIGÉSIMA OCTAVA: CONSENTIMIENTO", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoTrigesimaOctava = "Queda pactado por LAS PARTES que el presente contrato es celebrado sin violencia, dolo, error, engaño o mala fe, por lo que no existe algún vicio del consentimiento que limite o pueda limitar los efectos jurídicos del presente contrato.";
    const lineasTrigesimaOctava = doc.splitTextToSize(textoTrigesimaOctava, pageWidth);
    doc.text(lineasTrigesimaOctava, 10, posY + lineSpacing);
    posY += lineasTrigesimaOctava.length * lineSpacing + 10;

    // Trigésima Novena Cláusula
    doc.setFont("Helvetica", "bold");
    doc.text("TRIGÉSIMA NOVENA: ACUERDO ÚNICO", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoTrigesimaNovena = "Las convenciones y cláusulas contenidas en el presente contrato dejan sin efecto cualquier acuerdo verbal o escrito convenido con anterioridad. Por lo que el presente contrato refleja las condiciones y términos en que LAS PARTES desean obligarse.";
    const lineasTrigesimaNovena = doc.splitTextToSize(textoTrigesimaNovena, pageWidth);
    doc.text(lineasTrigesimaNovena, 10, posY + lineSpacing);

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

export default GenerarP12;
