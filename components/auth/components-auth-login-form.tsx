'use client';
import IconLockDots from '@/components/icon/icon-lock-dots';
import IconMail from '@/components/icon/icon-mail';
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
// import { signIn } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IUser {
    email: string;
    password: string;
}


export default function ComponentsAuthLoginForm({ className, ...props }: UserAuthFormProps) {
    const [data, setData] = useState<IUser>({
      email: "",
      password: "",
    });
  
    const router = useRouter();
  
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    async function onSubmit(event: React.SyntheticEvent) {
      event.preventDefault();
      setIsLoading(true);
  
      // const res = await signIn<"credentials">("credentials", {
      //   ...data,
      //   redirect: false,
      // });
  
      // if (res?.error) {
      //   console.log("erro")
      // } else {
      //   router.push("/");
      // }
    
      setData({
        email: "",
        password: "",
      });
      setIsLoading(false);
    }
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setData((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };
  
    return (

        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">

                <label htmlFor="Email">Email</label>
                <input 
                id="Email" 
                type="email" 
                placeholder="Digite seu email" 
                className="form-input ps-10 placeholder:text-white-dark" 
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                name="email"
                value={data.email}
                onChange={handleChange} 
                />

            </div>
            <div className="grid gap-1">
                <label htmlFor="Password">Password</label>

                <input 
                id="Password" 
                type="password" 
                placeholder="senha" 
                className="form-input ps-10 placeholder:text-white-dark" 
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                name="password"
                value={data.password}
                onChange={handleChange} 
                />
                
            </div>

            <button type="submit" className="btn btn-primary !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(39,66,213,0.44)]" disabled={isLoading}>
                Entrar
            </button>
          </div>
        </form>



    );
  }
  
