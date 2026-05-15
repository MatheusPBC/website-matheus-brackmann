import ReactMarkdown from "react-markdown";

export function MarkdownContent({ content }: { content: string }) {
  return (
    <article className="prose max-w-full dark:prose-invert prose-headings:font-semibold prose-headings:text-black prose-p:font-serif dark:prose-headings:text-white">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
