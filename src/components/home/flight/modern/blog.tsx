import { FC } from "react";
import SliderFive from "@/components/common/slider-components/slide5";
import TitleThree from "@/components/common/title/title-three";
import { flightBlogData } from "@/data/home/flight/flight-data";

const Blog: FC<IBlogComponentProps> = ({ title }) => {
  return (
    <section className="blog_section section-b-space ratio_55">
      <div className="container">
        <TitleThree classTitle={"title-2"}  span="Blogs" />
        <div className="row">
          {/* {title && <TitleThree classTitle={"title-2"} subTitle="our news..." span="and blog" desc="Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum has been standard......." />} */}
          <SliderFive slideData={flightBlogData} />
        </div>
      </div>
    </section>
  );
};

export default Blog;
