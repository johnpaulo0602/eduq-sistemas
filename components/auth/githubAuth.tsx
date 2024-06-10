'use client'

// import { signIn } from 'next-auth/react'
import IconGithub from '@/components/icon/icon-github';

import React, { useState } from "react";

interface IUser {
  email: string;
  password: string;
}

const GithubSignInButton = () => {

  // const handleSignIn = async () => {
  //   const result = await signIn('google', { callbackUrl: '/' });
  //   if (result?.error) {
  //       console.error("Erro ao fazer login:", result.error);
  //   }
  // }
  const [data, setData] = useState<IUser>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (

    <button
      onClick={() => signIn("github", { callbackUrl: "/" })} type="button" disabled={isLoading}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
      style={{ background: 'linear-gradient(135deg, rgba(245, 166, 12, 1) 0%, rgba(245, 166, 100, 1) 100%)' }}
    >
    <IconGithub />
    </button>
  )
}

export default GithubSignInButton
