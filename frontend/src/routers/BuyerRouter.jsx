import React from 'react'
import UpdateProfile from '../components/Buyer/UpdateProfile';
import { Route, Routes } from "react-router-dom";
import PropertyDetailsId from '../components/Buyer/PropertyDetailsId';
import QRScanner from '../components/Buyer/QRScanner';
import FilterAndProperties from '../components/Buyer/FilterAndProperties';
import VirtualTour from '../components/Buyer/VirtualTour';
import FavoriteProperties from '../components/Buyer/FavouriteProperties';
import PaymentSuccess from '../components/Buyer/PaymentSuccess';
import CancelPayment from '../components/Buyer/CancelPayment';
// import VirtualTour from '../components/Buyer/VirtualTour';


const BuyerRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/qrcodescanner/:id" element={<QRScanner />} />
        {/* <Route path="/virtualtour/:id" element={<VirtualTour />} /> */}
        <Route path="/property/:id" element={<PropertyDetailsId />} />
        <Route path="/filterproperties" element={<FilterAndProperties />} />
        <Route path="/virtualtour/:id" element={<VirtualTour />} />
        <Route path="/favourite" element={<FavoriteProperties />} />
        <Route path="/success/:sellerId" element={<PaymentSuccess />} />
        <Route path="/cancel" element={<CancelPayment />} />
      </Routes>
    </div>
  );
}

export default BuyerRouter