"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Banner from "@/src/components/home/@banner/page";
import Products from "@/src/components/home/@availableProducts/page";
import Categories from "@/src/components/home/@productCategory/page";
import WhyChooseUs from "@/src/components/home/@flashSales/page";
import ScrollToTopButton from "@/src/components/UI/ScrollToTopButton";
import Footer from "@/src/components/home/@footer/Footer";
import OurServices from "@/src/components/home/@OurServices/OurServices";
import CategorySectionMan from "@/src/components/home/@CategorySectionMan/CategorySectionMan";
import CategorySectionWoman from "@/src/components/home/@CategorySectionMan/@CategorySectionWoman/CategorySectionWoman";
import NewsletterSection from "@/src/components/home/@NewsletterSection/NewsletterSection";
import BlogComponent from "../../../components/home/BlogComponent/BlogComponent";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });

    AOS.refresh();
  }, []);

  return (
    <div>
      <div data-aos="zoom-in">
        <Banner />
      </div>
      <div className="container mx-auto">
        <div data-aos="fade-up">
          <Products />
        </div>

        <div data-aos="fade-up">
          <Categories />
        </div>
        <div data-aos="zoom-in">
          <CategorySectionMan />
        </div>
        <div data-aos="zoom-in">
          <CategorySectionWoman />
        </div>

        <div data-aos="fade-left">
          <WhyChooseUs />
        </div>

        <div data-aos="fade-right">
          <OurServices />
        </div>
        <div data-aos="fade-up">
          <BlogComponent />
        </div>
        <div data-aos="fade-up">
          <NewsletterSection />
        </div>
        <ScrollToTopButton />
      </div>
      <Footer />
    </div>
  );
}
