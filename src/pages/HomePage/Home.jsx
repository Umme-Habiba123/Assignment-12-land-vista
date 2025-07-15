import React from 'react';
import Banner from './Banner/Banner';
import AdvertisementSection from './AdvertisementSection/AdvertisementSection';
import TopAgents from './TopAgents/TopAgents';
import ProjectsShowcase from './ProjectsShowcase/ProjectsShowcase';
import LatestReviews from './LatestReview/LatestReview';

const Home = () => {
    return (
        <div>
          
            <Banner></Banner>
            <AdvertisementSection></AdvertisementSection>
            <ProjectsShowcase></ProjectsShowcase>
            <LatestReviews></LatestReviews>
            <TopAgents></TopAgents>
           
            
        </div>
    );
};

export default Home;