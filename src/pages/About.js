import React from "react";
import styled from "styled-components";
import PageHero from "../components/PageHero";
import aboutIMG from "../assets/hero-bcg.jpeg";
const About = () => {
  return (
    <main>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <img src={aboutIMG} alt="about image" />
        <article>
          <div className="title">
            <h2>About us</h2>
            <div className="underline"></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
            esse! Rem ab voluptates molestiae iure assumenda facere odit,
            recusandae fugit, quo alias sit a unde nulla consequuntur maxime?
            Assumenda fuga labore, incidunt ut aspernatur totam. Ad neque harum
            iusto iste sequi voluptatibus blanditiis natus dignissimos
            recusandae provident ab totam, consequuntur tempora doloremque
            veniam. Consectetur asperiores magni odio molestiae architecto quas
            natus nostrum, cum consequuntur magnam illo ducimus. Est aliquid in,
            deleniti minima, obcaecati tempora rerum inventore quibusdam nisi
            cupiditate commodi ipsum maxime, provident sapiente! Quasi excepturi
            aspernatur suscipit aliquid, eaque fuga voluptatibus dolores
            sapiente ea molestias. Aliquam autem atque omnis.
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default About;
