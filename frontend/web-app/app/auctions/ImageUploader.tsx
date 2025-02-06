import React, { ChangeEvent } from 'react'
import toast from 'react-hot-toast'
import { FiTrash, FiUpload } from 'react-icons/fi'
import { deleteImage, handleUploadImage } from '../actions/auctionActions';
import Image from 'next/image';
import { useImageStore } from '@/hooks/useImageStore';

export type ImageProps = {
    uid: string
    name: string
    previewUrl: string
    url: string
}

export default function ImageUploader() {    
    const auctionImages = useImageStore(state => state.auctionImages)
    const setSearchValue = useImageStore(state => state.setSearchValue)

    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]){
            const image = e.target.files[0]
            
            if (image.size > 1048576) {
                toast.error("Envie uma imagem menor que 1MB!");
                return;
            }

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                const result = await handleUploadImage(e.target.files[0])
                if (result !== undefined){
                    setSearchValue([...auctionImages, result])
                } else {
                    toast.error("Erro ao salvar sua imagem, tente novamente.")
                }
            } else {
                toast.error("Envie uma imagem jgeg ou png!")
            }
        }
    }
    
    async function handleDeleteImage(item: ImageProps) {
        const imagePath = `images/${item.uid}/${item.name}`
        try {
            await deleteImage(imagePath)
            console.log(auctionImages)
            const newImages = auctionImages.filter((Filtered) => Filtered.url !== item.url)
            setSearchValue(newImages) // Atualiza diretamente o Zustand
        } catch (err) {
            throw err
        }
    }

    return (
    <div className='w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2'>
        <button className='border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48'>
            <div className='absolute cursor-pointer'>
                <FiUpload size={30} color='#000'/>
            </div>
            <div className='cursor-pointer'>
                <input type='file' accept="image/*" className='opacity-0 cursor-pointer' onChange={handleFile}/>
            </div>
        </button>

        {auctionImages.map( item => (
            <div key={item.name} className='w-full h-32 flex items-center justify-center relative'>
                <button className='absolute' onClick={() => handleDeleteImage(item)}>
                    <FiTrash size={28} color="FFF"/>
                </button>
                <Image
                    src={item.url}
                    className='rounded-lg w-full h-32 object-cover'
                    alt="foto do item"
                    width={100}
                    height={100}
                />
            </div>
        ))}
    </div>
    )
}
