"use client";
import Bounded from "@/components/Bounded";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Shapes from "./Shapes";

/**
 * Props for `Hero3D`.
 */
export type Hero3DProps = SliceComponentProps<Content.Hero3DSlice>;

/**
 * Component for "Hero3D" Slices.
 */
const Hero3D = ({ slice }: Hero3DProps): JSX.Element => {
  const component = useRef(null);
  useEffect(() => {
    let cxt = gsap.context(() => {
      const ti = gsap.timeline();
      ti.fromTo(
        ".name-animation",
        {
          x: -100,
          opacity: 0,
          rotate: -10,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1.5,0.3)",
          duration: 1.5,
          delay: 0.5,
          transformOrigin: "left, top",
          stagger: {
            each: 0.2,
            from: "random",
          },
        },
      );
      ti.fromTo(
        ".job-title",
        {
          y: 20,
          opacity: 0,
          scale: 1.2,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scale: 1,
        },
      );
    }, component);
    return () => cxt.revert();
  }, []);
  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} inline-block opacity-0`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <div className="col-start-1 md:row-start-1">
          <h1
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
            className="text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter mb-8"
          >
            <span className="block text-slate-300">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="block text-slate-600 -mt-[.2em]">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
            <span className="block job-title bg-gradient-to-tr from-yellow-400 via-yellow-200 opacity-0 to-yellow-500 text-2xl md:text-4xl font-bold uppercase tracking-[.2em] bg-clip-text text-transparent">
              {slice.primary.title}
            </span>
          </h1>
        </div>
        <div>
          <Shapes />
        </div>
      </div>
    </Bounded>
  );
};

export default Hero3D;
