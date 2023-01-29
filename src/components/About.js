import React from 'react';
import "./assets/about.css";

function About() {
    return (
        <>
            <img src={require("./assets/aboutimage.jpg")} alt="some buns and breads" />
            <div className="aboutCompany">
                <p className="company">XYZ Bakeries are one of the best bakeries out in the country.</p>
                <p className="company">We ensure that you are provided with the best products.</p>
                <p className="company">The Safety of you and your friends and family are our Number 1 Priority.</p>
                <p className="company">Our products match the best health standards.</p>
                <p className="company">So enjoy and have a very nice wonderful day.</p>
            </div>
            <div className="aboutservices">
                <p>About Our Services</p>
                <p className="services">Easy Ordering</p>
                <p className="services">You can cancel your order when you want</p>
                <p className="services">Best Quality Items</p>
            </div>
        </>
    )
}

export default About;