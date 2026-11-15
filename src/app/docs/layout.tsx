import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      nav={{ title: <span className="font-semibold">简幻欢第三方镜像文档</span> }}
    >
      {children}
    </DocsLayout>
  );
}
