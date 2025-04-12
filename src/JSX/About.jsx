import React from "react";
import "../CSS/About.css";
import Anhabout from '../assets/anh/about.jpg'
import Tien from '../assets/anh/tien.jpg'
const About = () => {
    return (
        <div className="aboutus">
            <div className="all-title-box">
                <div className="container10">
                    <div className="row10">
                        <div className="c10">
                            <h2>ABOUT US</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="#">SHOP</a>
                                </li>
                                <li className="breadcrumb-itemactive">/ ABOUT US</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>




            <div className="about-box-main">
                <div className="container20">
                    <div className="row20">
                        <div className="c20">
                            <div className="banner-frame">
                                <img className="img-fluid" src={Anhabout} />
                            </div>
                        </div>
                        <div className="c20">
                            <h2 className="noo-sh-title-top">
                                We are <span>HusGarden</span>
                            </h2>
                            <p>
                            Welcome to our plant shop! We offer a wide variety of fresh, beautiful, and easy-to-care-for plants to brighten up your home or workspace. With a deep love for nature, our team is here to help you find the perfect plants that suit your style and environment. Let greenery bring joy, calm, and positive energy into your everyday life!
                            </p>
                            <p></p>
                            <a className="btnhvr-hover20" href="#">
                                Read More
                            </a>
                        </div>
                    </div>
                    <div className="rowmy-20">
                        <div className="c21">
                            <div className="service-block-inner">
                                <h3>We are Trusted</h3>
                                <div className="bg"></div>
                            </div>
                        </div>
                        <div className="c21">
                            <div className="service-block-inner">
                                <h3>We are Professional</h3>
                                <div className="bg"></div>
                            </div>
                        </div>
                        <div className="c21">
                            <div className="service-block-inner">
                                <h3>We are Expert</h3>
                                <div className="bg"></div>
                            </div>
                        </div>
                    </div>
                    <div className="rowmy-21">
                        <div className="c22">
                            <h2 className="noo-sh-title">My Team</h2>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="hover-team">
                                <div className="our-team">
                                    <img src={Tien} />
                                    <div className="team-content">
                                        <h3 className="title">Nguyễn Viết Tiến</h3>
                                        <span className="post">Web Developer</span>
                                    </div>
                                </div>
                                <div className="team-description">
                                    <p>21810310518 - D16CNPM5 - Single</p>
                                </div>
                                <hr className="my-0" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default About;
