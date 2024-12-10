"use client"; // Убедитесь, что это клиентский компонент
import katex from 'katex';
import 'katex/dist/katex.min.css';
import React, { useRef, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { MathfieldElement } from 'mathlive'; // Импортируем компонент <math-field>

export default function Home() {
  const mathFieldRef = useRef<MathfieldElement>(null); // Используем ref для доступа к <math-field>


  useEffect(() => {
    if (mathFieldRef.current) {
      mathFieldRef.current.addEventListener('input', () => {
        if (mathFieldRef.current != null){
          const latexOutput = mathFieldRef.current.getValue('latex');
        console.log('LaTeX Output:', latexOutput);
        }
      });
    }
  }, []);

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      {/* <div className="absolute inset-0 w-full overflow-hidden -z-10 rounded-lg">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full opacity-5"
        >
          <source src="./vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute bg-gradient-to-b from-white dark:from-black to-transparent opacity-10"></div>
      </div>   */}
      <link rel="stylesheet" href="./mathlive-static.css" />
      <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700;900&display=swap"
            rel="stylesheet"
          />
      <script src="https://unpkg.com/mathlive/dist/mathlive.js"></script>

      <div className='flex flex-col space-y-4 inset-1'>  
        <div className='flex space-x-2 self-end'>   
          <button className='ring-1 ring-black py-2 px-4 rounded-xl w-max'>Сохранить</button>
          <button className='bg-black text-white py-2 px-4 rounded-xl w-max'>Сравнить</button>
        </div>
        <math-field className="min-w-[350px] min-h-[160px] rounded-md ring-1 ring-zinc-500" ref={mathFieldRef}></math-field>
      </div>
    </div>
  );
}