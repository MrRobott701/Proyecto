import { useState } from "react";
const Encabezado = (isCollapsed) => {
    
    return (
<header className="bg-gray-800 shadow-md fixed w-full z-10">
{/* Barra superior */}
<section className="py-2 bg-[#1d294f] text-white text-center flex justify-center items-center">
<i className="fa-brands fa-studiovinari text-white text-5xl h-14 mr-6"></i>
<p className="text-4xl font-bold">PROPIETARIOS / ARRENDADORES</p>
<i className="fa-brands fa-studiovinari fa-flip-horizontal text-white text-5xl h-14 ml-6"></i>
</section>
</header>

    );
    
    }
    
    export default Encabezado;