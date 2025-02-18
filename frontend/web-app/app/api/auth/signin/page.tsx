import EmptyFilter from '@/app/components/EmptyFilter'
import React from 'react'

export default async function SignIn({ searchParams }: { searchParams: Promise<{ callbackUrl: string }> }) {
  const resolvedSearchParams = await searchParams;

  return (
    <EmptyFilter 
      title="Você precisa estar logado para acessar esta página!"
      subtitle="Por favor clique abaixo para realizar o login"
      showLogin
      callbackUrl={resolvedSearchParams.callbackUrl}
    />
  );
}
