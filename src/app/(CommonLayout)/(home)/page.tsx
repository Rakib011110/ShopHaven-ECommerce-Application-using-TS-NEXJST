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

export default function Home() {
  return (
    <div>
      <div className="">
        <Banner />
      </div>
      <div className="container mx-auto">
        <div>{/* <Products /> */}</div>

        <div>{/* <Categories /> */}</div>
        <CategorySectionMan />
        <CategorySectionWoman />

        <WhyChooseUs />

        <OurServices />
        <div className="">
          <NewsletterSection />
        </div>
        <ScrollToTopButton />
      </div>
      <Footer />
    </div>
  );
}
