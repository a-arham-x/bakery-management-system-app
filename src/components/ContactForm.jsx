import React from 'react'

function ContactForm() {
    return (
        <>
            <form className="form contact-form">
                <h1>Contact <span>us</span></h1>
                <div className="label-container">
                    <label className="form-label" htmlFor="email">
                        Name
                    </label>
                </div>
                <input
                    className="form-input"
                // type="text"
                // value={credentials.email}
                // name="name"
                // id="name"
                // onChange={handleChange}
                />
                <div className="label-container">
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                </div>
                <input
                    className="form-input"
                // type="email"
                // value={credentials.email}
                // name="email"
                // id="email"
                // onChange={handleChange}
                />
                <div className="label-container">
                    <label className="form-label" htmlFor="password">
                        Message
                    </label>
                </div>
                <textarea
                    className="text-area"
                // type={intype}
                // value={credentials.password}
                // name="password"
                // id="password"
                // onChange={handleChange}
                />
                <button className="form-button">
                    Send
                </button>
            </form>
        </>
    )
}

export default ContactForm
