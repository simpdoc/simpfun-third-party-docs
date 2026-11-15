import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Provider } from '@/components/provider';
import './global.css';

export const metadata: Metadata = {
  title: {
    default: '简幻欢第三方镜像文档',
    template: '%s | 简幻欢第三方镜像文档',
  },
  description: '简幻欢社区作者维护的第三方镜像文档。',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
