import { notFound, redirect } from 'next/navigation';
import type { Folder as PageTreeFolder, Node as PageTreeNode, Root as PageTreeRoot } from 'fumadocs-core/page-tree';
import defaultMdxComponents, { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { source } from '@/lib/source';

function findFirstPageUrl(node: PageTreeNode): string | undefined {
  if (node.type === 'page') return node.url;
  if (node.type !== 'folder') return undefined;

  for (const child of node.children) {
    const url = findFirstPageUrl(child);
    if (url) return url;
  }

  return node.index?.url;
}

function getRootFolderTarget(slug: string): string | undefined {
  const tree: PageTreeRoot = source.getPageTree();

  for (const child of tree.children) {
    if (child.type !== 'folder' || !child.root || child.$ref?.folder !== slug) continue;

    const target = findFirstPageUrl(child);
    return target ? `${target.replace(/\/$/, '')}/` : undefined;
  }

  return undefined;
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await props.params;
  const page = source.getPage(slug);
  if (!page) {
    if (slug.length === 1) {
      const target = getRootFolderTarget(slug[0]);
      if (target) redirect(target);
    }

    notFound();
  }

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
  const rootFolders = source
    .getPageTree()
    .children.filter((node): node is PageTreeFolder => node.type === 'folder' && node.root === true);

  return [
    ...source.generateParams(),
    ...rootFolders.flatMap((folder) => (folder.$ref?.folder ? [{ slug: [folder.$ref.folder] }] : [])),
  ];
}
