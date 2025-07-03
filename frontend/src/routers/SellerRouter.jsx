import React from 'react'
import SellerUpdateProfile from '../components/Seller/SellerUpdateProfile';
import { Route, Routes} from "react-router-dom";
import AddProperties from '../components/Seller/AddProperties';
import ListPropertiesAdded from '../components/Seller/ListPropertiesAdded';
import SellerDashboard from '../components/Seller/SellerDashboard';

const SellerRouter = () => {
  return (
    <div>
      {" "}
      <Routes>
        <Route path="/dashboard/*" element={<SellerDashboard />} />
        {/* <Route path="/updateprofile" element={<SellerUpdateProfile />} />
        <Route path="/addproperty" element={<AddProperties />} />
        <Route path="/listaddedproperty" element={<ListPropertiesAdded />} /> */}
      </Routes>
      
    </div>
  );
}

export default SellerRouter