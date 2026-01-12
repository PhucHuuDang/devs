import React from "react";

import { FieldValues, UseFormReturn } from "react-hook-form";

import { Form } from "@/components/ui/form";

interface FormWrapperProps<T extends FieldValues> {
  children: React.ReactNode;
  form: UseFormReturn<T>;

  onSubmit: (data: T) => Promise<void>;
  className?: string;
}

const FormWrapper = <T extends FieldValues>({
  children,
  form,
  onSubmit,
  className,
}: FormWrapperProps<T>) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </Form>
  );
};

export default FormWrapper;
