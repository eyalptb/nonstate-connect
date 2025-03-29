
import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AppleIcon, GoogleIcon } from "@/components/auth/AuthIcons";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/contexts/AuthContext";
import { Loader, X, Check } from "lucide-react";

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens"),
  password: passwordSchema,
  confirmPassword: z.string().min(1, "Confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, signInWithApple, checkUsernameAvailability, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameChecking, setUsernameChecking] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Debounced username availability check
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        setUsernameChecking(true);
        const isAvailable = await checkUsernameAvailability(username);
        setIsUsernameAvailable(isAvailable);
        setUsernameChecking(false);
      } else {
        setIsUsernameAvailable(null);
      }
    }, 500),
    []
  );

  // Watch for username changes to check availability
  const username = form.watch("username");
  useEffect(() => {
    if (username && username.length >= 3) {
      checkUsername(username);
    } else {
      setIsUsernameAvailable(null);
    }
  }, [username, checkUsername]);

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      
      if (!isUsernameAvailable) {
        form.setError("username", {
          type: "manual",
          message: "Username is already taken",
        });
        return;
      }

      const { error } = await signUp({
        email: values.email,
        password: values.password,
        username: values.username,
      });

      if (!error) {
        // Don't navigate - show confirmation message on this page
        form.reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  const handleAppleSignIn = async () => {
    await signInWithApple();
  };

  return (
    <Container className="flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md space-y-6">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Create an account to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <GoogleIcon className="mr-2 h-4 w-4" />
              )}
              Sign up with Google
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={handleAppleSignIn}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <AppleIcon className="mr-2 h-4 w-4" />
              )}
              Sign up with Apple
            </Button>

            <div className="flex items-center">
              <Separator className="flex-grow" />
              <span className="mx-2 text-xs text-muted-foreground">OR</span>
              <Separator className="flex-grow" />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="mail@example.com"
                          type="email"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <div className="relative w-full">
                            <Input
                              placeholder="username"
                              type="text"
                              disabled={isSubmitting}
                              {...field}
                            />
                            {username && username.length >= 3 && (
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                {usernameChecking && (
                                  <Loader className="h-4 w-4 text-gray-400 animate-spin" />
                                )}
                                {!usernameChecking && isUsernameAvailable === true && (
                                  <Check className="h-4 w-4 text-green-500" />
                                )}
                                {!usernameChecking && isUsernameAvailable === false && (
                                  <X className="h-4 w-4 text-red-500" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                      {username && username.length >= 3 && !usernameChecking && (
                        <p className={`text-xs ${isUsernameAvailable ? "text-green-500" : "text-red-500"}`}>
                          {isUsernameAvailable
                            ? "Username is available"
                            : "Username is already taken"}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || usernameChecking || (username.length >= 3 && isUsernameAvailable === false)}
                >
                  {isSubmitting ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Sign Up
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="text-primary underline underline-offset-4 hover:text-primary/90"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
};

export default SignUp;
