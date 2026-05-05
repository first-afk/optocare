"use client";
import React from "react";
// import { Check } from "@gravity-ui/icons";
import {z} from "zod"
import {
  Button,
  Description,
  Dropdown,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";

const JobForm = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <Form
      className="flex flex-col gap-4 justify-center items-center w-full max-w-lg space-y-3 rounded-lg  bg-surface p-4"
      onSubmit={onSubmit}
    >
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

      <div className="flex justify-between w-full max-w-md">
         <Select className="w-1/2 bg-pink-500" placeholder="Select one">
      <Label>State</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className='bg-red-600 w-full max-w-40'>
        <ListBox>
          <ListBox.Item id="florida" textValue="Florida" className="listbox">
            Florida
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="delaware" textValue="Delaware" className="listbox">
            Delaware
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="california" textValue="California" className="listbox">
            California
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="texas" textValue="Texas" className="listbox">
            Texas
            <ListBox.ItemIndicator />
          </ListBox.Item>
          
        </ListBox>
      </Select.Popover>
    </Select>

        <Dropdown>
          <Dropdown.Trigger className="rounded-lg border p-2 bg-surface w-1/3">
            <Button>Salary Range</Button>
          </Dropdown.Trigger>
          <Dropdown.Popover className="min-w-50">
            <Dropdown.Menu>
              <Dropdown.Item
                id="item-1"
                textValue="Item 1"
                className="hover:bg-surface-secondary"
              >
                Item 1
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
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


      <div className="w-full max-w-md">
        <Button
          type="submit"
          className="bg-primary p-3 rounded-lg text-white w-full cursor-pointer"
        >
          {/* <Check /> */}
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default JobForm;
