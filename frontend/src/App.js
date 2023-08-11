import React, { Component, useEffect, useState } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Admin/Sidebar/Sidebar';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import Sale from './components/Admin/Sale/Sale';
import BagSale from './components/Admin/Sale/BagSale';
import Additem from './components/Admin/Add-Item/Additem';
import Billing from './components/Admin/Billing/Billing';
import ListBilling from './components/Admin/Billing/ListBill';
import Itemlist from './components/Admin/Add-Item/Itemlist';
import GstSale from './components/Admin/GstSale/GstSale';
import SaleList from './components/Admin/Sale/SaleList';
import AddAccount from './components/Admin/GstSale/AddAccount';
import AddAccountList from './components/Admin/GstSale/AddAccountList';
import GstSaleList from './components/Admin/GstSale/GstSaleList';
import EditItem from './components/Admin/Add-Item/EditItem';
import EditAccount from './components/Admin/GstSale/EditAccount';
import EditSale from './components/Admin/Sale/EditSale';
import GSTBillList from './components/Admin/GstSale/GSTBilling/GSTLIstBill';
import GSTBill from './components/Admin/GstSale/GSTBilling/GSTBill';
import Purchasetransaction from './components/Admin/Transaction/Purchasetransaction';
import Login from './login/Login';
import Signup from './components/Admin/Signup/Signup';

import SaleHistory from './components/Admin/Transaction/SaleHistory';
import GSTSalehistory from './components/Admin/Transaction/GSTSaleHistory';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AddUnit from './components/Admin/UnitSale/AddUnit';
import UnitList from './components/Admin/UnitSale/UnitList';
import UnitHistory from './components/Admin/Transaction/UnitHistory';
import EditUnit from './components/Admin/UnitSale/Editunit';
import BagSaleList from './components/Admin/Sale/BagSaleList';
import UnitBilling from './components/Admin/Unitbilling/unitbilling';
import EditUnitSale from './components/Admin/Sale/EditUnitSale';
import GstUnitSale from './components/Admin/GstSale/GStUnitSale/gstunitsale';
import GstBagSaleList from './components/Admin/GstSale/GStUnitSale/gstUnitSaleList';
import GSTUnitBilling from './components/Admin/Unitbilling/gstunitbilling';
import BagSaleHistory from './components/Admin/Transaction/Bagsalehistory';
import GstEditSale from './components/Admin/GstSale/editgstsale';
import GstUnitEditSale from './components/Admin/GstSale/GStUnitSale/editgstunitsale';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, []);

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="" />;
  };


  return (
    <div className="App">

<ToastContainer position="top-center" />
      <Routes>
        
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/dashboard' element={<PrivateRoute><Sidebar><Dashboard /></Sidebar></PrivateRoute>} />
        <Route path='/sale' element={<PrivateRoute><Sidebar><Sale /></Sidebar></PrivateRoute>} />
        <Route path='/salelist' element={<PrivateRoute><Sidebar><SaleList /></Sidebar></PrivateRoute>} />
        <Route path='/unitsale' element={<PrivateRoute><Sidebar><BagSale/></Sidebar></PrivateRoute>} />
        <Route path='/editsale/:id' element={<PrivateRoute><Sidebar><EditSale /></Sidebar></PrivateRoute>} />
        <Route path='/editunitsale/:id' element={<PrivateRoute><Sidebar><EditUnitSale /></Sidebar></PrivateRoute>} />
        <Route path='/additem' element={<PrivateRoute><Sidebar><Additem /></Sidebar></PrivateRoute>} />
        <Route path='/addunit' element={<PrivateRoute><Sidebar><AddUnit/></Sidebar></PrivateRoute>} />
        <Route path='/unitlist' element={<PrivateRoute><Sidebar><UnitList/></Sidebar></PrivateRoute>} />
        <Route path='/editunit/:id' element={<PrivateRoute><Sidebar><EditUnit/></Sidebar></PrivateRoute>} />
        <Route path='/edititem/:id' element={<PrivateRoute><Sidebar><EditItem /></Sidebar></PrivateRoute>} />
        <Route path='/itemlist' element={<PrivateRoute><Sidebar><Itemlist /></Sidebar></PrivateRoute>} />
        <Route path='/gstsale' element={<PrivateRoute><Sidebar><GstSale /></Sidebar></PrivateRoute>} />
        <Route path='/gstunitsalelist' element={<PrivateRoute><Sidebar><GstBagSaleList/></Sidebar></PrivateRoute>} />
        <Route path='/gstunitsale' element={<PrivateRoute><Sidebar><GstUnitSale/></Sidebar></PrivateRoute>} />
        <Route path='/gstsale-list' element={<PrivateRoute><Sidebar><GstSaleList /></Sidebar></PrivateRoute>} />
        <Route path='/addaccount' element={<PrivateRoute><Sidebar><AddAccount /></Sidebar></PrivateRoute>} />
        <Route path='/editaccount/:id' element={<PrivateRoute><Sidebar><EditAccount /></Sidebar></PrivateRoute>} />
        <Route path='/addaccount-list' element={<PrivateRoute><Sidebar><AddAccountList /></Sidebar></PrivateRoute>} />
        <Route path='/billing/:id' element={<PrivateRoute><Sidebar><Billing /></Sidebar></PrivateRoute>} />
        <Route path='/billlist' element={<PrivateRoute><Sidebar><ListBilling /></Sidebar></PrivateRoute>} />
        <Route path='/gstbilllist' element={<PrivateRoute><Sidebar><GSTBillList /></Sidebar></PrivateRoute>} />
        <Route path='/gstbill/:id' element={<PrivateRoute><Sidebar><GSTBill /></Sidebar></PrivateRoute>} />
        <Route path='/editgstsale/:id' element={<PrivateRoute><Sidebar><GstEditSale /></Sidebar></PrivateRoute>} />
        <Route path='/signup' element={<PrivateRoute><Sidebar><Signup /></Sidebar></PrivateRoute>} />
        <Route path='/purchasehistory' element={<PrivateRoute><Sidebar><Purchasetransaction/></Sidebar></PrivateRoute>} />
        <Route path='/salehistory' element={<PrivateRoute><Sidebar><SaleHistory/></Sidebar></PrivateRoute>} />
        <Route path='/gstsalehistory' element={<PrivateRoute><Sidebar><GSTSalehistory/></Sidebar></PrivateRoute>} />
        <Route path='/unithistory' element={<PrivateRoute><Sidebar><UnitHistory/></Sidebar></PrivateRoute>} />
        <Route path='/unitsalelist' element={<PrivateRoute><Sidebar><BagSaleList/></Sidebar></PrivateRoute>} />
        <Route path='/gstunitbilling/:id' element={<PrivateRoute><Sidebar><GSTUnitBilling/></Sidebar></PrivateRoute>} />
        <Route path='/unitbilling/:id' element={<PrivateRoute><Sidebar><UnitBilling/></Sidebar></PrivateRoute>} />
        <Route path='/unitsalehistory' element={<PrivateRoute><Sidebar><BagSaleHistory/></Sidebar></PrivateRoute>} />
    
        <Route path='/editgstunitsale/:id' element={<PrivateRoute><Sidebar><GstUnitEditSale/></Sidebar></PrivateRoute>} />

        
      </Routes>

    </div>
  );
}

export default App;
