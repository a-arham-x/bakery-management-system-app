import React from 'react'

function Footer() {
    return (
        <footer>
            <div className="footer-contact">
                <p>Email: cinema.ticketing.system117@gmail.com</p>
                <p>Phone: 0314-17147714</p>
            </div>
            <div className="company-info">
                © 2025 XYZ Bakers. All rights reserved.
            </div>
            <div className="footer-socials">
                <img src={require("./assets/instagram-logo.png")} alt="" className="social-icon" />
                <img src={require("./assets/facebook-logo.png")} alt="" className="social-icon" />
                <img src={require("./assets/X-logo.png")} alt="" className="social-icon" />
                <img src={require("./assets/linkedin-logo.png")} alt="" className="social-icon" />
                {/* <img src={require("./assets/gmail-logo.png")} alt="" className="social-icon" width=""/> */}
            </div>
        </footer>
    )
}

export default Footer
