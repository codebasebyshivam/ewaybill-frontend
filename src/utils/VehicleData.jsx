import { useState, memo } from 'react';


const FlipCard = () => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="w-[300px] h-[400px] perspective">
            <div className={` relative w-full h-full transition-transform duration-700 transform-style  ${flipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="bg-red-500 absolute w-full h-full backface-hidden  text-black rounded-xl shadow-lg p-6">
                    <h2 className="text-center  text-white font-nunito text-xl font-semibold mb-4">DL1LQ5147</h2>

                    <div className="text-center text-white font-nunito mb-4 text-sm">
                        <p>Rajnish Kumar Chand</p>
                    </div>



                    <div className="grid grid-cols-2 gap-7 mt-6 text-xs text-gray-300">
                        <div>
                            <p className="text-white font-nunito">RC Status</p>
                            <p>Fitness Expired</p>
                        </div>
                        <div>
                            <p className="text-white font-nunito">Blacklist</p>
                            <p>-</p>
                        </div>
                        <div>
                            <p className="text-white font-nunito">PUCC</p>
                            <p>25/07/2025</p>
                        </div>
                        <div>
                            <p className="text-white font-nunito">Insurance</p>
                            <p>14/03/2026</p>
                        </div>
                        <div>
                            <p className="text-white font-nunito">Category</p>
                            <p>3WT</p>
                        </div>
                        <div>
                            <p className="text-white font-nunito">Fuel Type</p>
                            <p>CNG Only</p>
                        </div>
                        <div>
                            <p className="text-white font-nunito">Road Tax</p>
                            <p>-</p>
                        </div>
                        <div>
                            <p className="text-white font-nunito">Registered At</p>
                            <p>22/07/2011</p>
                        </div>
                    </div>




                    {/* <div className="text-center mt-4 text-sm text-gray-300">♠ 77% ♣ ♦</div> */}

                    <button
                        onClick={() => setFlipped(true)}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-1 text-sm bg-white text-black rounded hover:bg-gray-200"
                    >
                        View More
                    </button>
                </div>

                {/* Back */}
                <div className="bg-green-500 absolute w-full h-full backface-hidden rotate-y-180  text-white rounded-xl shadow-lg p-6">
                    <h2 className="text-center text-xl font-semibold mb-4 font-poppins ">Vehicle Details</h2>
                    <ul className="text-sm space-y-3">
                        <li><span className="text-gray-400">Engine:</span> G12BN1200139</li>
                        <li><span className="text-gray-400">Chassis:</span> MA3EZLF1T00272610</li>
                        <li><span className="text-gray-400">Body Type:</span> Open Body</li>
                        <li><span className="text-gray-400">Unladen Weight:</span> 875</li>
                        <li><span className="text-gray-400">Present Address</span> 487/182 Peeragarhi National Market School Road</li>
                        <li><span className="text-gray-400">Cylinders:</span> 2</li>
                        <li><span className="text-gray-400">Seating Capacity:</span> 2</li>
                        <li className='truncate  max-w-[300px]'><span className="text-gray-400">Son/Wife/Daughter of:</span> Open Body</li>

                    </ul>

                    <button
                        onClick={() => setFlipped(false)}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-1 text-sm bg-white text-black rounded hover:bg-gray-200"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(FlipCard);
