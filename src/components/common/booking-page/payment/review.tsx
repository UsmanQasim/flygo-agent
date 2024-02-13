// @ts-nocheck
"use client";
import { FC, useState } from "react";
import DebitCard from "./debit";
import NetBanking from "./net-banking";
import MyWallet from "./my-wallet";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

const ReviewSection: FC = () => {
  const [open, setOpen] = useState("1");

  const toggle = (id: string) => {
    open === id ? setOpen("") : setOpen(id);
  };
  return (
    <div className="flight_detail payment-gateway">
      <div className="accordion default-accordion" id="accordionExample">
        <Accordion open={open} toggle={toggle} className="dark-accordion">
          <AccordionItem>
            <AccordionHeader targetId="1">My wallet</AccordionHeader>
            <AccordionBody accordionId="1">
              <MyWallet />
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="2">Debit Card</AccordionHeader>
            <AccordionBody accordionId="2">
              <DebitCard />
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="3">Credit Card</AccordionHeader>
            <AccordionBody accordionId="3">
              <DebitCard />
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="4">Net Banking</AccordionHeader>
            <AccordionBody accordionId="4">
              <NetBanking />
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ReviewSection;
