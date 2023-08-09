import React, {  useState } from 'react';
import { FaBars, FaTh,FaMoneyBillAlt, } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdCrisisAlert, MdRoomService } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineMeetingRoom , MdOutlineCategory} from 'react-icons/md';
import './sidebar.css';



const Sidebar = ({children}) => {

    const [ isOpen, setIsOpen ] = useState(false);
  const toggle= () => setIsOpen (!isOpen );
  const menuItem = [
 
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />
    },
    {
      path: "/additem",
      name: "Add-Item",
      icon: <SiGoogleclassroom />
    },

    {
      path: "/sale",
      name: "Sale",
      icon: <MdCrisisAlert />
      // icon: <GiDorsalScales />
      // icon: <MdMeetingRoom />
    },
    {
      path: "/billlist",
      name: "Sale Billing",
      icon: < FaMoneyBillAlt />
      // icon: <RiBillFill />
    },
    {
      path: "/addaccount",
      name: "Add-Account",
      icon: <VscAccount />
    },
    {
      path: "/gstsale",
      name: "Gst-Sale",
      icon: <MdRoomService />
    },
    {
      path: "/gstbilllist",
      name: "Gst-Billing",
      icon: <FaMoneyBillAlt  />
    },
    // {
    //   path: "/purchasehistory",
    //   name: "Purchase-History",
    //   icon: <FaMoneyBillAlt  />
    // },

    // {
    //   path: "/salehistory",
    //   name: "Sale-History",
    //   icon: <FaMoneyBillAlt  />
    // },
    // {
    //   path: "/gstsalehistory",
    //   name: "GST Sale-History",
    //   icon: <FaMoneyBillAlt  />
    // },
    {
      path: "/signup",
      name: "Signup",
      icon: <MdOutlineMeetingRoom />
    },
 
]
  return (
    <>
    <div className="container-fluid  ">
      <div style={{width: isOpen ? "200px" : "50px",paddingTop:"20px"}} className='sidebar'>
        <div className='top_section'>
          <p style={{display: isOpen ? "block" : "none"}} className='logo'>
            <span className='dash-title'>Admin</span>
          </p>
          <div style={{marginLeft: isOpen ? "50px" : "15px",paddingTop:"15px"}} className='bars'>
            <FaBars onClick={toggle} />
          </div>
        </div>
        {
          menuItem.map((item,index)=>(
            <Link to={item.path} key={index} className="link" 
            activeclassName="active">
              <div className='icon'> {item.icon}</div>
              <div style={{display: isOpen ? "block" : "none"}}  className='Link_text'>{item.name}</div>
            </Link>
          ))
        }
      </div>
      <main style={{width:"100%",height:"100vh",overflow:"scroll"}}>{children}</main>
    </div>
 
    </>
  )
}

export default Sidebar