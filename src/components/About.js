import React from 'react';
import "./assets/about.css";

function About() {
    return (
        <section id="about">
            <div className="quality-container">
                <div className="quality">
                    <img src={require("./assets/bakery-1.jpg")} alt="" />
                    <div className="quality-content">
                        <h3 className="quality-heading">Freshness is King</h3>
                        <p className="quality-text">
                            We don’t play around when it comes to freshness. Every product, every bite,
                            every moment is designed to feel like it just dropped. From daily-made batches
                            to seasonal selections, we serve everything crisp, clean, and right on time —
                            because stale is cancelled.
                        </p>
                    </div>

                </div>
                <div className="quality">
                    <img src={require("./assets/bakery-2.jpg")} alt="" />
                    <div className="quality-content">
                        <h3 className="quality-heading">Consistency & Quality</h3>
                        <p className="quality-text">
                            No surprises here — just reliably great stuff, every single time. We believe
                            consistency is the secret ingredient to trust, and we don’t cut corners. Whether
                            it’s your first time or your fiftieth, expect the same top-tier quality you came
                            for.
                        </p>
                    </div>
                </div>
                <div className="quality">
                    <img src={require("./assets/bakery-3.jpg")} alt="" />
                    <div className="quality-content">
                        <h3 className="quality-heading">Clean & Inviting Vibes</h3>
                        <p className="quality-text">
                            Think cozy but curated. Whether you’re stepping in or scrolling through, we keep
                            things clean, bright, and low-key aesthetic. It’s more than a look — it’s a vibe
                            that makes you wanna stay a little longer and come back often.
                        </p>
                    </div>
                </div>
            </div>
            {/* <div className="about-img-container">
                <img className="about-img" src={require("./assets/aboutimage.jpg")} alt="some buns and breads" />
            </div> */}
            {/* <div className="about-company"> */}
            {/* <p className="text company">XYZ Bakeries are one of the best bakeries out in the country.</p>
            <p className="text company">We ensure that you are provided with the best products.</p>
            <p className="text company">The Safety of you and your friends and family are our Number 1 Priority.</p>
            <p className="text company">Our products match the best health standards.</p>
            <p className="text company">So enjoy and have a very nice wonderful day.</p> */}
            {/* <p>About Our Services</p>
                <p className="text services">Easy Ordering</p>
                <p className="text services">You can cancel your order when you want</p>
                <p className="text services">Best Quality Items</p> */}
            {/* </div> */}
            <div className="aboutservices">
            </div>
        </section>
    )
}

export default About;