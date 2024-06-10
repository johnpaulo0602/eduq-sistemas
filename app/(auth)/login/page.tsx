
import Image from 'next/image'
import ComponentsAuthLoginForm from '@/components/auth/components-auth-login-form';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

import GoogleSignInButton from '@/components/auth/googleAuth'
import GithubSignInButton from '@/components/auth/githubAuth'

export const metadata: Metadata = {
    title: 'Entrar',
};

const CoverLogin = () => {
    return (
        <div>
            <div className="absolute inset-0">
                <Image
                    src="/assets/images/auth/bg-gradient.png"
                    alt="image"
                    className="object-cover h-full w-full"
                    width={100}
                    height={100}
                />
            </div>
            <div className="relative flex min-h-screen items-center justify-center  px-6 py-10 dark:bg-[#060818] sm:px-16">
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(39,66,160,1)_0%,rgba(39,66,213,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <Link href="/" className="ms-10 block w-48 lg:w-72">
                                <Image
                                    src="/assets/images/auth/logo-white.svg"
                                    alt="Logo" 
                                    className="w-48"
                                    width={100}
                                    height={100}
                                />
                            </Link>
                            <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                <Image 
                                src="/assets/images/auth/login.svg" 
                                alt="Cover Image" 
                                className="w-full"
                                width={100}
                                height={100}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="flex w-full max-w-[440px] items-center justify-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                            <Link href="/" className="block w-28 lg:hidden">
                                <Image 
                                src="/assets/images/logo.svg" 
                                alt="Logo" 
                                className="mx-auto w-full"
                                width={100}
                                height={100}
                                />
                            </Link>
                        </div>
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h1 className="text-2xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Bem-vindo</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Insira seu e-mail e senha para entrar</p>
                            </div>

                            <ComponentsAuthLoginForm />

                            <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">Ou</span>
                            </div>
                            <div className="mb-10 md:mb-[60px]">
                                <ul className="flex justify-center gap-3.5 text-white">
                                    <li>
                                        <GoogleSignInButton />
                                    </li>
                                    <li>
                                        <GithubSignInButton />
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center dark:text-white">
                                Não tem uma conta ?&nbsp;
                                <Link href="/auth/cover-register" className="text-primary underline transition hover:text-black dark:hover:text-white">
                                    Cadastre-se
                                </Link>
                            </div>
                        </div>
                        <p className="absolute bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()}.EduQ Todos os direitos reservados.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoverLogin;
