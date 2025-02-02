import EmptyFilter from '@/app/components/EmptyFilter'
import React from 'react'

export default function SignIn({searchParams}: {searchParams: {callbackUrl: string}}) {
  return (
    <EmptyFilter 
        title='Voce precisa estar logado para acessar esta pagina!'
        subtitle='Por favor clique abaixo para realizar o login'
        showLogin
        callbackUrl={searchParams.callbackUrl}
    />
  )
}
