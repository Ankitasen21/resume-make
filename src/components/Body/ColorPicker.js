import React from 'react';
import { ChromePicker } from 'react-color';

function ColorPickerApp({ selectedColor, onColorChange }) {
  const handleColorChange = (newColor) => {
    onColorChange(newColor.hex);
  };

  return (
    <div>
      <ChromePicker color={selectedColor} onChange={handleColorChange} />
    </div>
  );
}

export default ColorPickerApp;
