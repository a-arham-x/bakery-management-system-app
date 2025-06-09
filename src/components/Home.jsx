import React, { useEffect } from 'react'
import About from './About'
import Products from './Products'
import Contact from './Contact'
import { useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/user/home")
        }
    }, [])
    return (
        <div>
            <section id="hero">
                <h1 className='home-header'>XYZ Bakers</h1>
                <div className="home-row">
                    <img src={require("./assets/bakery-chef.png")} alt="" />
                    <div className="home-text-container">
                        <img src={require("./assets/cake.png")} alt="" />
                        <div className="home-text">
                            Welcome to XYZ Bakers – where quality rises and expectations crumble like fresh pastry.
                            From handmade delights to oven-fresh classics, we blend tradition with a dash of innovation.
                            Taste the care. Savor the craft.
                        </div>
                    </div>
                </div>
            </section>
            <About />
            <Products />
            <Contact />
        </div>
    )
}

export default Home
