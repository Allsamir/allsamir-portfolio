"use client";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef } from "react";

type Avatar = {
  image: ImageField;
  className?: string;
};

export default function Avatar({ image, className }: Avatar) {
  const component = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".avatar",
        {
          opacity: 0,
          scale: 1.4,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: "power1.inOut",
        },
      );

      window.onmousemove = (e) => {
        if (!component.current) return;
        const componentReact = (
          component.current as HTMLElement
        ).getBoundingClientRect();
        const componentCenterX = componentReact.left + componentReact.width / 2;
        let componentPercent = {
          x: (e.clientX - componentCenterX) / componentReact.width / 2,
        };

        let distFromCenter = 1 - Math.abs(componentPercent.x);
        gsap
          .timeline({
            defaults: { duration: 0.5, overwrite: "auto", ease: "power3.out" },
          })
          .to(
            ".avatar",
            {
              rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
              duration: 0.5,
            },
            0,
          )
          .to(
            ".highlight",
            {
              opacity: distFromCenter - 0.7,
              x: (-10 + 20) & componentPercent.x,
              duration: 0.5,
            },
            0,
          );
      };
    }, component);
  }, []);
  return (
    <div ref={component} className={clsx("relative h-full w-full", className)}>
      <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0f">
        <PrismicNextImage
          className={`avatar-image h-full w-full object-fill`}
          field={image}
          imgixParams={{ q: 90 }}
        />
        <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div>
      </div>
    </div>
  );
}
