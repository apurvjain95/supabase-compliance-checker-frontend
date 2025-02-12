"use client";

import userAPI from "@/api/UserAPI";
import { ToastContext } from "@/context/ToastContext";
import { validateEmail } from "@/utils/validators";
import { Button, TextField } from "@radix-ui/themes";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { openToast } = useContext(ToastContext);
  const router = useRouter();

  const loginUser = async () => {
    if (!validateEmail(emailId.trim())) {
      openToast({
        message: "Please enter a valid email id",
        type: "error",
      });
      return;
    }
    if (!password.trim()) {
      openToast({
        message: "Please enter a password",
        type: "error",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await userAPI.login({
        email: emailId,
        password: password,
      });
      if (response.success) {
        openToast({
          message: "Login successful",
          type: "success",
        });
        router.push("/compliance");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      openToast({
        message: error.response.data.message || "Wrong email or password",
        type: "error",
      });
    }
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center relative">
      <div className="flex flex-col gap-4 max-w-[25.125rem] min-w-[22.5rem] items-center mx-auto relative z-10 p-8 rounded-lg bg-gray-100">
        <span className="text-body-lg-medium font-extrabold font-jakarta">
          SCC
        </span>
        <div className="flex flex-col self-stretch gap-2">
          <label htmlFor="email-id" className="text-body-sm-medium">
            Email
          </label>
          <TextField.Root
            id="email-id"
            className="self-stretch outline-none"
            size="3"
            variant="surface"
            placeholder="Enter your email id"
            onChange={(e) => setEmailId(e.target.value)}
            value={emailId}
            autoFocus
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col self-stretch gap-2">
          <label htmlFor="password" className="text-body-sm-medium">
            Password
          </label>
          <TextField.Root
            id="password"
            type="password"
            className="self-stretch outline-none"
            size="3"
            variant="surface"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
          />
        </div>
        <Button
          className="cursor-pointer"
          size="3"
          loading={isLoading}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
