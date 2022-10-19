import React from "react";
import { Hero, Services, ContactSection, FeatureProducts } from "../components";

const Home = () => {
  return (
    <main>
      <Hero />
      <FeatureProducts />
      <Services />
      <ContactSection />
    </main>
  );
};

export default Home;
