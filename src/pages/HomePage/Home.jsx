import React from 'react';
import Banner from './Banner/Banner';
import AdvertisementSection from './AdvertisementSection/AdvertisementSection';
import TopAgents from './TopAgents/TopAgents';
import ProjectsShowcase from './ProjectsShowcase/ProjectsShowcase';
import LatestReviews from './LatestReview/LatestReview';
import { Helmet } from 'react-helmet';
import NewsSection from './NewsSection/NewsSection';
import ExpandingSection from './Expandingsection/Expandingsection';
import BookingContactSection from './BookingContactSection/BookingContactSection';
import SalesSection from './SalesSection/SalesSection';
import PropertyDetails from './PropertyDetails/PropertyDetails';
import FAQ from './FAQ/FAQ';
import HomeGallery from './HomeGallery/HomeGallery';

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
            <HomeGallery></HomeGallery>
            <PropertyDetails></PropertyDetails>
            <NewsSection></NewsSection>
            <LatestReviews></LatestReviews>
            <SalesSection></SalesSection>
            <FAQ></FAQ>
            <ExpandingSection></ExpandingSection>         
            <TopAgents></TopAgents>
              <BookingContactSection></BookingContactSection>


        </div>
    );
};

export default Home;