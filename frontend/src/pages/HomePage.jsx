import React from 'react'
import Header from "../components/Layout/Header";
import Hero from "../components/Home/Hero/Hero";
import Categories from "../components/Home/Categories/Categories";
import BestDeals from "../components/Home/BestDeals/BestDeals";
import Featureproduct from "../components/Home/Featureproduct/Featureproduct";
import Events from "../components/Home/Events/Events";
import Sponsored from "../components/Home/Sponsored";
import Footer from "../components/Layout/Footer";



const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1}/>
        <Hero/>
        <Categories/>
        <BestDeals/>
        <Events/>
        <Featureproduct/>
        <Sponsored/>
        <Footer/>
    </div>
  )
}

export default HomePage