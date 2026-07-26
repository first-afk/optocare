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
import { useRouter } from "next/navigation";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm({
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
    setLoading(true);
    try {
      const job = await createJob(values);
      if (job) {
        const handleRoute = () => router.push(`/jobs/${job.id}`);
        toast.success("Job has been created!", {
          action: {
            label: `View new posted Job`,
            onClick: handleRoute,
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occured while creating job", {
        error: error,
      });
    } finally {
      reset({
        job: "",
        clinic: "",
        description: "",
        type: "",
        range: "",
      });
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 justify-center w-full max-w-full space-y-3 rounded-4xl border-3 border-outline/70 bg-surface py-6 px-10 shadow-[0_30px_80px_rgba(37,99,235,0.12)] backdrop-blur-xl"
    >
      <h2 className="heading-h4">Create new job</h2>
      <div className="flex max-md:flex-col justify-between w-full gap-4">
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
                className="p-3 rounded-2xl border border-outline/70 dark:bg-surface bg-white/85 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
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
                className="p-3 rounded-2xl border border-outline/70 dark:bg-surface bg-white/85 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                placeholder="What's the name of clinic?"
                {...field}
              />
              <FieldError />
            </TextField>
          )}
        />
      </div>

      <div className="flex max-md:flex-col justify-between w-full gap-4">
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
              <Label className="text-sm font-medium">Job Type</Label>
              <Select.Trigger className="rounded-2xl border border-outline/70 dark:bg-surface bg-white/85 p-3 flex items-center justify-between transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-surface" placement="bottom left">
                <ListBox>
                  {jobType.map(({ type }) => (
                    <ListBox.Item
                      key={type}
                      id={type}
                      textValue={type}
                      className="dark:hover:bg-gray-500/60 hover:bg-[#ebf3fd] rounded-2xl border-0 outline-none p-2"
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
              <Label className="text-sm font-medium">Salary Range</Label>
              <Select.Trigger className="rounded-2xl border border-outline/70 dark:bg-surface bg-white/85 p-3 flex items-center justify-between transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-surface" placement="bottom left">
                <ListBox>
                  {salaryRange.map(({ range }) => (
                    <ListBox.Item
                      key={range}
                      id={range}
                      textValue={range}
                      className="dark:hover:bg-gray-500/60  hover:bg-[#ebf3fd] rounded-2xl border-0 outline-none p-2 "
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
          <div className="flex flex-col gap-2 w-full text-sm font-medium">
            <Label htmlFor="job-summary">Job Summary</Label>
            <MDEditor
              {...field}
              id="job-summary"
              preview="edit"
              height={250}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                backgroundColor: "#000b1ee2",
              }}
              textareaProps={{
                placeholder: "What's the job about?",
              }}
              previewOptions={{ disallowedElements: ["style"] }}
            />
            {/* <TextArea
              {...field}
              id="job-summary"
              className="rounded-3xl border border-outline/70 dark:bg-surface bg-white/90 px-4 py-4 text-sm leading-6 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              placeholder="What's the job about?"
              rows={5}
              style={{ resize: "vertical" }}
            /> */}
          </div>
        )}
      />
      <div className="w-full">
        <Button
          type="submit"
          className="bg-primary p-3 rounded-2xl text-white w-full cursor-pointer shadow-lg shadow-primary/10 hover:bg-primary/95"
        >
          {loading ? "Submitting ..." : "Submit"}
        </Button>
      </div>
    </Form>
  );
};

export default JobForm;
