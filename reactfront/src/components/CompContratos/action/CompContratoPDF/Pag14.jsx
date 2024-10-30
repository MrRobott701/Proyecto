export const GenerarP14 = (doc) => {
    doc.addPage();
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);

    // Fecha de firma en la esquina superior derecha
    doc.text("FECHA DE FIRMA.", 180, 20, { align: "right" });

    // "EL SOCIO" y "EL CONDUCTOR" en el centro de la página, más espacio vertical
    doc.setFontSize(14);
    doc.text("\"EL SOCIO\"", 80, 80, { align: "center" });
    doc.text("\"EL CONDUCTOR\"", 140, 80, { align: "center" });

    // Líneas para firma y títulos de ARRRENDADOR y CHOFER, con mayor separación
    doc.setLineWidth(.5);
    doc.line(50, 130, 100, 130); // Línea para "ARRENDADOR"
    doc.text("ARRENDADOR", 75, 140, { align: "center" });

    doc.setLineWidth(.5);
    doc.line(120, 130, 170, 130); // Línea para "CHOFER"
    doc.text("CHOFER", 145, 140, { align: "center" });

    // AVAL en el centro inferior con mayor espacio debajo de las firmas anteriores
    doc.text("AVAL", 105, 180, { align: "center" });

    // Línea para firma de AVAL, con espacio adicional hacia abajo
    doc.setLineWidth(.5);
    doc.line(70, 220, 140, 220);
    doc.text("AVAL", 105, 230, { align: "center" });

    const pageCount = doc.internal.getNumberOfPages();
    doc.setFont("Helvetica", "normal"); // Asegúrate de cambiar a "normal"
    doc.setFontSize(10);
    doc.text(`Página ${pageCount - 1}`, 200, 279, { align: "right" });
};

export default GenerarP14;
