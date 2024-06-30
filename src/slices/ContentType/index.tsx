import Bounded from "@/components/Bounded";
import ContentList from "@/slices/ContentType/ContentList";
import Heading from "@/components/Heading";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
/**
 * Props for `ContentType`.
 */
export type ContentTypeProps = SliceComponentProps<Content.ContentTypeSlice>;

/**
 * Component for "ContentType" Slices.
 */
const ContentType = async ({
  slice,
}: ContentTypeProps): Promise<JSX.Element> => {
  const client = createClient();
  const blogPosts = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("project");
  const contentType = slice.primary.contenttype || "Blog";
  const items = contentType === "Blog" ? blogPosts : projects;
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
      <ContentList
        items={items}
        contentType={contentType}
        viewMoreText={slice.primary.view_more_text}
        fallbackItemImage={slice.primary.fall_back_image}
      />
    </Bounded>
  );
};

export default ContentType;
