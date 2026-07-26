"use client";

import Button from "@/app/components/ui/Button";
import { FieldError, Input, Label, TextField } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { File as FileIcon } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const File_size = 5 * 1024 * 1024;
const Accepted_file_type = ["application/pdf"];
const recipientEmail = "estherorieji@gmail.com";

const formSchema = z.object({
  fname: z.string().min(2, { error: "First name is required" }),
  lname: z.string().min(2, { error: "Last name is required" }),
  email: z.email("Invalid email address"),
  resume: z
    .any()
    .optional()
    .refine((file) => {
      return !file || file.size <= File_size;
    }, "File size must be less than 5MB")
    .refine((file) => {
      return !file || Accepted_file_type.includes(file.type);
    }, "Only pdf documents are supported"),
});

const ApplicationForm = ({ title }) => {
  const onSubmit = (data) => {
    const subject = encodeURIComponent(
      `Application submission for ${title} from ${data.fname} ${data.lname}`.trim(),
    );
    const body = encodeURIComponent(
      `First name: ${data.fname}\nLast name: ${data.lname}\nEmail: ${data.email}\n\nResume: ${data.resume?.name ?? "Not provided"}`,
    );
    window.location.assign(
      `mailto:${recipientEmail}?subject=${subject}&body=${body}`,
    );
  };
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      resume: undefined,
    },
  });
  return (
    <div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full gap-8 items-center justify-center">
          <Controller
            name="fname"
            control={control}
            render={({ field }) => (
              <TextField
                isRequired
                name="first_name"
                type="text"
                id="first_name"
                className="text-sm font-medium flex flex-col gap-2 w-full max-w-md"
              >
                <Label htmlFor="job-title">First Name</Label>
                <Input
                  className="p-3 rounded-2xl border border-outline/70 dark:bg-surface bg-white/85 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="John"
                  {...field}
                />
                <FieldError />
              </TextField>
            )}
          />
          <Controller
            name="lname"
            control={control}
            render={({ field }) => (
              <TextField
                isRequired
                name="last_name"
                type="text"
                id="last_name"
                className="text-sm font-medium flex flex-col gap-2 w-full max-w-md"
              >
                <Label htmlFor="job-title">Last Name</Label>
                <Input
                  className="p-3 rounded-2xl border border-outline/70 dark:bg-surface bg-white/85 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="Doe"
                  {...field}
                />
                <FieldError />
              </TextField>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                isRequired
                name="email"
                type="email"
                id="email"
                className="text-sm font-medium flex flex-col gap-2 w-full max-w-md"
              >
                <Label htmlFor="email">Email</Label>
                <Input
                  className="p-3 rounded-2xl border border-outline/70 dark:bg-surface bg-white/85 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="john@example.com"
                  {...field}
                />
                <FieldError />
              </TextField>
            )}
          />

          <Controller
            name="resume"
            control={control}
            render={({ field }) => (
              <TextField
                isRequired
                name="resume"
                type="file"
                id="resume"
                className="text-sm font-medium flex flex-col gap-2 w-full max-w-md"
              >
                <Label htmlFor="job-title">Upload your CV/Resume</Label>
                <Input
                  type="file"
                  accept=".pdf"
                  className="p-3 rounded-2xl border border-outline/70 dark:bg-surface bg-white/85 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder={<FileIcon />}
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={(event) => field.onChange(event.target.files?.[0])}
                />
                <FieldError />
              </TextField>
            )}
          />

          <Button
            type="submit"
            className="bg-secondary flex-1 sm:flex-none px-2 py-1 rounded-lg font-semibold w-full max-w-md"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
