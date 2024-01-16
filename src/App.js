import './App.css';
import { PlusSquareOutlined, FilterOutlined} from '@ant-design/icons';
import DonationList from './Components/DisplayComponents/DonationList';
import { useEffect, useState } from 'react';
import DonationForm from './Components/DonationForm';
import DeleteModal from './Components/DisplayComponents/DeleteModal';
import { Empty, Dropdown, Button, message } from 'antd';
import _ from 'lodash'
import StatisticsModal from './Components/DisplayComponents/StatisticsModal';

const typeOptions=[
  {
      label: 'Money',
      value: 'Money'
  },
  {
      label: 'Clothes',
      value: 'Clothes'
  },
  {
      label: 'Food',
      value: 'Food'
  }
]

const items=[
  {
    label: "Money",
    key: 'Money'
  },
  {
    label: "Clothes",
    key: 'Clothes'
  },
  {
    label: "Food",
    key: 'Food'
  },
  {
    label: "None",
    key: "None"
  }
]

function App() {
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [donations, setDonations] = useState([])
  const [selectedDonation, setSelectedDonation] = useState({})
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [filteredDonations, setFilteredDonations] = useState([])
  const [showStatisticsModal, setShowStatisticsModal] = useState(false)


  //let filteredDonations = []

  useEffect(()=>{
    if(selectedFilter !== 'None'){
      const donationList = (donations || []).filter(item=>{
        if(item.type === selectedFilter){
          return item
        }
      })
      setFilteredDonations([...donationList])
      console.log(filteredDonations,'filteredDonations')
    }
  },[selectedFilter])

  const addDonation=(donation)=>{
    if(donation){
      setDonations([...donations, donation])
      message.success('Donation added')
    }else{
      message.error('Donation not added some error occured!')
    }
  }

  //fn to set flag for editModal
  const editDonation=(donation)=>{
    setSelectedDonation(donation)
    setShowDonationModal(true)
  }

  //fn to set flag for deleteModal
  const deleteDonation=(donation)=>{
    setSelectedDonation(donation)
    setShowDeleteModal(true)
  }

  //fn to find and delete a donation
  const onDeleteDonation=(donation)=>{
    if(donation){
      const updatedDonations= (donations || []).filter(item=>{
         if(item.id !== donation.id){
           return item
         }
       })
       setDonations(updatedDonations)
       setShowDeleteModal(false)
       setSelectedDonation({})
       message.success('Donation deleted')
     }else{
      message.error('Donation not found error!!')
     }
  }


  //fn to find selected donation and update details 
  const updateDonation=(donation)=>{
    if(donation){
     const updatedDonations= (donations || []).map(item=>{
        if(item.id === donation.id){
          item={...donation}
        }
        return item
      })
      setDonations(updatedDonations)
      message.success('Donation updated')
    }else{
      message.error('Donation could not be updated!')
    }
  }

  const onSelectFilter=({key})=>{
    if(key !== 'None')
      setSelectedFilter(key)
    else{
      setSelectedFilter(null)
      message.success('Filter has been cleared')
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='header'>
          <label>Donations</label>
          <div className='header-icons'>
            <Dropdown menu={{items, selectable: true, onSelect: onSelectFilter, selectedKeys: [selectedFilter]}} trigger={['click']}><FilterOutlined style={{fontSize: '28px'}}/></Dropdown>
            <PlusSquareOutlined onClick={()=>setShowDonationModal(true)} style={{fontSize: '28px'}} />
            <Button onClick={()=>setShowStatisticsModal(true)}>View Statistics</Button>
          </div>
          
        </div>
          {_.isEmpty(selectedFilter ? filteredDonations : donations) ? 
          <Empty 
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            description='No donations made yet. Hit the plus icon to get started!!!'
            /> : <DonationList donations={selectedFilter ? filteredDonations : donations} editDonation={editDonation} deleteDonation={deleteDonation} />}
          {showDonationModal ? <DonationForm showDonationModal={showDonationModal} addDonation={addDonation} setShowDonationModal={setShowDonationModal} selectedDonation={selectedDonation} updateDonation={updateDonation} setSelectedDonation={setSelectedDonation} typeOptions={typeOptions}/> : null}
          {showDeleteModal ? <DeleteModal showDeleteModal={showDeleteModal} title='Delete Donation' content={selectedDonation} onDeleteDonation={onDeleteDonation} setShowDeleteModal={setShowDeleteModal} /> : null}
          {showStatisticsModal ? <StatisticsModal showStatisticsModal={showStatisticsModal} donations={selectedFilter ? filteredDonations : donations} setShowStatisticsModal={setShowStatisticsModal} selectedFilter={selectedFilter}/> : null}
      </header>
    </div>
  );
}

export default App;
