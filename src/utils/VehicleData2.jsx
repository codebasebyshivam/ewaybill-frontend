import React, { useState } from 'react';

export default function VehicleData2() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="w-[300px] h-[400px] perspective">
      <div
        className={`relative transition-transform duration-700 w-full h-full transform-style ${flipped ? 'rotate-y-180' : ''} bg-red-500 rounded-md`}
      >
        <div className="w-full h-full rounded-md absolute backface-hidden bg-green-500 shadow-lg p-6">
          Front
          <button onClick={() => setFlipped(!flipped)}>view more</button>
        </div>
        <div className="w-full h-full absolute rounded-md backface-hidden bg-yellow-500 rotate-y-180 shadow-lg p-6">
          Back
          <button onClick={() => setFlipped(!flipped)}>view less</button>
        </div>
      </div>
    </div>
  );
}
