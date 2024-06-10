'use client'

// import { signIn } from 'next-auth/react'
import IconGoogle from '@/components/icon/icon-google';

const GoogleSignInButton = () => {

  const handleSignIn = async () => {
    const result = await signIn('google', { callbackUrl: '/' });
    if (result?.error) {
        console.error("Erro ao fazer login:", result.error);
    }
}

  return (
    <button
      onClick={handleSignIn}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
      style={{ background: 'linear-gradient(135deg, rgba(245, 166, 12, 1) 0%, rgba(245, 166, 100, 1) 100%)' }}
    >
    <IconGoogle />
    </button>
  )
}

export default GoogleSignInButton