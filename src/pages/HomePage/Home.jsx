import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import Banner from './Banner/Banner';
import Footer from '../Shared/Footer/Footer';
import AdvertisementSection from './AdvertisementSection/AdvertisementSection';
import TopAgents from './TopAgents/TopAgents';
import ProjectsShowcase from './ProjectsShowcase/ProjectsShowcase';
import LatestReviews from './LatestReview/LatestReview';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <AdvertisementSection></AdvertisementSection>
            <ProjectsShowcase></ProjectsShowcase>
            <LatestReviews></LatestReviews>
            <TopAgents></TopAgents>
            <Footer></Footer>
            
        </div>
    );
};

export default Home;