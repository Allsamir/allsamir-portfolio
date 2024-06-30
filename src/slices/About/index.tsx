import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Avatar from "./Avatar";

export type AboutProps = SliceComponentProps<Content.AboutSlice>;

const About = ({ slice }: AboutProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr, 1fr]">
        <Heading size="xl" className="col-start-1" as="h1">
          {slice.primary.heading}
        </Heading>
        <div className="prose mt-8 prose-xl prose-slate prose-invert col-start-1">
          <PrismicRichText field={slice.primary.body} />
        </div>
        <Button
          linkField={slice.primary.button_link}
          label={slice.primary.button}
          showIcon={true}
        />
        <Avatar
          className="row-start-1 max-w-sm lg:col-start-2 lg:row-end-3"
          image={slice.primary.avatar}
        />
      </div>
    </Bounded>
  );
};

export default About;
