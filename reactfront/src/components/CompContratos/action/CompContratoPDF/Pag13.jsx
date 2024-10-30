export const GenerarP13 = (doc) => {
    doc.addPage();
    doc.setFont("Helvetica", "bold");
    const pageWidth = 170; // Ancho disponible en mm para el contenido
    const lineSpacing = 5; // Espaciado entre líneas
    doc.setFontSize(10);

    // Cuadragésima Cláusula
    let posY = 20;
    doc.text("CUADRAGÉSIMA: INDEPENDENCIA", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoCuadragesima = "Si cualquier cláusula, término, convenio, condición, o disposición del presente contrato o la aplicación del mismo, fuese considerada como inválida o inejecutable, el resto de este contrato o su aplicación, no se verá afectado por lo anterior y cada término, convenio, condición o disposición del presente contrato será válida y será ejecutada hasta la extensión más completa permitida por la ley.";
    const lineasCuadragesima = doc.splitTextToSize(textoCuadragesima, pageWidth);
    doc.text(lineasCuadragesima, 10, posY + lineSpacing);
    posY += lineasCuadragesima.length * lineSpacing + 10;

    // Cuadragésima Primera Cláusula
    doc.setFont("Helvetica", "bold");
    doc.text("CUADRAGÉSIMA PRIMERA: NO RENUNCIA", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoCuadragesimaPrimera = "La inactividad, falta de queja o acción por alguna de LAS PARTES en relación con el incumplimiento o cualquier otro procedimiento derivado del presente contrato, no se estimará como una renuncia a sus derechos por permanecer inactiva o no efectúe los procedimientos establecidos en el contrato.";
    const lineasCuadragesimaPrimera = doc.splitTextToSize(textoCuadragesimaPrimera, pageWidth);
    doc.text(lineasCuadragesimaPrimera, 10, posY + lineSpacing);
    posY += lineasCuadragesimaPrimera.length * lineSpacing + 10;

    // Cuadragésima Segunda Cláusula
    doc.setFont("Helvetica", "bold");
    doc.text("CUADRAGÉSIMA SEGUNDA: LEGISLACIÓN APLICABLE", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoCuadragesimaSegunda = "En todo lo no previsto por LAS PARTES en el presente contrato, ambas se someten a lo establecido por las normas de la Ley General de Sociedades Mercantiles, el Código Civil y demás leyes correspondientes que resulten aplicables.";
    const lineasCuadragesimaSegunda = doc.splitTextToSize(textoCuadragesimaSegunda, pageWidth);
    doc.text(lineasCuadragesimaSegunda, 10, posY + lineSpacing);
    posY += lineasCuadragesimaSegunda.length * lineSpacing + 10;

    // Cuadragésima Tercera Cláusula
    doc.setFont("Helvetica", "bold");
    doc.text("CUADRAGÉSIMA TERCERA: COMPETENCIA", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoCuadragesimaTercera = "Para todo lo relacionado con la interpretación y cumplimiento del presente contrato, LAS PARTES se someten expresamente a las Leyes y Tribunales del Estado de México, renunciando a cualquier otro fuero que por razón de su domicilio presente o futuro les pudiera corresponder.";
    const lineasCuadragesimaTercera = doc.splitTextToSize(textoCuadragesimaTercera, pageWidth);
    doc.text(lineasCuadragesimaTercera, 10, posY + lineSpacing);
    posY += lineasCuadragesimaTercera.length * lineSpacing + 10;

    // Texto Final
    const textoFinal = "LAS PARTES estando conformes con el contenido y clausulado del presente contrato lo firman en Ensenada Baja California, el $FECHA DE FIRMA, al margen en cada una de sus hojas y al final en esta última para todos los efectos legales a que haya lugar.";
    const lineasTextoFinal = doc.splitTextToSize(textoFinal, pageWidth);
    doc.text(lineasTextoFinal, 10, posY + lineSpacing);

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

export default GenerarP13;
