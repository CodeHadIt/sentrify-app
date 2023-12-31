'use client'
import {Dispatch, SetStateAction, useState} from 'react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';

const FormSchema = z.object({
  key: z.string().min(1, {
    message: "Key must not be empty",
  }),
});

type FormStatus = "initial" | "checking" | "error"

const PassForm = ({setIsCorrectKey}: {setIsCorrectKey: Dispatch<SetStateAction<boolean>>}) => {
  const [status, setStatus] = useState<FormStatus>("initial")
  const passkey = process.env.NEXT_PUBLIC_PASS_KEY;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      key: "",
    },
  });

  const verifyKey = async (data: z.infer<typeof FormSchema>) => {
    setStatus("checking");
    const { key } = data;
    if(key === passkey) {
        setIsCorrectKey(true);
        setStatus("initial");
    } else {
        setIsCorrectKey(false);
        setStatus("error");
    }
  };

  return (
    <div className="border rounded-xl p-10 flex flex-col space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(verifyKey)}
          className="space-y-5 pt-6"
        >
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="space-x-1">
                  <span className="text-[16px] font-medium">Pass Key</span>
                  <span className="text-red-600 font-medium">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="enter passkey"
                    className="text-[16px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={status === "checking"}
            className="w-full space-x-2"
          >
            {status === "checking" && (
              <Loader className="h-5 w-5 animate-spin" />
            )}
            <span>Enter</span>
          </Button>
        </form>

        {status === "error" && ( <p className='text-red-600'>Incorrect Passkey</p> )}
      </Form>
    </div>
  );
};

export default PassForm