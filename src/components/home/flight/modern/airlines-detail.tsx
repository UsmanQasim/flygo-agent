import { FC } from "react";
import Button from "@/components/common/btn";
import { ReadMore } from "@/constant/constant";
import { airDetailData } from "@/data/home/flight/flight-data";
import BackgroundDiv from "@/utils/HOC/background-div";
import Link from 'next/link';

const AirlinesDetail: FC = () => {
  return (
    <section className="pt-0 detail-section zig-zag-effect">
      <BackgroundDiv titleClass="section-b-space section-t-space" img={"/assets/images/bluebg.jpg"} divImg="/assets/images/bluebg.jpg" imgWidth={1905} imgHeight={352} displayClass="none">
        <div className="container">
          <div className="row">
            {airDetailData.map((data: IAirDetailProps,index) => (
              <div className="col-md-4" key={index}>
                <div className="detail-box">
                  <div className="upper-part">
                    <h6>{data.title}</h6>
                    <h2>{data.offer}</h2>
                    <h5>enjoy extra baggage allowance</h5>
                  </div>
                  <Link href=""><Button btnClass="btn btn-rounded btn-sm color1" name={ReadMore} /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BackgroundDiv>
    </section>
  );
};

export default AirlinesDetail;
