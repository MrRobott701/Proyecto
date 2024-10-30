export const GenerarP9 = (doc) => {
    doc.addPage();
    doc.setFont("Helvetica", "bold");
    const pageWidth = 170; // Ancho disponible en mm para el contenido
    const lineSpacing = 5; // Espaciado entre líneas
    doc.setFontSize(10);

    // Vigésima Tercera Cláusula
    let posY = 20;
    doc.text("VIGÉSIMA TERCERA: GARANTÍA", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoVigesimaTercera = "EL CONDUCTOR, se obliga a firmar como garantía sobre el VEHÍCULO un pagaré por la cantidad de $PAGARE pesos(cantidad en letra pesos mxn). Dicho pagaré le será devuelto una vez que se haya dado por terminado el presente contrato.";
    const lineasVigesimaTercera = doc.splitTextToSize(textoVigesimaTercera, pageWidth);
    doc.text(lineasVigesimaTercera, 10, posY + lineSpacing);
    posY += lineasVigesimaTercera.length * lineSpacing + 10;

    // Vigésima Cuarta Cláusula
    doc.setFont("Helvetica", "bold");
    doc.text("VIGÉSIMA QUINTA. PENA CONVENCIONAL", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoVigesimaCuarta = "Si al momento de finalización del contrato, y no habiendo sido devuelto el VEHÍCULO, EL CONDUCTOR se compromete a pagar por concepto de pena convencional la cantidad de $500.00 (QUINIENTOS pesos 00/100 MXN), por cada uno de los días transcurridos desde la fecha de conclusión del presente contrato hasta la fecha de la devolución del VEHÍCULO.";
    const lineasVigesimaCuarta = doc.splitTextToSize(textoVigesimaCuarta, pageWidth);
    doc.text(lineasVigesimaCuarta, 10, posY + lineSpacing);
    posY += lineasVigesimaCuarta.length * lineSpacing + 10;

    // Vigésima Quinta Cláusula
    doc.setFont("Helvetica", "bold");
    doc.text("VIGÉSIMA QUINTA: GASTOS", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoVigesimaQuinta = "Serán por cuenta de EL SOCIO los gastos que se originen por concepto de:";
    const lineasVigesimaQuinta = doc.splitTextToSize(textoVigesimaQuinta, pageWidth);
    doc.text(lineasVigesimaQuinta, 10, posY + lineSpacing);
    posY += lineasVigesimaQuinta.length * lineSpacing + 5;

    // Sub-apartados de la Vigésima Quinta cláusula (Gastos del SOCIO y del CONDUCTOR)
    posY = agregarDeclaracionConTab("• Mantenimiento Preventivo", posY +2, doc);
    posY = agregarDeclaracionConTab("• Seguro de Auto", posY + 2, doc);

    posY += 5;
    doc.text("Así mismo, los gastos que correrán a cuenta del CONDUCTOR serán los siguientes:", 10, posY);
    posY += 5;
    posY = agregarDeclaracionConTab("• Limpieza del Vehículo", posY + 2, doc);

    posY += 5;
    const textoGastosExcepcion = "Con excepción, de los supuestos establecidos en el presente contrato, LAS PARTES acuerdan que los siguientes gastos, serán considerados como Gasto Operativos del NEGOCIO; por lo que ambas PARTES serán responsables de cubrir éstos de manera conjunta:";
    const lineasGastosExcepcion = doc.splitTextToSize(textoGastosExcepcion, pageWidth);
    doc.text(lineasGastosExcepcion, 10, posY + lineSpacing);
    posY += lineasGastosExcepcion.length * lineSpacing + 5;

    posY = agregarDeclaracionConTab("• Impuestos generados por el NEGOCIO", posY, doc);

    // Vigésima Sexta Cláusula
    posY += 10;
    doc.setFont("Helvetica", "bold");
    doc.text("VIGÉSIMA SEXTA: PERCANCES", 10, posY);
    doc.setFont("Helvetica", "normal");
    posY += 5;
    const textoVigesimaSexta = "EL CONDUCTOR se compromete a comunicar a EL SOCIO, y a la Compañía de Seguros, con la menor tardanza posible, de cualquier accidente, percance, o golpe en el que se vea implicado el VEHÍCULO, esperar al Ajustador de la Compañía de Seguros, y no establecer ningún tipo de acuerdo o conflicto. Así mismo, se compromete a comunicar también cualquier avería o incidencia de cualquier tipo que afecte al correcto funcionamiento del VEHÍCULO.";
    const lineasVigesimaSexta = doc.splitTextToSize(textoVigesimaSexta, pageWidth);
    doc.text(lineasVigesimaSexta, 10, posY + lineSpacing);
    posY += lineasVigesimaSexta.length * lineSpacing + 5;

    const textoVigesimaSexta2 = "En caso que el accidente sea atribuible a EL CONDUCTOR, LAS PARTES acuerdan que EL CONDUCTOR cubrirá el 100% (cien por ciento) del deducible o bien el 100% (cien por ciento) de los gastos de reparación del VEHÍCULO. Y para el caso en que el accidente o percance sea atribuible a un tercero, LAS PARTES establecen que se pagarán dichos gastos evaluando la situación conforme a los porcentajes que acuerden.";
    const lineasVigesimaSexta2 = doc.splitTextToSize(textoVigesimaSexta2, pageWidth);
    doc.text(lineasVigesimaSexta2, 10, posY + lineSpacing);
    posY += lineasVigesimaSexta2.length * lineSpacing + 5;

    const textoVigesimaSexta3 = "De no cumplir con lo establecido en esta Cláusula, EL CONDUCTOR se obliga a cubrir el 100% (cien por ciento) del deducible o en su caso el 100% (cien por ciento) de los gastos de reparación del VEHÍCULO.";
    const lineasVigesimaSexta3 = doc.splitTextToSize(textoVigesimaSexta3, pageWidth);
    doc.text(lineasVigesimaSexta3, 10, posY + lineSpacing);

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

export default GenerarP9;
