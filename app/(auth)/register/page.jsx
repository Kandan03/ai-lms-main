"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      if (passwordOne !== passwordTwo) {
        setError("Password do not match");
        return;
      }
      const cred = await createUserWithEmailAndPassword(auth, email, passwordOne);
      console.log("Success. The user is created in Firebase");

      const idToken = await cred.user.getIdToken(/* forceRefresh */ true);
      await fetch("/api/auth/set-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      router.push("/dashboard");
    } catch (err) {
      setError(err?.message || "Registration failed");
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2 fade-in">
      <div className="bg-muted relative hidden lg:block">
        <video
          width="320"
          height="240"
          autoPlay
          loop
          muted
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/monk.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form className="flex flex-col gap-6" onSubmit={onSubmit}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                  <h1 className="text-2xl font-bold">Register your account</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to register to your account
                  </p>
                </div>
                <Field>
                  <FieldLabel htmlFor="signUpEmail">Email</FieldLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    id="signUpEmail"
                    placeholder="Email"
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                  </div>
                  <Input
                    type="password"
                    name="passwordOne"
                    value={passwordOne}
                    onChange={(event) => setPasswordOne(event.target.value)}
                    id="signUpPassword"
                    placeholder="Password"
                  />
                </Field>
                <Field>
                  <Input
                    type="password"
                    name="password"
                    value={passwordTwo}
                    onChange={(event) => setPasswordTwo(event.target.value)}
                    id="signUpPassword2"
                    placeholder="Confirm password"
                  />
                </Field>
                <Field>
                  <Button>Register</Button>
                </Field>
                <FieldSeparator>Or continue with</FieldSeparator>
                <Field>
                  <Button variant="outline" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        fill="currentColor"
                      />
                    </svg>
                    Login with GitHub
                  </Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <a href="login" className="underline underline-offset-4">
                      Login
                    </a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
