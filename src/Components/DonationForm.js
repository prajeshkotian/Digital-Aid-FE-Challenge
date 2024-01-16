import React, { useEffect, useState } from 'react'
import { Modal, Input, Space, DatePicker, Select, message } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import ShortUniqueId from 'short-unique-id';
import _ from 'lodash'

const uid = new ShortUniqueId({ length: 10 });


function DonationForm({showDonationModal, addDonation, setShowDonationModal, selectedDonation, updateDonation, setSelectedDonation, typeOptions, ...props}) {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(0)
    const [type, setType] = useState(null)
    const [date, setDate] = useState(null)
    const [id, setId] = useState(null)

    useEffect(()=>{
        setName(selectedDonation?.name)
        setAmount(selectedDonation?.amount)
        setId(selectedDonation?.id)
        setType(selectedDonation?.type)
        setDate(selectedDonation?.date)
    },[selectedDonation])

    //fn to submit form
    const onSubmit=()=>{
        if(!name){
            message.warning('Please enter valid name')
            return
        }
        if(!amount || amount == 0){
            message.warning('Please enter valid amount')
            return
        }
        if(!type){
            message.warning('Please select valid type')
            return
        }
        if(!date){
            message.warning('Please enter valid date')
            return
        }
        const donationObj={
            id: id || uid.rnd(),
            name: name,
            type: type,
            amount: amount,
            date: date
        }
        if(_.isEmpty(selectedDonation))
            addDonation(donationObj)
        else
            updateDonation(donationObj)
        setSelectedDonation({})
        setShowDonationModal(false)
    }

    //fn to close modal
    const onCancel=()=>{
        setShowDonationModal(false)
        setSelectedDonation({})
    }
  return (
    <div className='donation-form'>
      <Modal open={showDonationModal} title='Donation Form' onOk={onSubmit} onCancel={onCancel}>
        <div className='input-form'>
            <Space direction='vertical' style={{width: '100%'}}>
                <label>Name</label>
                <Input type='string' onChange={(e)=>{setName(e?.target?.value)}} placeholder='Enter Name' value={name} required/>
                <label>Type</label>
                <Select options={typeOptions || []} onSelect={(value)=>setType(value)} placeholder='Select Type' value={type}/>
                <label>Amount</label>
                <Input type='number' prefix={<DollarOutlined />} placeholder='Enter Amount' onChange={(e)=>setAmount(e?.target?.value)} value={amount} required/>
                <label>Date</label>
                <DatePicker onChange={(date)=>setDate(date)} value={date} />
            </Space>
        </div>
      </Modal>
    </div>
  )
}

export default DonationForm

