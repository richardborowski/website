import React from "react";
import {ImageLoader} from "./ImageLoader";
import {Container} from "react-bootstrap";
import {Skills} from "./Skills";

export const Home = () => {
    return (

        <Container className="mt-5">
            <section className="nnbounding" id="nnboundingid">
                <h3>Welcome to Richard Borowski's Website</h3>
                <p>
                    Hello! I’m Richard Borowski, an inspiring software engineer with a passion for
                    artificial intelligence and machine learning. I believe in the power of technology
                    to transform ideas into reality and create innovative solutions that enhance our
                    daily lives.
                </p>
                <p>
                    With a strong foundation in software development, I am constantly exploring new
                    technologies and methodologies to improve my skills and contribute to exciting
                    projects. Join me on this journey as I delve into the world of AI and ML,
                    and discover the endless possibilities they offer.
                </p>
            </section>
            <section className="nnbounding" id="nnboundingid">
                <Skills />
            </section>
        </Container>
    );
}