import React from "react";
import { colors as palette } from "../../data/colors";

interface ColorsSelectProps {
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
}

export default function ColorsSelect({
  selectedColors,
  setSelectedColors,
}: ColorsSelectProps) {
  function toggleColor(color: string) {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-amber-900">Colors</label>

      <div className="flex flex-wrap gap-3">
        {palette.map((color) => {
          const isSelected = selectedColors.includes(color);
          return (
            <button
              key={color}
              type="button"
              onClick={() => toggleColor(color)}
              aria-pressed={isSelected}
              className={`
                w-8 h-8 rounded-full border transition-transform
                ${isSelected ? "scale-110" : "hover:scale-105"}
              `}
              style={{
                backgroundColor: color,
                boxShadow: isSelected ? `0 0 0 4px ${color}55` : undefined,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
