import { notFound } from 'next/navigation';
import defaultMdxComponents, { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { source } from '@/lib/source';

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await props.params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const { author, license, attributions } = page.data;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      {page.data.description && <DocsDescription>{page.data.description}</DocsDescription>}
      <DocsBody>
        {(author || license || attributions?.length) && (
          <aside className="mb-6 border-y py-3 text-sm text-fd-muted-foreground">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {author && <span>作者：{author}</span>}
              {license && <span>许可：{license}</span>}
            </div>
            {attributions?.length ? (
              <ul className="mt-2 list-disc pl-5">
                {attributions.map((item, index) => (
                  <li key={`${item.name}-${index}`}>
                    {item.url ? <a href={item.url} target="_blank" rel="noreferrer">{item.name}</a> : item.name}
                    {' '}（{item.license}）
                  </li>
                ))}
              </ul>
            ) : null}
          </aside>
        )}
        <MDX components={{ ...defaultMdxComponents, a: createRelativeLink(source, page) }} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}
