
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, BookText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface KnowledgeTestResultsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { score: string; date: Date; pltCodes?: string[] }) => void;
  dialogTitle?: string;
  initialValues?: { score?: string; date?: Date; pltCodes?: string[] };
}

// Define PLT code format validation
const pltCodeSchema = z.string().regex(/^PLT\d{3}$/, "Must be in format PLT followed by 3 digits");

const formSchema = z.object({
  score: z.string().min(1, "Score is required"),
  date: z.date({ required_error: "Date is required" }),
  pltCodes: z.array(pltCodeSchema).optional(),
});

const KnowledgeTestResultsDialog: React.FC<KnowledgeTestResultsDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  dialogTitle = 'Knowledge Test Results',
  initialValues
}) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [showPltInput, setShowPltInput] = useState(false);
  const [pltCodeInputs, setPltCodeInputs] = useState<string[]>(initialValues?.pltCodes || []);
  const [currentPltCode, setCurrentPltCode] = useState<string>('');

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      score: initialValues?.score || '',
      date: initialValues?.date || undefined,
      pltCodes: initialValues?.pltCodes || []
    }
  });

  // Update showPltInput when score changes
  useEffect(() => {
    const score = form.watch('score');
    if (score && parseInt(score) < 100) {
      setShowPltInput(true);
    } else {
      setShowPltInput(false);
      setPltCodeInputs([]);
    }
  }, [form.watch('score')]);

  const addPltCode = () => {
    if (pltCodeSchema.safeParse(currentPltCode).success) {
      setPltCodeInputs([...pltCodeInputs, currentPltCode]);
      setCurrentPltCode('');
      form.setValue('pltCodes', [...pltCodeInputs, currentPltCode]);
    }
  };

  const removePltCode = (index: number) => {
    const updatedCodes = [...pltCodeInputs];
    updatedCodes.splice(index, 1);
    setPltCodeInputs(updatedCodes);
    form.setValue('pltCodes', updatedCodes);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPltCode();
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (data.score && data.date) {
      onSave({ 
        score: data.score, 
        date: data.date, 
        pltCodes: showPltInput ? pltCodeInputs : undefined 
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookText className="h-5 w-5 text-primary" />
            <span>{dialogTitle}</span>
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Test Score (%)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your test score (e.g., 85)"
                      className="w-full"
                      type="number"
                      min="0"
                      max="100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Test Date</FormLabel>
                  <FormControl>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          type="button"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, 'PPP') : <span>Select test date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setCalendarOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {showPltInput && (
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
                
                {pltCodeInputs.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {pltCodeInputs.map((code, index) => (
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
            )}

            <div className="text-sm text-muted-foreground mt-2">
              Please enter the score and date from your FAA Private Pilot Airplane (PAR) Knowledge Test
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={onClose}
                type="button"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!form.formState.isValid}
              >
                Save Test Results
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default KnowledgeTestResultsDialog;
