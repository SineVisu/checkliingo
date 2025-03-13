
import React, { useEffect } from 'react';
import { BookText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PLTCodesInput from './PLTCodesInput';
import DateSelector from '@/components/common/DateSelector';

// Define PLT code format validation
const pltCodeSchema = z.string().regex(/^PLT\d{3}$/, "Must be in format PLT followed by 3 digits");

const formSchema = z.object({
  score: z.string().min(1, "Score is required"),
  date: z.date({ required_error: "Date is required" }),
  pltCodes: z.array(pltCodeSchema).optional(),
});

export type KnowledgeTestFormValues = z.infer<typeof formSchema>;

interface KnowledgeTestResultsFormProps {
  initialValues?: { score?: string; date?: Date; pltCodes?: string[] };
  onSubmit: (data: KnowledgeTestFormValues) => void;
  onCancel: () => void;
}

const KnowledgeTestResultsForm: React.FC<KnowledgeTestResultsFormProps> = ({
  initialValues,
  onSubmit,
  onCancel
}) => {
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [showPltInput, setShowPltInput] = React.useState(false);
  const [pltCodeInputs, setPltCodeInputs] = React.useState<string[]>(initialValues?.pltCodes || []);

  // Initialize the form
  const form = useForm<KnowledgeTestFormValues>({
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
      form.setValue('pltCodes', []);
    }
  }, [form.watch('score')]);

  const handlePltCodesChange = (codes: string[]) => {
    setPltCodeInputs(codes);
    form.setValue('pltCodes', codes);
  };

  return (
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
                <DateSelector
                  date={field.value}
                  onDateChange={(date) => {
                    field.onChange(date);
                    setCalendarOpen(false);
                  }}
                  placeholder="Select test date"
                  isOpen={calendarOpen}
                  onOpenChange={setCalendarOpen}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {showPltInput && (
          <PLTCodesInput 
            pltCodes={pltCodeInputs}
            onChange={handlePltCodesChange}
          />
        )}

        <div className="text-sm text-muted-foreground mt-2">
          Please enter the score and date from your FAA Private Pilot Airplane (PAR) Knowledge Test
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button 
            variant="outline" 
            onClick={onCancel}
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
        </div>
      </form>
    </Form>
  );
};

export default KnowledgeTestResultsForm;
