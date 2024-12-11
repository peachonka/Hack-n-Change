import React, { useEffect, useRef } from 'react';
import 'mathlive'; // Import the library

const MathFieldEdEditable = ({ className }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ref.current) {
      const mathField = ref.current; // Get the reference to the math-field element
      mathField.readOnly = false; 
      mathField.addEventListener('keystroke', (event) => {
        console.log('Keystroke:', event.detail);
      });
    }
  }, []);

  return (
    <div>
      <math-field ref={ref} className={className}></math-field>
    </div>
  );
};

export default MathFieldEdEditable;