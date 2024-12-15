import Banner from "@/src/components/home/@banner/page";
import Products from "@/src/components/home/@availableProducts/page";
import Categories from "@/src/components/home/@productCategory/page";
import WhyChooseUs from "@/src/components/home/@flashSales/page";

export default function Home() {
  return (
    <div>
      {/* <CreatePost /> */}
      <Banner />
      <div>
        <Products />
      </div>

      <div>
        <Categories />
      </div>
      <WhyChooseUs />
    </div>
  );
}
