"use client"; // Убедитесь, что это клиентский компонент
import katex from 'katex';
import 'katex/dist/katex.min.css';
import React, { useRef, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { MathfieldElement } from 'mathlive'; // Импортируем компонент <math-field>
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import CustomSelect from '../components/ui/customSelect';

interface formula {
  id: number;
  latex: string;
  description: string;
  tags: string;
}

const allTags = [
  "Все",
  "#Физика", 
  "Механика", "Термодинамика", "Оптика", "Электродинамика", "СтатистическаяФизика", "ФизикаКонденсированныхСред", "КвантоваяФизика", "ЯдернаяФизика", "ФизикаЭлементарныхЧастиц",
  "#Математика",
  "Алгебра","Геометрия","Арифметика","ТеорияЧисел","Комбинаторика","Топология","МатематическийАнализ", "Исчесления", "Статистика", "ТеорияВероятностей", "ТеорияМножеств", "Тригонометрия",
  "#Информатика"
]

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
          <Sheet>
            <SheetTrigger>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
              </svg>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Библиотека формул</SheetTitle>
                <SheetDescription>
                  <div className='flex'>
                    <CustomSelect options={allTags} />
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
        </Sheet>
        </div>
        <math-field className="min-w-[350px] min-h-[160px] rounded-md ring-1 ring-zinc-500" ref={mathFieldRef}></math-field>
      </div>
    </div>
  );
}