'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PasswordInputProps } from '../types/form';
import { FieldValues } from 'react-hook-form';


const PasswordInput = <TFormValues extends FieldValues>({
  id,
  name,
  placeholder,
  isSubmitting,
  register,
}: PasswordInputProps<TFormValues>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="relative flex items-center">
        <div className="absolute left-3 pointer-events-none">
          <Image
            src="/icons/password.svg"
            alt="password"
            width={16}
            height={16}
          />
        </div>
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={isSubmitting}
          {...register(name)}
          className="w-full h-12 px-10 rounded-2xl bg-gray-900 text-white outline-none border-0 focus:border-2 focus:border-purple-400"
        />
        <div className="absolute right-3 flex items-center">
          <button
            type="button"
            onClick={togglePasswordVisibility}
            disabled={isSubmitting}
            className={`relative h-8 w-8 flex items-center justify-center ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? (
              <Image src="/icons/show.svg" alt="show" width={24} height={24} />
            ) : (
              <Image
                src="/icons/not_show.svg"
                alt="show"
                width={24}
                height={24}
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default PasswordInput;