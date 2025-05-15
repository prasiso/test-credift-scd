'use client';
import Link from "next/link";
import { AuthProps } from "./AuthType";
import { RegisterOptions, useForm } from "react-hook-form";
import { Input } from "../";
export default function AuthForm({
  title,
  Submit,
  linkText,
  linkHref,
  isSignUp = false,
}: AuthProps) {
  const { control, handleSubmit } = useForm<{email: string, password: string, name: string}>();
  const rulesEmail: RegisterOptions<{email: string, password: string, name: string}> = {
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Digite um e-mail válido",
    },
    deps: ["email", "password", "name"]
  };
  const rulesPass: RegisterOptions<{email: string, password: string, name: string}> = {
    validate: (value) => {
      if(!isSignUp)
        return
      if (value.length < 8) return "Password must be at least 8 characters long";
      if (!/[A-Z]/.test(value))
        return "The password should contain at least 1 uppercase character.";
      if (!/[a-z]/.test(value)) {
        return "Password must contain at least one lowercase letter.";
      }
      if (!/[0-9]/.test(value)) {
        return "Password must contain at least one number.";
      }
      if (!/[\W_]/.test(value)) {
        return "Password must contain at least one special character.";
      }
      return true;
    },
  };
  const onSubmit = (data: {email: string, password: string, name: string}) => {
    const { email, password, name } = data;
    Submit({ email, password, name });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-xl font-bold mb-4"> {title} </h1>
        {isSignUp && (
          <Input label="Name" name="name" control={control} required />
        )}
        <Input
          label="Email"
          name="email"
          control={control}
          required
          rules={rulesEmail}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          showEye={true}
          control={control}
          required
          rules={rulesPass}
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded mb-4">
          Send
        </button>
        <Link href={linkHref} className="text-sm text-blue-500 hover:underline">
          {linkText}
        </Link>
      </form>
    </div>
  );
}
