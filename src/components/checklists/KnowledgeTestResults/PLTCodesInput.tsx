
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from 'zod';

// Define PLT code format validation
const pltCodeSchema = z.string().regex(/^PLT\d{3}$/, "Must be in format PLT followed by 3 digits");

interface PLTCodesInputProps {
  pltCodes: string[];
  onChange: (codes: string[]) => void;
}

const PLTCodesInput: React.FC<PLTCodesInputProps> = ({
  pltCodes,
  onChange
}) => {
  const [currentPltCode, setCurrentPltCode] = useState<string>('');

  const addPltCode = () => {
    if (pltCodeSchema.safeParse(currentPltCode).success) {
      const updatedCodes = [...pltCodes, currentPltCode];
      onChange(updatedCodes);
      setCurrentPltCode('');
    }
  };

  const removePltCode = (index: number) => {
    const updatedCodes = [...pltCodes];
    updatedCodes.splice(index, 1);
    onChange(updatedCodes);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPltCode();
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">PLT Codes</div>
      <div className="text-sm text-muted-foreground">
        Add the PLT codes from your knowledge test results.
      </div>
      
      <div className="flex gap-2">
        <Input
          placeholder="Enter PLT code (e.g., PLT123)"
          value={currentPltCode}
          onChange={(e) => setCurrentPltCode(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button 
          type="button" 
          onClick={addPltCode}
          variant="outline"
          disabled={!pltCodeSchema.safeParse(currentPltCode).success}
        >
          Add
        </Button>
      </div>
      
      {pltCodes.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {pltCodes.map((code, index) => (
            <div key={index} className="bg-muted px-3 py-1 rounded-md flex items-center gap-2">
              <span>{code}</span>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0" 
                onClick={() => removePltCode(index)}
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PLTCodesInput;
