import React from "react";
import Navbar from "./Navbar";
import Aboutus from "./Aboutus";
import Features from "./Features";
import Contactus from "./Contactus";
import Footer from "./Footer";
import CarouselSlider from "./CarouselSlider";

const Homepage= () => {
    return (
        <div>
            <CarouselSlider/>
            <Aboutus />
            <Features/>
            <Contactus/>
        </div>



    );
};

export default Homepage;