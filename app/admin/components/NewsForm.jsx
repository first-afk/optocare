"use client";

import { createNewsArticle } from "@/lib/actions/news.actions";
import {
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  Select,
  ListBox,
  Button,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  title: z.string().min(1, { error: "Article title is required" }),

  content: z.string().min(1, { error: "Article content is required" }),
  genre: z.string().min(1, { error: "Article category is required" }),
  duration: z.coerce.number().min(1, { error: "Duration is required" }),
});

const genre = [
  { id: 1, type: "technology" },
  { id: 2, type: "clinical research" },
  { id: 3, type: "pediatric care" },
  { id: 4, type: "practice management" },
];

const NewsForm = () => {
  const router = useRouter();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      genre: "",
      time: 15,
    },
  });
  const onSubmit = async (values) => {
    const news = await createNewsArticle(values);
    if (news) {
      toast.success("News article has been created!");
      router.push(`/news/${news.id}`);
    } else {
      router.push("/");
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
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            isRequired
            name="title"
            type="text"
            id="title"
            className="text-sm font-medium flex flex-col gap-3 w-full max-w-md"
          >
            <Label htmlFor="job-title">Article Title</Label>
            <Input
              className="p-3 rounded-2xl border border-outline/70 bg-white/85 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              placeholder="e.g., Breakthrough in Glaucoma Treatment"
              {...field}
            />
            <FieldError />
          </TextField>
        )}
      />
      <Controller
        name="genre"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Select article category"
            onChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
            selectedKeys={field.value ? [field.value] : []}
          >
            <Label className="text-sm font-medium flex flex-col gap-3">
              Category
            </Label>
            <Select.Trigger className="rounded-2xl capitalize border border-outline/70 bg-white/85 p-3 flex items-center justify-between transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="bg-surface" placement="bottom left">
              <ListBox>
                {genre.map(({ type }) => (
                  <ListBox.Item
                    key={type}
                    id={type}
                    textValue={type}
                    className="dark:hover:bg-gray-500/60  hover:bg-[#ebf3fd] rounded-2xl border-0 outline-none p-2 capitalize text-sm font-medium"
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
        name="content"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2 w-full text-sm font-medium  max-w-md">
            <Label htmlFor="content">Content Summary</Label>
            <TextArea
              {...field}
              id="content"
              className="rounded-3xl border border-outline/70 bg-white/90 px-4 py-4 text-sm leading-6 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              placeholder="Write a brief overview of the article"
              rows={5}
              style={{ resize: "vertical" }}
            />
          </div>
        )}
      />

      <Controller
        name="duration"
        control={control}
        render={({ field }) => (
          <TextField
            isRequired
            name="duration"
            type="text"
            id="duration"
            className="text-sm font-medium flex flex-col gap-3 w-full max-w-md"
          >
            <Label htmlFor="duration">Estimated Read Time (minutes)</Label>
            <Input
              type="number"
              className="p-3 rounded-2xl border border-outline/70 bg-white/85 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              placeholder="15"
              {...field}
            />
            <FieldError />
          </TextField>
        )}
      />

      <div className="w-full max-w-md">
        <Button
          type="submit"
          className="bg-primary p-3 rounded-2xl text-white w-full cursor-pointer shadow-lg shadow-primary/10 hover:bg-primary/95"
        >
          Publish Article
        </Button>
      </div>
    </Form>
  );
};

export default NewsForm;
