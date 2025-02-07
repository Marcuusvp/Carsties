"use client"

import { Button } from 'flowbite-react';
import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Input from '../components/input';
import DateInput from '../components/DateInput';
import { createAuction, deleteImage, updateAuction } from '../actions/auctionActions';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast'
import { Auction } from '@/types';
import ImageUploader from './ImageUploader';
import { useImageStore } from '@/hooks/useImageStore';

type Props = {
   auction?: Auction 
}

export default function AuctionForm({auction}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const imgUrl = useImageStore(state => state.auctionImages)
    const resetImages = useImageStore(state => state.reset)
    const {control, handleSubmit, setFocus, reset, formState: {isSubmitting, isValid}, setValue} = useForm({
        mode: 'onTouched',
    });

    async function onSubmit(data: FieldValues) {
        const formData = {
            ...data,
            imageUrl: imgUrl[0]?.url.toString() || ''
        }
        try{
            let id = '';
            let res;
            if(pathname === '/auctions/create'){
                res = await createAuction(formData)
                id = res.id;
            } else {
                if (auction) {
                    res = await updateAuction(data, auction.id)
                    id = auction.id;
                }
            }
            if (res.error) {
                throw res.error;
            }
            resetImages()
            router.push(`/auctions/details/${id}`)
        } catch(error: any) {
            toast.error(error.status + ' ' + error.message)
        }
    }

    async function onCancel()  {
        try {
            reset()
            resetImages()
            imgUrl.map(async (image) => {
                await deleteImage(`images/${image.uid}/${image.name}`)
            })
        } catch {
            toast.error("não foi possível limpar o formulário")
        }
    }

    useEffect(() => {
        if (auction) {
            const {make, model, color, mileage, year} = auction;
            reset({make, model, color, mileage, year})
        }
        setFocus('make')
    }, [setFocus])

    useEffect(() => {
        if (imgUrl.length > 0) {
            setValue('imageUrl', imgUrl[0].url, { 
                shouldValidate: true,
                shouldDirty: true
            })
        } else {
            setValue('imageUrl', '')
        }
    }, [imgUrl, setValue])

    return (
        <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
            <Input label='Fabricante' name='make' control={control} rules={{required: 'Informe o fabricante'}}/>
            <Input label='Modelo' name='model' control={control} rules={{required: 'Informe o modelo'}}/>
            <Input label='Cor' name='color' control={control} rules={{required: 'Informe a cor do veículo'}}/>

            <div className='grid grid-cols-2 gap-3'>
                <Input label='Ano' type='number' name='year' control={control} rules={{required: 'Informe o ano do veículo'}}/>
                <Input label='Kilometragem' name='mileage' type='number' control={control} rules={{required: 'Informe o ano do veículo'}}/>
            </div>

            {pathname === '/auctions/create' && 
                <>
                    <ImageUploader/>
                    <Input label='Imagem' name='imageUrl' control={control} rules={{required: 'é necessário enviar uma imagem'}} disabled={imgUrl.length > 0}/>

                    <div className='grid grid-cols-2 gap-3'>
                        <Input label='Preço minimo' type='number' name='reservePrice' control={control} rules={{required: 'Informe um valor minimo ou 0 para lances livres'}}/>
                        <DateInput 
                            label='Auction end date/time' 
                            name='auctionEnd' 
                            dateFormat='dd MMMM yyyy h:mm a'
                            showTimeSelect
                            control={control} 
                            rules={{required: 'Informe a data de fim do leilao'}}
                            />
                    </div>
                </>            
            }

            <div className='flex justify-between'>
                <Button outline color='gray' onClick={onCancel}>Cancel</Button>
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
