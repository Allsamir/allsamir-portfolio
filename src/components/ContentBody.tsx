import { SliceZone } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { components } from "@/slices";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
// import { formatDate } from "@/utils/formatDate";

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  //   const formattedDate = formatDate(page.data.date);
  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1">{page.data.title}</Heading>
        <div className="mt-8 flex flex-wrap gap-4 text-yellow-400">
          {page.tags.map((tag, index) => (
            <span key={index} className="text-xl font-bold">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-8 border-b border-slate-600 pb-4 text-xl font-medium text-slate-300">
          {page.data.date}
        </p>
        <div className="prose prose-xl prose-invert mt-4 w-full max-w-none md:mt-10">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
}
