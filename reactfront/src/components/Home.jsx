import React from 'react';
import Img from '../images/construccion.jpg';

function Home() {
  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <img src={Img} alt="Construcción" className="w-1/2 mx-auto" />
    </div>
  );
}

export default Home;
