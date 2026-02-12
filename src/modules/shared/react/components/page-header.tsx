import { type ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  children?: ReactNode;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => (
  <div className="mb-8 flex items-center justify-between">
    <h1 className="text-3xl font-extrabold text-[var(--foreground)]">{title}</h1>
    {children && <div className="flex gap-2">{children}</div>}
  </div>
);
