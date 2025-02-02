"use client"

import { Button } from 'flowbite-react';
import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Input from '../components/input';

export default function AuctionForm() {
    const {control, handleSubmit, setFocus, formState: {isSubmitting, isValid, isDirty, errors}} = useForm({
        mode: 'onTouched'
    });

    function onSubmit(data: FieldValues) {
        console.log(data);
    }

    useEffect(() => {
        setFocus('make')
    }, [setFocus])

    return (
        <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
            <Input label='Fabricante' name='make' control={control} rules={{required: 'Informe o fabricante'}}/>
            <Input label='Modelo' name='model' control={control} rules={{required: 'Informe o modelo'}}/>
            <Input label='Cor' name='color' control={control} rules={{required: 'Informe a cor do veículo'}}/>

            <div className='grid grid-cols-2 gap-3'>
                <Input label='Ano' type='number' name='year' control={control} rules={{required: 'Informe o ano do veículo'}}/>
                <Input label='Kilometragem' name='mileage' type='number' control={control} rules={{required: 'Informe o ano do veículo'}}/>
            </div>

            <Input label='Imagem' name='imageUrl' control={control} rules={{required: 'é necessário enviar uma imagem'}}/>

            <div className='grid grid-cols-2 gap-3'>
                <Input label='Preço minimo' type='number' name='reservePrice' control={control} rules={{required: 'Informe um valor minimo ou 0 para lances livres'}}/>
                <Input label='Auction end date/time' name='auctionEnd' type='date' control={control} rules={{required: 'Informe a data de fim do leilao'}}/>
            </div>

            <div className='flex justify-between'>
                <Button outline color='gray'>Cancel</Button>
                <Button 
                    isProcessing={isSubmitting} 
                    outline 
                    color='success' 
                    disabled={!isValid}
                    type='submit'
                >
                    Submit
                </Button>
            </div>
        </form>
    )
}
