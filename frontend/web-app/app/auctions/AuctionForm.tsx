"use client"

import { Button, TextInput } from 'flowbite-react';
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Input from '../components/input';

export default function AuctionForm() {
    const {control, handleSubmit, setFocus, formState: {isSubmitting, isValid, isDirty, errors}} = useForm();

    function onSubmit(data: FieldValues) {
        console.log(data);
    }

    return (
        <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
            <Input label='Fabricante' name='make' control={control} rules={{required: 'Informe o fabricante'}}/>
            <Input label='Modelo' name='model' control={control} rules={{required: 'Informe o modelo'}}/>
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
