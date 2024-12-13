import React, { useEffect, useRef } from 'react';
import 'mathlive'; // Import the library

const MathField = ({ id, content }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ref.current) {
      const mathField = ref.current; // Get the reference to the math-field element
      mathField.readOnly = true; 
      mathField.addEventListener('keystroke', (event) => {
        console.log('Keystroke:', event.detail);
      });
    }
  }, []);

  return (
    <div>
      <math-field class={id} ref={ref}>{content}</math-field>
    </div>
  );
};

export default MathField;