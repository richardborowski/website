import meter1 from "../assets/images/meter1.svg";
import meter2 from "../assets/images/meter2.svg";
import meter3 from "../assets/images/meter3.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import arrow1 from "../assets/images/arrow1.svg";
import arrow2 from "../assets/images/arrow2.svg";
import python from "../assets/images/python.png";
import java from "../assets/images/java.png";
import js from "../assets/images/JavaScript-Symbol.png";
import htmlcss from "../assets/images/htmlcss.png";
import cc from "../assets/images/cpp_logo.png";
import numpy from "../assets/images/numpy.png";
import git from "../assets/images/Git.png";
import docker from "../assets/images/docker.png";
import keras from "../assets/images/keras.png";
import linux from "../assets/images/linux.png";
import pandas from "../assets/images/pandas.png";
import sci from "../assets/images/Scikit_learn.png";
import spring from "../assets/images/spring.png";
import tf from "../assets/images/tensorflow.png";

export const Skills = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 7
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        }
    };

    return (
        <section className="skill" id="skills">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="skill-bx wow zoomIn">
                            <h2 style={{ textAlign: 'center' }}>Skills</h2>
                            <h3>Programming Languages</h3>
                            <Carousel responsive={responsive} infinite={true}
                                      className="owl-carousel owl-theme skill-slider">
                                <div className="item">
                                    <img src={java} alt="Image"/>
                                    <h5>Java</h5>
                                </div>
                                <div className="item">
                                    <img src={python} alt="Image"/>
                                    <h5>Python</h5>
                                </div>
                                <div className="item">
                                    <img src={cc} alt="Image"/>
                                    <h5>C/C++</h5>
                                </div>
                                <div className="item">
                                    <img src={js} alt="Image"/>
                                    <h5>Javascript</h5>
                                </div>
                                <div className="item">
                                    <img src={htmlcss} alt="Image"/>
                                    <h5>HTML/CSS</h5>
                                </div>
                            </Carousel>
                            <br/>
                            <h3>Software</h3>
                            <Carousel responsive={responsive} infinite={true}
                                      className="owl-carousel owl-theme skill-slider">
                                <div className="item">
                                    <img src={tf} alt="Image"/>
                                    <h5>TensorFlow</h5>
                                </div>
                                <div className="item">
                                    <img src={git} alt="Image"/>
                                    <h5>Git</h5>
                                </div>
                                <div className="item">
                                    <img src={linux} alt="Image"/>
                                    <h5>Linux</h5>
                                </div>
                                <div className="item">
                                    <img src={keras} alt="Image"/>
                                    <h5>Keras</h5>
                                </div>
                                <div className="item">
                                    <img src={sci} alt="Image"/>
                                    <h5>Scikit-learn</h5>
                                </div>
                                <div className="item">
                                    <img src={pandas} alt="Image"/>
                                    <h5>pandas</h5>
                                </div>
                                <div className="item">
                                    <img src={spring} alt="Image"/>
                                    <h5>Spring</h5>
                                </div>
                                <div className="item">
                                    <img src={docker} alt="Image"/>
                                    <h5>Docker</h5>
                                </div>
                                <div className="item">
                                    <img src={numpy} alt="Image"/>
                                    <h5>NumPy</h5>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}