import React from 'react'
import DonationCard from './DonationCard'

export default function DonationList({donations, editDonation, deleteDonation, ...props}) {
    const listData=(donations || []).map((item, index)=>{
        return <DonationCard data={item} key={index} editDonation={editDonation} deleteDonation={deleteDonation} />
    })

  return (
    <div className='donation-list'>
        {listData}
    </div>
  )
}
