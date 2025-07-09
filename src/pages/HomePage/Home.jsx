import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import Banner from './Banner/Banner';
import Footer from '../Shared/Footer/Footer';
import AdvertisementSection from './AdvertisementSection/AdvertisementSection';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <AdvertisementSection></AdvertisementSection>
            <Footer></Footer>
            
        </div>
    );
};

export default Home;