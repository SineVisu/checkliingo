
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { KnowledgeTestFormValues } from './KnowledgeTestResultsForm';

interface ScoreInputProps {
  form: UseFormReturn<KnowledgeTestFormValues>;
  onScoreChange: (value: string) => void;
}

const ScoreInput: React.FC<ScoreInputProps> = ({ form, onScoreChange }) => {
  return (
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
              onChange={(e) => {
                field.onChange(e);
                onScoreChange(e.target.value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ScoreInput;
