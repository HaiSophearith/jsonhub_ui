import React from "react";
import Hero from "../components/landing_components/Hero";
import "../style/landing_style.css";
import CardSection from "../components/landing_components/CardSection";
import MiddleSection from "../components/landing_components/MiddleSection";
import ResourceSection from "../components/landing_components/ResourceSection";
import FooterComponent from "../components/FooterComponent";
import { Link } from 'react-router-dom';

export default function Landing_page() {
  return (
    <div className="bg-white ">
      <Hero />
      <CardSection />
      <MiddleSection />
      <ResourceSection />
    </div>
  );
}
