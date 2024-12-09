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
        if (mathFieldRef.current != null) console.log(mathFieldRef.current.getValue());
      });
    }
  }, []);

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <link rel="stylesheet" href="https://unpkg.com/mathlive/dist/mathlive-static.css" />
      <script src="https://unpkg.com/mathlive/dist/mathlive.js"></script>
      {/* Используем компонент <math-field> */}
      <math-field className="min-w-[350px] min-h-[200px] rounded-md ring-1 ring-zinc-500" ref={mathFieldRef}></math-field>
    </div>
  );
}