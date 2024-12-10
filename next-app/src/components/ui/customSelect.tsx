// components/CustomSelect.tsx
import { useState } from 'react';

interface CustomSelectProps {
  options: string[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options }) => {
  const [selected, setSelected] = useState<string>(options[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-64">
      <div
        className="bg-gray-200 border border-gray-300 rounded-md p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-48 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {options.map((option) => (
            <div
              key={option}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px; /* Ширина скроллбара */
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; /* Цвет фона трека */
          border-radius: 10px; /* Закругление углов трека */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888; /* Цвет ползунка */
          border-radius: 10px; /* Закругление углов ползунка */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555; /* Цвет ползунка при наведении */
        }
      `}</style>
    </div>
  );
};

export default CustomSelect;