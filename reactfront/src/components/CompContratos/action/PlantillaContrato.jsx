import { jsPDF } from "jspdf";
import { GenerarPortada } from "./CompContratoPDF/Portada";
import { GenerarP1 } from "./CompContratoPDF/Pag1";
import { GenerarP2 } from "./CompContratoPDF/Pag2";
import { GenerarP3 } from "./CompContratoPDF/Pag3";
import { GenerarP4 } from "./CompContratoPDF/Pag4";
import { GenerarP5 } from "./CompContratoPDF/Pag5";
import { GenerarP6 } from "./CompContratoPDF/Pag6";
import { GenerarP7 } from "./CompContratoPDF/Pag7";
import { GenerarP8 } from "./CompContratoPDF/Pag8";
import { GenerarP9 } from "./CompContratoPDF/Pag9";
import { GenerarP10 } from "./CompContratoPDF/Pag10";
import { GenerarP11 } from "./CompContratoPDF/Pag11";
import { GenerarP12 } from "./CompContratoPDF/Pag12";
import { GenerarP13 } from "./CompContratoPDF/Pag13";
import { GenerarP14 } from "./CompContratoPDF/Pag14";
const PlantillaContrato = () => {
    
    const GenerarPDF = () => {
        const doc = new jsPDF();
        GenerarPortada(doc);
        GenerarP1(doc);
        GenerarP2(doc);
        GenerarP3(doc);
        GenerarP4(doc);
        GenerarP5(doc);
        GenerarP6(doc);
        GenerarP7(doc);
        GenerarP8(doc);
        GenerarP9(doc);
        GenerarP10(doc);
        GenerarP11(doc);
        GenerarP12(doc);
        GenerarP13(doc);
        GenerarP14(doc);
        doc.save("Contrato_Uber.pdf");
    };
    
    return (
        <button className="btn btn-danger ml-10" onClick={GenerarPDF}>Generar PDF</button>
    );
};

export default PlantillaContrato;
