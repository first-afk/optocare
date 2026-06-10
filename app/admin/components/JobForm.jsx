"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { createJob } from "@/lib/actions/jobs.actions";
import { redirect } from "next/navigation";

const formSchema = z.object({
  job: z.string().min(1, { error: "Job title is required" }),
  clinic: z.string().min(1, { error: "Clinic name is required" }),
  description: z.string().min(1, { error: "Job description is required" }),
  type: z.string().min(1, { error: "Job type is required" }),
  range: z.string().min(1, { error: "Salary range is required" }),
});

const jobType = [
  { id: 1, type: "Full Time" },
  { id: 2, type: "Hybrid" },
  { id: 3, type: "Part Time" },
];
const salaryRange = [
  { id: 1, range: "₦50,000 - ₦199,000" },
  { id: 2, range: "₦200,000 - ₦499,000" },
  { id: 3, range: "₦500,000 & above" },
];

const JobForm = () => {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job: "",
      clinic: "",
      description: "",
      type: "",
      range: "",
    },
  });
  const onSubmit = async (values) => {
    const job = await createJob(values);
    if (job) {
      toast.success("Job has been created!");
      console.log("Submitted", values);
      redirect(`/jobs/${job.id}`);
    } else {
      console.log("failed to create companion");
      redirect("/");
    }
  };
  const onError = (errors) => {
    toast.error("An error occured", {
      error: errors,
    });
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col gap-4 justify-center items-center w-full max-w-lg space-y-3 rounded-4xl border border-outline/70 bg-surface-gradient p-6 shadow-[0_30px_80px_rgba(37,99,235,0.12)] backdrop-blur-xl"
    >
      <Controller
        name="job"
        control={control}
        render={({ field }) => (
          <TextField
            isRequired
            name="job_title"
            type="text"
            id="job_title"
            className="text-sm font-medium flex flex-col gap-3 w-full max-w-md"
          >
            <Label htmlFor="job-title">Job Title</Label>
            <Input
              className="p-3 rounded-2xl border border-outline/70 bg-white/85 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              placeholder="What's the job title?"
              {...field}
            />
            <FieldError />
          </TextField>
        )}
      />
      <Controller
        name="clinic"
        control={control}
        render={({ field }) => (
          <TextField
            isRequired
            name="clinic_name"
            type="text"
            id="clinic_name"
            className="text-sm font-medium flex flex-col gap-3 w-full max-w-md"
          >
            <Label htmlFor="job-title">Clinic Name</Label>
            <Input
              className="p-3 rounded-2xl border border-outline/70 bg-white/85 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              placeholder="What's the name of clinic?"
              {...field}
            />
            <FieldError />
          </TextField>
        )}
      />

      <div className="flex flex-col justify-between w-full max-w-md gap-4">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Select job type"
              onChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
              selectedKeys={field.value ? [field.value] : []}
            >
              <Label>Job Type</Label>
              <Select.Trigger className="rounded-2xl border border-outline/70 bg-white/85 p-3 flex items-center justify-between transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover placement="bottom left">
                <ListBox>
                  {jobType.map(({ type }) => (
                    <ListBox.Item
                      key={type}
                      id={type}
                      textValue={type}
                      className="hover:bg-gray-500/60 rounded-2xl border-0 outline-none p-2"
                    >
                      <Label>{type}</Label>
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          )}
        />
        <Controller
          name="range"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Select salary range"
              onChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
              selectedKeys={field.value ? [field.value] : []}
            >
              <Label>Salary Range</Label>
              <Select.Trigger className="rounded-2xl border border-outline/70 bg-white/85 p-3 flex items-center justify-between transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover placement="bottom left">
                <ListBox>
                  {salaryRange.map(({ range }) => (
                    <ListBox.Item
                      key={range}
                      id={range}
                      textValue={range}
                      className="hover:bg-gray-500/60 rounded-2xl border-0 outline-none p-2"
                    >
                      <Label>{range}</Label>
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          )}
        />
      </div>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2 w-full max-w-md">
            <Label htmlFor="job-summary">Job Summary</Label>
            <TextArea
              {...field}
              id="job-summary"
              className="rounded-3xl border border-outline/70 bg-white/90 px-4 py-4 text-sm leading-6 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              placeholder="What's the job about?"
              rows={5}
              style={{ resize: "vertical" }}
            />
          </div>
        )}
      />
      <div className="w-full max-w-md">
        <Button
          type="submit"
          className="bg-primary p-3 rounded-2xl text-white w-full cursor-pointer shadow-lg shadow-primary/10 hover:bg-primary/95"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

/* 
  <TextField
        isRequired
        name="job-title"
        type="text"
        id="job-title"
        className="text-sm font-medium flex flex-col gap-3 w-full max-w-md"
      >
        <Label htmlFor="job-title">Job Title</Label>
        <Input
          className="p-2 rounded-md border border/60"
          placeholder="What's the job title?"
        />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        name="clinic-name"
        type="text"
        className="text-sm font-medium flex flex-col gap-3 w-full max-w-md"
      >
        <Label>Clinic Name</Label>
        <Input
          className="p-2 rounded-lg border border/60"
          placeholder="What's the clinic's name?"
        />
        <FieldError />
      </TextField>

      <div className="flex flex-col justify-between w-full max-w-md gap-4">
        <div className="flex gap-4 items-center">
          <Label>Job Type</Label>
          <Select aria-labelledby="job-type" className="w-2/3 flex flex-col">
            <Select.Trigger className="rounded-lg border bg-surface flex items-center  p-2">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {jobType.map(({ id, type }) => (
                  <ListBox.Item
                    key={id}
                    id={id}
                    textValue={type}
                    className="hover:bg-surface-secondary"
                  >
                    {type}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
        <div className="flex gap-4 items-center">
          <Label>Salary Range</Label>
          <Select aria-labelledby="salary-type" className="w-2/3 flex flex-col">
            <Select.Trigger className="rounded-lg border bg-surface p-2 flex">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {salaryRange.map(({ id, range }) => (
                  <ListBox.Item
                    key={id}
                    id={id}
                    textValue={range}
                    className="hover:bg-surface-secondary"
                  >
                    <Label>{range}</Label>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        <Controller
          name="user"
          control={control}
          render={({ field }) => (
            <Select
              label="Pick a User"
              onChange={field.onChange}
              selectedKeys={field.value ? [field.value] : []}
            >
              <Select.Trigger className="rounded-lg border bg-surface p-2 flex">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {salaryRange.map(({ id, range }) => (
                  <ListBox.Item
                    key={id}
                    id={id}
                    textValue={range}
                    className="hover:bg-surface-secondary"
                  >
                    <Label>{range}</Label>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
            </Select>
          )}
        />
      </div>

      <div className="flex flex-col gap-2 w-full max-w-md">
        <Label htmlFor="job-summary">Job Summary</Label>
        <TextArea
          id="job-summary"
          className="rounded-lg border border-border/70 bg-surface px-4 py-3 text-sm leading-6 shadow-sm"
          placeholder="What's the job about?"
          rows={5}
          style={{ resize: "vertical" }}
        />
      </div>

      
*/

export default JobForm;
