import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  withNav?: boolean;
}

export default function ScreenWrapper({ children, className = '', withNav }: Props) {
  return (
    <div className={`min-h-dvh w-full max-w-lg mx-auto relative ${withNav ? 'pb-28' : ''} ${className}`}>
      {children}
    </div>
  );
}
