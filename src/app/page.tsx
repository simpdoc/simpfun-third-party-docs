import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, BookOpen, Scale, SearchCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { source } from '@/lib/source';

export const metadata: Metadata = {
  title: { absolute: '简幻欢第三方镜像文档' },
  description: '更多镜像作者正在沟通，敬请期待！',
};

const roots = [
  {
    name: '午夜_Midnight',
    slug: 'Midnight',
    href: '/docs/Midnight/main',
    description: '午夜_Midnight 的镜像文档',
  },
  {
    name: 'ideafox',
    slug: 'ideafox',
    href: '/docs/ideafox/geyser-fabric',
    description: 'ideafox 的镜像文档',
  },
  {
    name: '阿呆',
    slug: 'a-dai',
    href: '/docs/a-dai/palworld-faq',
    description: '阿呆的镜像文档',
  },
];

const features: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: BookOpen,
    title: '社区文档',
    description: '源码在 GitHub 开源。',
  },
  {
    icon: SearchCheck,
    title: '完全免费',
    description: '所有内容均可自由免费查阅，不需要一分钱。',
  },
];

const footerLinks = [
  {
    title: '镜像作者',
    items: roots.map((root) => ({
      label: root.name,
      href: root.href,
    })),
  },
  {
    title: '开源许可',
    items: [
      { label: 'MIT License', href: '/LICENSE' },
      { label: 'CC BY-NC-SA 4.0', href: '/LICENSE-docs' },
    ],
  },
  {
    title: '官网链接',
    items: [
      { label: '简幻欢官网', href: 'https://simpfun.cn/' },
      { label: '简幻欢官方文档', href: 'https://www.yuque.com/simpfun/sfe/main' },
    ],
  },
];

function isExternal(href: string) {
  return href.startsWith('http');
}

export default function HomePage() {
  const pages = source.getPages();

  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 pt-20 pb-16 text-center md:pt-28">
        <p className="rounded-full border bg-fd-card px-3 py-1 text-xs text-fd-muted-foreground">
          非官方社区镜像
        </p>
        <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
          简幻欢第三方镜像文档
        </h1>
        <p className="mt-5 max-w-2xl text-fd-muted-foreground md:text-lg">
          更多镜像作者正在沟通，敬请期待！
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {roots.map((root, index) => (
            <Link
              key={root.slug}
              href={root.href}
              className={buttonVariants({
                variant: index === 0 ? 'default' : 'secondary',
                className: 'px-4',
              })}
            >
              {root.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {roots.map((root) => {
            const count = pages.filter((page) => page.slugs[0] === root.slug).length;

            return (
              <Link
                key={root.slug}
                href={root.href}
                className="group flex flex-col rounded-xl border bg-fd-card p-5 transition-colors hover:bg-fd-accent/40"
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-semibold">{root.name}</h2>
                  <span className="text-xs text-fd-muted-foreground">{count} 篇</span>
                </div>
                <p className="mt-2 text-sm text-fd-muted-foreground">{root.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
                  开始阅读
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl border p-5">
              <div className="flex size-10 items-center justify-center rounded-lg border bg-fd-secondary">
                <Icon className="size-5 text-fd-muted-foreground" />
              </div>
              <h2 className="mt-4 font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-fd-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-auto border-t bg-fd-card/40">
        <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-10 sm:grid-cols-3">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold">{group.title}</p>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    {isExternal(item.href) ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t px-4 py-4 text-center text-xs text-fd-muted-foreground">
          <p>Copyright © {new Date().getFullYear()} 简幻欢第三方镜像文档</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-fd-foreground"
            >
              黑ICP备2024025211号-2
            </a>
            <a
              href="https://beian.mps.gov.cn/#/query/webSearch?code=23030002000215"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 transition-colors hover:text-fd-foreground"
            >
              <img src="/img/gongan.png" alt="公安备案图标" className="h-4 w-auto" />
              黑公网安备23030002000215号
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
