import React from 'react';
import Banner from './Banner/Banner';
import AdvertisementSection from './AdvertisementSection/AdvertisementSection';
import TopAgents from './TopAgents/TopAgents';
import ProjectsShowcase from './ProjectsShowcase/ProjectsShowcase';
import LatestReviews from './LatestReview/LatestReview';
import { Helmet } from 'react-helmet';
import NewsSection from './NewsSection/NewsSection';
import NewsDetail from './NewsSection/NewsDetails/NewsDetails';
import ExpandingSection from './Expandingsection/Expandingsection';
import BookingContactSection from './BookingContactSection/BookingContactSection';
import SalesSection from './SalesSection/SalesSection';

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
            <NewsSection>
            </NewsSection>
            <LatestReviews></LatestReviews>
            <SalesSection></SalesSection>
            <ExpandingSection></ExpandingSection>         
            <TopAgents></TopAgents>
              <BookingContactSection></BookingContactSection>


        </div>
    );
};

export default Home;