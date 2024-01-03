"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Name must not be empty",
  }),
  website: z.string().min(1, {
    message: "Website must not be empty",
  }),
  twitter: z.string().min(1, {
    message: "Twitter must not be empty",
  }),
  category: z.string().min(1, {
    message: "Category must not be empty",
  }),
  chain: z.string().min(1, {
    message: "Cain must not be empty",
  }),
});

const AddProjectForm = ({ formType }: { formType: "create" | "request" }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      website: "",
      twitter: "",
      chain: "",
      category: "",
    },
  });
  const {errors, isSubmitSuccessful, isSubmitting } = form.formState

  const handleAdd = async (data: z.infer<typeof FormSchema>) => {
    const { name, website, twitter, category, chain } = data;

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          name,
          website,
          twitter,
          category,
          chain,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to create");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequest = async (data: z.infer<typeof FormSchema>) => {
    const { name, website, twitter, category, chain } = data;

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          name,
          website,
          twitter,
          category,
          chain,
        }),
      });
      form.reset();
      if (!response.ok) {
        form.setError("root.myErr", {
          type: "Custom",
          message: "Failed to add requested Dapp",
        });
      }
    } catch (error) {
      console.log(error);
    }      
  };

  return (
    <div className="border rounded-xl p-10 flex flex-col space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            formType === "create" ? handleAdd : handleRequest
          )}
          className="space-y-5 pt-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="space-x-1">
                  <span className="text-[16px] font-medium">Project Name</span>
                  <span className="text-red-600 font-medium">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="project name"
                    className="text-[16px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="space-x-1">
                  <span className="text-[16px] font-medium">
                    Project Website
                  </span>
                  <span className="text-red-600 font-medium">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="website of project"
                    className="text-[16px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="space-x-1">
                  <span className="text-[16px] font-medium">
                    Twitter Account
                  </span>
                  <span className="text-red-600 font-medium">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Project twitter"
                    className="text-[16px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chain"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="space-x-1">
                  <span className="text-[16px] font-medium">Project Chain</span>
                  <span className="text-red-600 font-medium">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Project Chain"
                    className="text-[16px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="space-x-1">
                  <span className="text-[16px] font-medium">
                    Project Category
                  </span>
                  <span className="text-red-600 font-medium">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Project Category"
                    className="text-[16px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {formType === "create" ? (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full space-x-2"
            >
              {isSubmitting && <Loader className="animate-spin" />}
              <span>{isSubmitting ? "Creating" : "Create"}</span>
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full space-x-2"
            >
              {isSubmitting && <Loader className="animate-spin" />}
              <span>{isSubmitting ? "Requesting" : "Request"}</span>
            </Button>
          )}
        </form>
      </Form>
      {isSubmitSuccessful && (
        <p className="text-green-600">Dapp Requested Successfully.</p>
      )}
      {errors.root && (
        <p className="text-red-600">{errors.root?.myErr?.message}</p>
      )}
    </div>
  );
};

export default AddProjectForm;
