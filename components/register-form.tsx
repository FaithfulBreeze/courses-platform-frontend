'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormField, FormItem, FormControl, FormMessage, Form } from './ui/form';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

const registerFormSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [state, setState] = useState({
    isPasswordVisible: false,
    isLoading: false,
    body: {
      email: '',
      name: '',
      password: '',
    },
  });

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  async function handleSubmit(data: z.infer<typeof registerFormSchema>) {
    setState((prev) => ({ ...prev, isLoading: true, body: data }));
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
      body: JSON.stringify(data),
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const parsedResponse = await response.json();
    if (response.status != 201) {
      toast(parsedResponse.message);
      setState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    toast(parsedResponse.message);

    setTimeout(() => {
      toast('Redirecting to login...');
      setTimeout(() => {
        redirect('/auth');
      }, 750);
    }, 600);
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Welcome to Courses Platform!</CardTitle>
          <CardDescription>Fill in the form to create your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="name">Name</Label>
                  </div>

                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              id="name"
                              type="name"
                              placeholder="John Doe"
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>

                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              id="email"
                              type="email"
                              placeholder="m@example.com"
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>

                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <div className="relative flex items-center">
                              <Input
                                {...field}
                                id="password"
                                type={state.isPasswordVisible ? 'text' : 'password'}
                                required
                              />
                              {!state.isPasswordVisible ? (
                                <EyeClosed
                                  className="absolute right-4 cursor-pointer"
                                  onClick={() =>
                                    setState((prev) => ({
                                      ...prev,
                                      isPasswordVisible: !prev.isPasswordVisible,
                                    }))
                                  }
                                />
                              ) : (
                                <Eye
                                  className="absolute right-4 cursor-pointer"
                                  onClick={() =>
                                    setState((prev) => ({
                                      ...prev,
                                      isPasswordVisible: !prev.isPasswordVisible,
                                    }))
                                  }
                                />
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Button disabled={state.isLoading} type="submit" className="w-full">
                    register
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <a href="/auth" className="underline underline-offset-4">
                  Sign in
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
