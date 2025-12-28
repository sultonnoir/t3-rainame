import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import parse from "html-react-parser";

type Props = {
  about: string;
};

const ProductDetails = ({ about }: Props) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="space-y-2"
      defaultValue="details"
    >
      <AccordionItem value="details" className="border-none">
        <AccordionTrigger className="bg-muted rounded-lg p-2">
          Details
        </AccordionTrigger>
        <AccordionContent className="p-2">{parse(about)}</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="bg-muted rounded-lg p-2">
          How it Fits
        </AccordionTrigger>
        <AccordionContent className="p-2">
          Use this as a guide. Preference is a huge factor — if you&apos;re near
          the top of a size range and/or prefer more coverage, you may want to
          size up.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-none">
        <AccordionTrigger className="bg-muted rounded-lg p-2">
          Fabric + Care
        </AccordionTrigger>
        <AccordionContent className="p-2">
          <ul className="list-inside list-disc leading-7">
            <li>Made from a sheer Belgian power micromesh.</li>
            <li>74% Polyamide (Nylon) 26% Elastane (Spandex)</li>
            <li>Adjustable hook &amp; eye closure and straps</li>
            <li>Hand wash in cold water, dry flat</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="border-none">
        <AccordionTrigger className="bg-muted rounded-lg p-2">
          FAQ
        </AccordionTrigger>
        <AccordionContent className="p-2">
          <ul className="list-inside list-disc leading-7">
            <li>
              All full-priced, unworn items, with tags attached and in their
              original packaging are eligible for return or exchange within 30
              days of placing your order.
            </li>
            <li>
              Please note, packs must be returned in full. We do not accept
              partial returns of packs.
            </li>
            <li>Want to know our full returns policies? Here you go.</li>
            <li>
              Want more info about shipping, materials or care instructions?
              Here!
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductDetails;
