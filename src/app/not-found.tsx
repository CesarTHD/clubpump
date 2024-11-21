// app/not-found.tsx
"use client";
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className='flex flex-col w-full h-96 items-center justify-center text-center bg-[#f8f9fa] text-[#212529]'>
      <h1 className='text-3xl font-bold my-8'>404 - Página não encontrada</h1>
      <p className='text-xl'>
        Opa! Parece que você tentou acessar uma página que não existe.
      </p>
      <button
        className='mt-12 px-8 py-2 text-lg font-bold bg-blue-500 text-white rounded-lg hover:bg-blue-600'
        onClick={() => router.push('/home')}
      >
        Voltar para a Home
      </button>
    </div>
  );
}