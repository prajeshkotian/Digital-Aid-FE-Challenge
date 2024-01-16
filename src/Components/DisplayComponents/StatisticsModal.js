import { Modal, DatePicker } from 'antd'
import React, { useState } from 'react'
import StatisticCard from './StatisticCard'
const {RangePicker} = DatePicker

const getFilteredDonations=(donations, dateFilter)=>{
    if(dateFilter){
        const startDate = dateFilter?.[0].toDate()
        const endDate = dateFilter?.[1].toDate()
        const newList = (donations || []).filter(item=>{
            const donationDate = (item?.date).toDate()
            if(donationDate >= startDate && donationDate <= endDate)
                return item
        })
        console.log(newList,'newList')
        return newList
    }else{
        return donations
    }
    
}

export default function StatisticsModal({showStatisticsModal, setShowStatisticsModal, donations, selectedFilter, ...props}) {

    const [dateFilter, setDateFilter] = useState(null)

    const filteredDonationList = getFilteredDonations(donations, dateFilter)

    const handleCancel=()=>{
        setShowStatisticsModal(false)
    }

    const totalDonationSum = (filteredDonationList || []).reduce((sum, curr)=>{
        return sum + parseInt(curr.amount)
    },0)

    const totalDonations = filteredDonationList.length
    let maxDonation = filteredDonationList[0];
    (filteredDonationList || []).forEach((item)=>{
        if(maxDonation.amount < item.amount)
            maxDonation = {...item}
    });

    const onDateChange=(value)=>{
        setDateFilter(value)
    }

  return (
    <div className='stats-modal'>
      <Modal open={showStatisticsModal} onCancel={handleCancel} footer={null} title={selectedFilter ? "Statistics for "+selectedFilter : "Total Statistics"}>
        <div className='range-picker'>
            <RangePicker onChange={onDateChange}/>
        </div>
        <StatisticCard totalDonations={totalDonations} totalDonationSum={totalDonationSum} maxDonation={maxDonation} />
      </Modal>
    </div>
  )
}
