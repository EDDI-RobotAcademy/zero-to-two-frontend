import { ReactNode } from 'react';

interface Props {
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function Card({ title, children, actions }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {(title || actions) && (
        <div className="mb-3 flex items-center justify-between">
          {title ? <h3 className="text-lg font-semibold">{title}</h3> : <span />}
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}
