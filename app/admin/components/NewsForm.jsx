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
import React, { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      genre: "",
      duration: 15,
    },
  });
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const news = await createNewsArticle(values);
      if (news) {
        const handleRoute = () => router.push(`/news/${news.id}`);
        toast.success("News article has been created!", {
          action: {
            label: `View published article`,
            onClick: handleRoute,
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occured while publishing article", {
        error: error,
      });
    } finally {
      reset({
        title: "",
        content: "",
        genre: "",
        duration: 15,
      });
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 justify-center max-w-full md:w-sm space-y-3 rounded-xl border-2 border-outline/70 bg-surface py-6 px-10 backdrop-blur-xl shadow-lg"
    >
      <h2 className="heading-h4 capitalize">Add new article</h2>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            isRequired
            name="title"
            type="text"
            id="title"
            className="text-sm font-medium flex flex-col gap-3 w-full"
          >
            <Label htmlFor="job-title">Article Title</Label>
            <Input
              className="p-3 rounded-2xl dark:bg-surface border border-outline/70 bg-white/85 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
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
            <Select.Trigger className="rounded-2xl capitalize border border-outline/70 dark:bg-surface bg-white/85 p-3 flex items-center justify-between transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
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
          <div className="flex flex-col gap-2 w-full text-sm font-medium">
            <Label htmlFor="content">Content Summary</Label>
            <TextArea
              {...field}
              id="content"
              className="rounded-3xl border border-outline/70 dark:bg-surface bg-white/90 px-4 py-4 text-sm leading-6 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
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
            className="text-sm font-medium flex flex-col gap-3 w-full"
          >
            <Label htmlFor="duration">Estimated Read Time (minutes)</Label>
            <Input
              type="number"
              className="p-3 rounded-2xl border border-outline/70 dark:bg-surface bg-white/85 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              placeholder="15"
              {...field}
            />
            <FieldError />
          </TextField>
        )}
      />

      <div className="w-full">
        <Button
          type="submit"
          className="bg-primary p-3 rounded-2xl text-white w-full cursor-pointer shadow-lg shadow-primary/10 hover:bg-primary/95"
        >
          {loading ? "Publishing ..." : "Publish Article"}
        </Button>
      </div>
    </Form>
  );
};

export default NewsForm;
