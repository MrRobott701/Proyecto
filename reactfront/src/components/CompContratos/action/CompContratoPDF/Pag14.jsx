import { formatearFecha } from "./Funciones";

export const GenerarP14 = (doc, contrato, propietario, conductor) => {
    doc.addPage();
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);

    // Fecha de firma en la esquina superior derecha
    doc.text(`Ensenada Baja California a ${formatearFecha(contrato.fechaFirma)}.`, 180, 20, { align: "right" });

    // "EL SOCIO" y "EL CONDUCTOR" en el centro de la página, con más espacio vertical
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text("\"EL SOCIO\"", 75, 80, { align: "center" });
    doc.text("\"EL CONDUCTOR\"", 145, 80, { align: "center" });
    doc.setFontSize(12);

    // Líneas para firma y nombres centrados
    doc.setLineWidth(0.5);

    // Ajuste dinámico para "ARRENDADOR" (propietario)
    const propietarioNombre = propietario.nombre.toUpperCase();
    const propietarioNombreWidth = doc.getTextWidth(propietarioNombre);
    const propietarioX = 75 - propietarioNombreWidth / 2;
    doc.line(50, 130, 100, 130); // Línea para "ARRENDADOR"
    doc.text(propietarioNombre, 75, 140, { align: "center" }); // Centrado sobre la línea de firma

    // Ajuste dinámico para "CHOFER" (conductor)
    const conductorNombre = conductor.nombre.toUpperCase();
    const conductorNombreWidth = doc.getTextWidth(conductorNombre);
    const conductorX = 145 - conductorNombreWidth / 2;
    doc.line(120, 130, 170, 130); // Línea para "CHOFER"
    doc.text(conductorNombre, 145, 140, { align: "center" }); // Centrado sobre la línea de firma

    // AVAL en el centro inferior con mayor espacio debajo de las firmas anteriores
    doc.setFontSize(14);
    doc.text("AVAL", 105, 180, { align: "center" });
    doc.setFontSize(12);

    // Línea para firma de AVAL, con ajuste dinámico para el nombre de aval
    const avalNombre = conductor.avalNombre.toUpperCase();
    const avalNombreWidth = doc.getTextWidth(avalNombre);
    const avalX = 105 - avalNombreWidth / 2;
    doc.line(70, 220, 140, 220); // Línea para "AVAL"
    doc.text(avalNombre, 105, 230, { align: "center" }); // Centrado sobre la línea de firma

    // Número de página en el pie de página
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFont("Helvetica", "normal"); // Asegúrate de cambiar a "normal"
    doc.setFontSize(10);
    doc.text(`Página ${pageCount - 1}`, 200, 279, { align: "right" });
};

export default GenerarP14;
