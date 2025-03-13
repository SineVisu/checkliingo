
import React, { useEffect } from 'react';
import { Form } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PLTCodesInput from './PLTCodesInput';
import ScoreInput from './ScoreInput';
import TestDateInput from './TestDateInput';
import FormActions from './FormActions';

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

  // Handle score changes to determine if PLT codes input should be shown
  const handleScoreChange = (value: string) => {
    if (value && parseInt(value) < 100) {
      setShowPltInput(true);
    } else {
      setShowPltInput(false);
      setPltCodeInputs([]);
      form.setValue('pltCodes', []);
    }
  };

  // Update showPltInput when initialValues change
  useEffect(() => {
    const score = form.watch('score');
    handleScoreChange(score);
  }, [form.watch('score')]);

  const handlePltCodesChange = (codes: string[]) => {
    setPltCodeInputs(codes);
    form.setValue('pltCodes', codes);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <ScoreInput form={form} onScoreChange={handleScoreChange} />
        
        <TestDateInput 
          form={form} 
          calendarOpen={calendarOpen} 
          setCalendarOpen={setCalendarOpen} 
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

        <FormActions 
          onCancel={onCancel} 
          isValid={form.formState.isValid} 
        />
      </form>
    </Form>
  );
};

export default KnowledgeTestResultsForm;
