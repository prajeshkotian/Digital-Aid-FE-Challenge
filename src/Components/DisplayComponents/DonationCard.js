import React from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

export default function DonationCard({data, editDonation, deleteDonation, ...props}) {
  return (
    <div className='donation-card'>
        <div className='donation-data'>
            <label>Name: {data.name}</label>
            <label>Amount: {data.amount}$</label>
            <label>Type: {data.type}</label>
        </div>
        <div className='donation-option-btn'>
            <EditOutlined onClick={()=>editDonation(data)} />
            <DeleteOutlined onClick={()=>deleteDonation(data)} />
        </div>
    </div>
  )
}
