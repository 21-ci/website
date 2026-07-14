import type { ReactNode, ElementType } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}

export function Container({ children, className = "", as: Tag = "div", id }: ContainerProps) {
  return (
    <Tag id={id} className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
