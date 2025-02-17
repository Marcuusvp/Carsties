'use server'


import { Auction, Bid, PagedResult } from "@/types";
import { revalidatePath } from "next/cache";
import { FieldValues } from "react-hook-form";
import { getCurrentUser } from "./authActions";
import {v4 as uuidV4} from "uuid"
import { storage } from "../services/firebaseConnection"; 
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { ImageProps } from "../auctions/ImageUploader";
import { fetchWrapper } from "../lib/fetchWrapper";

export async function getData(query: string): Promise<PagedResult<Auction>> {
    return await fetchWrapper.get(`search${query}`)
}

export async function updateAuctionTest(){
    const data = {
        mileage: Math.floor(Math.random() * 10000) + 1,
    }
    console.log('chamou')
    return await fetchWrapper.put('auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c', data);
}

export async function createAuction(data:FieldValues) {
    return await fetchWrapper.post('auctions', data);
}

export async function getDetailedViewData(id: string): Promise<Auction> {
    return await fetchWrapper.get(`auctions/${id}`);
}

export async function updateAuction(data: FieldValues, id: string){
    const res = await fetchWrapper.put(`auctions/${id}`, data)
    revalidatePath(`/auctions/${id}`)
    return res;
}

export async function deleteAuction(id: string){
    return await fetchWrapper.del(`auctions/${id}`)
}

export async function handleUploadImage(image: File): Promise<ImageProps | undefined> {
    const user = await getCurrentUser();
    if (!user?.username) {
      return;
    }
    
    const usuario = user.username;
    const idImage = uuidV4();
    const uploadRef = ref(storage, `images/${usuario}/${idImage}`);
    
    try {
      // Faz o upload e aguarda a conclusão
      const snapshot = await uploadBytes(uploadRef, image);
      // Obtém a URL de download aguardando o resultado
      const downloadUrl = await getDownloadURL(snapshot.ref);
      
      const imageItem: ImageProps = {
        name: idImage,
        uid: usuario,
        previewUrl: URL.createObjectURL(image),
        url: downloadUrl,
      };
      
      // Retorna o objeto imageItem para quem chamou a função
      return imageItem;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      // Opcional: trate o erro ou retorne um valor padrão
    }
  }

  export async function deleteImage(url : string) {
    const imageRef = ref(storage, url)

    try {
      await deleteObject(imageRef)
    } catch (err) {
      console.log(err)
    }
  }

  export async function getBidsForAuction(id: string): Promise<Bid[]> {
    return await fetchWrapper.get(`bids/${id}`)
  }

  export async function placedBidForAuction(auctionId: string, amount: number){
    return await fetchWrapper.post(`bids?auctionId=${auctionId}&amount=${amount}`, {})
  }