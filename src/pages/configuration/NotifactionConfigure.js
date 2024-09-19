import React from 'react';
import '../../components/configure/CustomCheckBox.css'
import CustomNotificationCheckbox from '../../components/configure/CustomCheckbox';
import CustomSoundCheckbox from '../../components/configure/CustomSoundCheckbox';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";
const NotifactionConfigure = () => {
    return (
        <div className="popup-container ">
            <div className="main-navbar h-16 flex items-center gap-4">
                <div className=''>
                    <Link to='/main'>
                    <BsArrowLeft className='text-white text-xl ml-4'/>
                    </Link>
                </div>
                <div className='w-full'>
                    <h1 className='text-md text-white text-start'>Configure</h1>
                </div>
            </div>
            <div className='flex flex-col space-y-4 mt-4'>
            <div className=" flex items-center justify-between p-4 w-3/4 mx-auto h-16 bg-white ">
                <p className='text-start' style={{color:'#E2136E '}}>Notification</p>
                <CustomNotificationCheckbox/>
            </div>
            <div className=" flex items-center justify-between p-4 w-3/4 mx-auto h-16 bg-white ">
                <p className='text-start' style={{color:'#E2136E '}}>Sound</p>
                <CustomSoundCheckbox/>
            </div>
            </div> 
        </div>
    );
};

export default NotifactionConfigure;