"use client"; // Убедитесь, что это клиентский компонент
import katex from 'katex';
import 'katex/dist/katex.min.css';
import React, { useRef, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MathfieldElement, renderMathInDocument, renderMathInElement } from 'mathlive'; // Импортируем компонент <math-field>

export default function Home() {
  const mathFieldRef = useRef<MathfieldElement>(null); // Используем ref для доступа к <math-field>
  var latexOutput = "";
  // const katexSpanRef = useRef<HTMLSpanElement>(null);
  // const katexHTML = document.createElement('span');

  var tags = [
    "Алгебра",
    "Геометрия",
    "Математика",
    "Тригонометрия",
    "Статистика",
    "Вероятность",
    "Дифференциальные уравнения",
    "Линейная алгебра",
    "Математический анализ",
    "Функции",
    "Математические модели",
    "Числовые последовательности",
    "Координатная геометрия",
    "Математическая логика",
    "Комбинаторика",
    "Математические теоремы",
    "Алгебраические выражения",
    "Системы уравнений",
    "Неравенства"
];

  useEffect(() => {
    if (mathFieldRef.current) {
      mathFieldRef.current.addEventListener('input', () => {
        if (mathFieldRef.current != null){
          latexOutput = mathFieldRef.current.getValue('latex');
          console.log('LaTeX Output:', latexOutput);
        }
      });
    }
  }, []);

  function handleTagsInput(e : React.FormEvent<HTMLInputElement>) {
    var input = e.currentTarget.value;
    var currentTags = [];
    tags.forEach((tag) => {
      if (tag == input) currentTags.push(tag);
    });
  }

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <link rel="stylesheet" href="./mathlive-static.css" />
      <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700;900&display=swap"
            rel="stylesheet"
          />
      <script src="https://unpkg.com/mathlive/dist/mathlive.js"></script>

      <div className='flex flex-col space-y-4 inset-1'>  
        <div className='flex space-x-2 self-end'>
        {/* <Dialog>
          <DialogTrigger>
            <button className='ring-1 ring-black py-2 px-4 rounded-xl w-max'>Сохранить</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Сохранить формулу</DialogTitle>
              <DialogDescription>
              <span className="katex" id="katex"></span>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}
          <button className='ring-1 ring-black py-2 px-4 rounded-xl w-max'>Сохранить</button>
          <button className='bg-black text-white py-2 px-4 rounded-xl w-max'>Сравнить</button>
        </div>
        <math-field className="min-w-[350px] min-h-[160px] rounded-md ring-1 ring-zinc-500" ref={mathFieldRef}></math-field>
      </div>
    </div>
  );
}