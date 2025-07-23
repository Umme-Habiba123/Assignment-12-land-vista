import React from 'react';
import Banner from './Banner/Banner';
import AdvertisementSection from './AdvertisementSection/AdvertisementSection';
import TopAgents from './TopAgents/TopAgents';
import ProjectsShowcase from './ProjectsShowcase/ProjectsShowcase';
import LatestReviews from './LatestReview/LatestReview';
import { Helmet } from 'react-helmet';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | LandVista</title>
                <meta name="description" content="Nested component" />
            </Helmet>




            <Banner></Banner>
            <AdvertisementSection></AdvertisementSection>
            <ProjectsShowcase></ProjectsShowcase>
            <LatestReviews></LatestReviews>
            <TopAgents></TopAgents>


        </div>
    );
};

export default Home;