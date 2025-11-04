// SafeMindEmergencyForm.jsx
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // assuming you have an Input component
import { Button } from "@/components/ui/button";

export default function SafeMindEmergencyForm() {
  const methods = useForm({
    defaultValues: {
      name: "",
      phone: "",
      relation: "",
    },
  });

  const onSubmit = (data) => {
    alert(`Emergency Contact Added:\nName: ${data.name}\nPhone: ${data.phone}\nRelation: ${data.relation}`);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-md">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormField
            name="name"
            control={methods.control}
            rules={{ required: "Name is required" }}
            render={({ field }) => <FormControl asChild><Input {...field} placeholder="Contact Name" /></FormControl>}
          />
          <FormDescription>Enter the contact's full name.</FormDescription>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <FormField
            name="phone"
            control={methods.control}
            rules={{
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit phone number",
              },
            }}
            render={({ field }) => <FormControl asChild><Input {...field} placeholder="Contact Phone" /></FormControl>}
          />
          <FormDescription>Enter the contact's phone number.</FormDescription>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Relation</FormLabel>
          <FormField
            name="relation"
            control={methods.control}
            rules={{ required: "Relation is required" }}
            render={({ field }) => <FormControl asChild><Input {...field} placeholder="Relation (e.g., Parent, Friend)" /></FormControl>}
          />
          <FormDescription>Specify your relationship with this contact.</FormDescription>
          <FormMessage />
        </FormItem>

        <Button type="submit" className="w-full bg-primary text-white">
          Add Contact
        </Button>
      </Form>
    </FormProvider>
  );
}
