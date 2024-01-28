import { React, useEffect, useState } from  'react'
import { useLocation } from 'react-router-dom'  
import DashSideBar from '../components/DashSideBar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';

function Dashboard() {
  const location = new useLocation();
  const [tab, setTab] = useState('');
  useEffect( () => {
      const urlParams = new URLSearchParams(location.search);
      const tabFormUrl =  urlParams.get('tab');
      if ( tabFormUrl ){
        setTab(tabFormUrl);
      }
  },[ location.search ]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'  >
      {/* sidebar */}
      <div className=" md:w-56">
        <DashSideBar />
      </div>
      {/* Profile */}
      { tab === 'profile' && <DashProfile /> }

      {/* posts */}
      { tab === 'posts' && <DashPosts /> }

    </div>
  )
}

export default Dashboard ;