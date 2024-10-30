export const GenerarP1 = (doc) => {
    doc.addPage();
    doc.setFont("Helvetica", "bold");
    const pageWidth = 170; // Ancho disponible en mm para el contenido
    const indent = 10; // Sangría para todas las líneas de las declaraciones
    const lineSpacing = 5; // Espaciado vertical entre líneas para evitar superposición

    doc.setFontSize(10);
    doc.text("$FECHA DE FIRMA", 200, 20, { align: "right" });

    // Título principal
    doc.setFont("Helvetica", "normal");
    const titulo = "CONTRATO DE PRESTACIÓN DE SERVICIOS (EN LO SUCESIVO “CONTRATO”) QUE CELEBRAN POR VOLUNTAD Y DERECHO PROPIO $ARRENDADOR y/o JAN CARLOS FLORES MUÑOZ (NOMBRE DEL DUEÑO) EN LO SUCESIVO “EL SOCIO”, Y $CHOFER (NOMBRE DEL CONDUCTOR) EN LO SUCESIVO “EL CONDUCTOR”; QUIÉNES EN CONJUNTO Y EN LO SUCESIVO SE DENOMINARÁN COMO “LAS PARTES” Y SE PRONUNCIAN EN CONFORMIDAD CON LAS DECLARACIONES Y CLÁUSULAS DESCRITAS A CONTINUACIÓN:";
    const lineasTitulo = doc.splitTextToSize(titulo, pageWidth);
    doc.text(lineasTitulo, 10, 35);

    // Título "DECLARACIONES"
    doc.setFont("Helvetica", "bold");
    doc.text("D E C L A R A C I O N E S", 85, 65);

    // Subtítulo y contenido de las declaraciones
    doc.setFont("Helvetica", "bold");
    doc.text("I. Declara “EL SOCIO” (ARRENDADOR):", 10, 75);
    doc.setFont("Helvetica", "normal");

    // Función para agregar declaraciones con sangría y espaciado adecuado
    const agregarDeclaracionConTab = (texto, posY) => {
        const lineas = doc.splitTextToSize(texto, pageWidth);
        lineas.forEach((linea, index) => {
            doc.text(linea, 10 + indent, posY + (index * lineSpacing)); // Aplica sangría y espaciado entre líneas
        });
        return posY + (lineas.length * lineSpacing); // Devuelve la nueva posición Y al final de la declaración
    };

    // Declaraciones con ajuste automático de posición vertical
    let posY = 85;
    posY = agregarDeclaracionConTab("1. Ser persona de nacionalidad mexicana o extranjero con permiso de trabajo y residencia, acreditando su identidad con el documento oficial $DOCUMENTO número: $NUMERO DE DOCUMENTO.", posY);
    posY = agregarDeclaracionConTab("2. Ser mayor de edad, querer celebrar este contrato por voluntad propia, cumplir con los elementos necesarios para ello y contar con la capacidad para cumplir las obligaciones aquí descritas.", posY + 10);
    posY = agregarDeclaracionConTab("3. Tener domicilio en: DIRECCION DEL ARRENDADOR.", posY + 10);
    posY = agregarDeclaracionConTab("4. No tener antecedentes penales u otras obligaciones que impidan el cumplimiento de este contrato.", posY + 10);
    posY = agregarDeclaracionConTab("5. Contar con la capacidad legal para ser socio de la empresa descrita en la SEGUNDA CLÁUSULA del contrato y poner a disposición de la misma el vehículo marca $MARCA versión $MODELO color $COLOR modelo $AÑO con placas $PLACAS del estado/ciudad ENSENADA B.C. y con números de serie $NUMERO DE SERIE.", posY + 10);
    agregarDeclaracionConTab("6. Que el vehículo descrito en el apartado anterior se encuentra en condiciones aptas para el uso como transporte de pasajeros; contando con el siguiente equipamiento en perfecto funcionamiento: ventanas, espejos laterales, luces delanteras y traseras en perfecto funcionamiento, transmisión automática/manual, radio AM/FM, antena, tapetes interiores de plástico, llantas con rines y/o tapones, equipo de herramientas, gato, llanta de repuesto y reflejantes para emergencias.", posY + 10);

    // Número de página en el pie de página
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(10);
    doc.text(`Página ${pageCount - 1}`, 200, 279, { align: "right" });
};

export default GenerarP1;
