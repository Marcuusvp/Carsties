import { getDetailedViewData } from '@/app/actions/auctionActions'
import Heading from '@/app/components/Heading'
import React from 'react'
import CountdownTimer from '../../CountdownTimer'
import CarImage from '../../CarImage'
import DetailedSpecs from './DetailedSpecs'


export default async function Details({params}: {params: {id: string}}) {
  const { id } = await params;
  const data = await getDetailedViewData(id)


  return (
    <div>
      <div className='flex justify-between'>
        <Heading title={`${data.make} ${data.model}`} subtitle={''} />
        <div className='flex gap-3'>
          <h3 className='text-2xl font-semibold'>Time remaining</h3>
          <CountdownTimer auctionEnd={data.auctionEnd} />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6 mt-3'>
        <div className='w-full bg-gray-200 relative aspect-[4/3] rounded-ls overflow-hidden'>
          <CarImage imageUrl={data.imageUrl} make={''} model={''} color={''}/>
        </div>

        <div className='border-2 rounded-lg p-2 bg-gray-100'>
          <Heading title='Bids' />
        </div>
      </div>

      <div className='mt-3 grid grid-cols-1 rounded-lg'>
        <DetailedSpecs auction={data} />
      </div>
    </div>
  )
}