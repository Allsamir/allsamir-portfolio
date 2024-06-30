"use client";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useEffect, useRef } from "react";
import { MdCircle } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
/**
 * Props for `TeachList`.
 */
export type TeachListProps = SliceComponentProps<Content.TeachListSlice>;

/**
 * Component for "TeachList" Slices.
 */
const TeachList = ({ slice }: TeachListProps): JSX.Element => {
  const component = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      const ti = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      });

      ti.fromTo(
        ".teach-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut",
        },
      );
    }, component);
    return () => ctx.revert();
  }, []);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
      className="overflow-hidden"
    >
      <Bounded>
        <Heading as="h2" className="mb-8" size="xl">
          {slice.primary.heading}
        </Heading>
      </Bounded>
      {slice.primary.teach.map(({ teach_name, teach_color }, index) => (
        <div
          key={index}
          aria-label={teach_name ?? undefined}
          className="teach-row mb-8 flex items-center justify-center gap-4 text-slate-700"
        >
          {Array.from({ length: 15 }, (_, index) => (
            <React.Fragment key={index}>
              <span
                className="teach-item text-8xl font-extrabold uppercase tracking-tighter"
                style={{
                  color: index === 7 && teach_color ? teach_color : "inherit",
                }}
              >
                {teach_name}
              </span>
              <span className="">
                <MdCircle className="text-3xl" />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TeachList;
