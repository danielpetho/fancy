import React from 'react';
import { DragElements } from '@/fancy/components/blocks/drag-elements';

const DragElementsDemo: React.FC = () => {
    return (
        <div className="w-full h-full bg-[#fefefe] min-h-[420px]">
            <DragElements dragElastic={0.1} className="p-40">
                <div className="text-[80px] font-mono text-[#f0be59] rotate-[4deg]">
                    ✹
                </div>

                {/* <div>
                    <img
                        src="/poster.jpg"
                        className="w-48 rotate-[-10deg]"
                        draggable={false}
                    />
                </div> */}

                <div className="text-[50px] font-mono text-transparent bg-clip-text bg-gradient-to-br from-[#4543c6] to-[#f0be59] rotate-[4deg]">
                    🌐
                </div>

                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4543c6] to-[#f0be59] rotate-[-12deg]">
                    AWESOME
                </div>

                <div className="px-12 py-4 rounded-[100%] bg-gradient-to-r from-[#4543c6] to-[#f0be59] font-mono text-3xl rotate-[-12deg]">
                    <span className="text-white">DISCO!</span>
                </div>

                <div className="p-1  rounded-full bg-gradient-to-r from-[#4543c6] to-[#f0be59] rotate-[4deg]">
                    <div className="bg-[#fefefe] rounded-full px-8 py-2">
                        <div className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#4543c6] to-[#f0be59] font-mono">
                            LOVELY!
                        </div>
                    </div>
                </div>

                <div className="text-[150px] font-mono text-transparent bg-clip-text bg-gradient-to-br from-[#4543c6] to-[#f0be59] rotate-[4deg]">
                    ★
                </div>

                <p className="text-6xl italic  text-[#4543c6] rotate-[-3deg] font-serif cursor-grab ">
                    funky time!
                </p>
            </DragElements>
        </div>
    );
};

export default DragElementsDemo;