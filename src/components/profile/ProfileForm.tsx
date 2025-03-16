
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { ProfileFormValues } from './ProfileSchema';

interface ProfileFormProps {
  form: UseFormReturn<ProfileFormValues>;
  onSubmit: (data: ProfileFormValues) => void;
  onCancel: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ form, onSubmit, onCancel }) => {
  // Watch the email field to conditionally show the checkbox
  const email = form.watch("email");
  const hasEmail = email && email.trim().length > 0;
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="your.email@example.com" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {hasEmail && (
          <FormField
            control={form.control}
            name="learnMoreAboutFlyber"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2 bg-muted/20">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">
                    I would like to learn more about Flyber
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        )}
        
        <FormField
          control={form.control}
          name="trainingMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How are you learning to fly?</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your training method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="part61">With a Part 61 Flight School</SelectItem>
                  <SelectItem value="part141">With a Part 141 Flight School</SelectItem>
                  <SelectItem value="independent">With an independent Flight Instructor</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <FormField
            control={form.control}
            name="trainingAirport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>At what airport do you most commonly train?</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Airport name or code (e.g., KJFK)" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="airportAddress"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Airport Address</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter airport address" 
                    className="resize-none"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end gap-2 pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
};
