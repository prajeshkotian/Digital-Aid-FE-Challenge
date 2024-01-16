import { Modal } from 'antd'
import React from 'react'

export default function DeleteModal({title, content, showDeleteModal, onDeleteDonation, setShowDeleteModal, ...props}) {
    const handleOk=(data)=>{
        onDeleteDonation(data)
    }

    const handleCancel=()=>{
        setShowDeleteModal(false)
    }


  return (
    <div className='delete-modal'>
      <Modal title={title} open={showDeleteModal} onOk={()=>handleOk(content)} onCancel={handleCancel}>
        {'Do you want to delete donation '}
        {' Done by: '+ content.name}
        {' Type: '+ content.type}
        {' Amount: '+content.amount}
      </Modal>
    </div>
  )
}
