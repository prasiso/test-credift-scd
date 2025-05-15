'use client';
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller, FieldValues } from "react-hook-form";
import { InputType } from ".";

export function Input<T extends FieldValues>({
  label,
  name,
  required,
  control,
  showEye = false,
  type = "text",
  rules,
  placeholder,
  value,
  onChange,
}: InputType<T>) {
  const [showPassword, setShowPassword] = useState(true);
  const isPassword = type === "password";

  const getInputType = () => {
    if (!isPassword) return type;
    return showPassword ? "password" : "text";
  };

  const renderPasswordToggle = () =>
    isPassword &&
    showEye && (
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    );

  const renderInputField = (
    field: {
      value?: string;
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
      name?: string;
      id?: string;
    },
    errorMessage?: string
  ) => (
    <>
      <div className="relative">
        <input
          {...field}
          id={name}
          placeholder={placeholder}
          type={getInputType()}
          className={`w-full px-3 py-2 border ${
            errorMessage ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {renderPasswordToggle()}
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </>
  );

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      {control ? (
        <Controller
          name={name}
          control={control}
          rules={{
            ...(required
              ? {
                  required: {
                    value: true,
                    message: `O campo ${label} é obrigatório`,
                  },
                }
              : {}),
            ...rules,
          }}
          render={({ field, fieldState }) =>
            renderInputField(field, fieldState?.error?.message)
          }
        />
      ) : (
        renderInputField({ value, onChange, name, id: name })
      )}
    </div>
  );
}
