"use client"; // Убедитесь, что это клиентский компонент
import React, { useRef, useEffect, useState } from 'react';
import  MathFieldEditable  from "../components/math-field-editable";
import  MathField  from "../components/math-field";
import { MathfieldElement } from 'mathlive';
import { MagnifyingGlassIcon } from '@heroicons/react/outline';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import CustomSelect from '../components/ui/customSelect';
import { fetchAllFormulas, sendFormula } from '../api/data';

interface Formula {
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
];

// const formulaBase: Formula[] = [
//   {id: 1, latex: "x^2+y^2=z^2", description: "Дистанция двух точек в прямоугольном квадрате", tags: "#Математика Геометрия"},
//   {id: 2, latex: "k_{n+1} = n^2 + k_n^2 - k_{n-1}", description: "екран", tags: "#Информатика"},
//   {id: 3, latex: "пкуп", description: "купить", tags: "#Физика Термодинамика"},
// ];

const formulaBase: Formula[] = await fetchAllFormulas();

const intersections = {
  "50": [
    {
      id: 0,
      latex: "x^2+y^2=z^2",
      description: "string",
      tags: "string"
    }
  ],
  "25": [
    {
      id: 1,
      latex: "k_{n+1} = n^2 + k_n^2 - k_{n-1}",
      description: "string",
      tags: "string"
    }
  ],
  "10": [
    {
      id: 2,
      latex: "k_{n+1} = n^2 + k_n^2 - k_{n-1}",
      description: "string",
      tags: "string"
    }
  ]
}

export default function Home() {
  const mathFieldRef = useRef<MathfieldElement>(null); // Используем ref для доступа к <math-field>
  const [selectedTag, setSelectedTag] = useState<string>("Все"); // Состояние для выбранного тега
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Состояние для управления видимостью модального окна
  const [description, setDescription] = useState<string>(""); // Состояние для описания формулы
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // Состояние для выбранных тегов
  const [latexOutput, setLatexOutput] = useState<string>(""); // Состояние для хранения LaTeX
  

  // Фильтрация формул на основе выбранного тега
  const filteredFormulas = formulaBase.filter(formula => {
    return selectedTag === "Все" || formula.tags.includes(selectedTag);
  });

//   function highlightSymbol(start: number, mfe: MathfieldElement) {
//     // Select the range of the symbol to highlight
//     const end = start + 1;

//     if (start !== -1) {
//       mfe.executeCommand('selectGroup', start, end);
//       mfe.applyStyle({ color: 'red' });
//     }
// }


//   function handleSelection() {
//     var latex = latexOutput.split('');
//     latex.sort();
  
//     const selections = document.getElementsByClassName("selection");
//     for (let i = 0; i < formulaBase.length; i++) {
//       var selection = formulaBase[i].latex.split('');
//       for (let j = 0; j < selection.length; j++) {
        
//         console.log(selections);
//         if (true) {
//           highlightSymbol(j, selections[i] as MathfieldElement);
//         }
//       }
//     }
//   }

  const handleSave = () => {
    const tagsString = selectedTags.join(", "); // Преобразуем массив тегов в строку

    const newFormula: Formula = {
      id: 0,
      latex: latexOutput,
      description: description,
      tags: tagsString
    };

    // Здесь вы можете отправить newFormula на сервер
    sendFormula(newFormula);
    console.log(newFormula);

    // Закрываем модальное окно и сбрасываем форму
    setIsModalOpen(false);
    setDescription("");
    setSelectedTags([]);
    setLatexOutput(""); // Сбрасываем LaTeX
  };

  return (
    <div className='flex h-screen w-screen items-center justify-center'>

      <div className='flex flex-col space-y-4'>
        <div className='flex justify-between w-full'>
          <div className='flex space-x-2 self-start'>
          <Sheet>
            <SheetTrigger >
              <button className='bg-black text-white py-2 px-4 rounded-xl w-max'>Сравнить</button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Совпадения</SheetTitle>
                <SheetDescription>
                  <div className='flex flex-col overflow-y-auto scroll-smooth h-full w-full'>
                    <ul className='p-2 space-y-2'>
                    {Object.entries(intersections).map(([key, formulas], index) => (
                        <li key={index} className='flex flex-col text-left' >
                            <div className='text-black text-lg font-bold'>{key} %</div>
                            {formulas.map((formula) => (
                                <div key={formula.id} className='border-b-1 border-gray-300 py-2'>
                                    <MathField id={`selection-${formula.id}`} content={formula.latex} />
                                    <div className='text-sm'>{formula.description}</div>
                                </div>
                            ))}
                        </li>
                    ))}
                    </ul>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
            <button 
              className='ring-1 ring-black py-2 px-4 rounded-xl w-max'
              onClick={() => {setIsModalOpen(true);}} // Открываем модальное окно
            >
              Сохранить
            </button>
          </div>
          <Sheet>
            <SheetTrigger >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
              </svg>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Библиотека формул</SheetTitle>
                <SheetDescription>
                  <div className='flex'>
                    <CustomSelect options={allTags} onChange={setSelectedTag} />
                  </div>
                  <div className='flex flex-col overflow-y-auto scroll-smooth h-full w-full'>
                    <ul className='p-2'>
                      {filteredFormulas.map((formula, index) => (
                        <li key={index} className='border-b-1 border-gray-300 py-2'>
                          <MathField id="math-field-2" content={formula.latex}/>
                          <div>{formula.description}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <MathFieldEditable latexOutput={latexOutput} setLatexOutput={setLatexOutput} className="min-w-[350px] min-h-[160px] rounded-md ring-1 ring-zinc-500"></MathFieldEditable>
      </div>

      {/* Модальное окно для ввода формулы */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Добавить формулу</h2>
            <MathField id="math-3" content={latexOutput}/>
            <input 
              type="text" 
              placeholder="Описание" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="border rounded-md p-2 mt-4 w-full"
            />
            <div className="mt-2 grid grid-cols-2 gap-2"> {/* Отображаем теги в несколько столбцов */}
              {allTags.slice(1).map(tag => ( // Убираем первый тег
                <label key={tag} className="block">
                  <input 
                    type="checkbox" 
                    value={tag} 
                    className='mr-2'
                    checked={selectedTags.includes(tag)} 
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedTags(prev => 
                        prev.includes(value) ? prev.filter(tag => tag !== value) : [...prev, value]
                      );
                    }} 
                  />
                  {tag}
                </label>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button 
                onClick={handleSave}
                className="bg-black text-white py-2 px-4 rounded-xl"
                >
                  Сохранить формулу
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="ml-2 bg-gray-300 py-2 px-4 rounded-xl"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }