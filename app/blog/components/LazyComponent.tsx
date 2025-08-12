'use client';

import { lazy, Suspense, ComponentType } from 'react';
import { Skeleton } from './ui/skeleton';

type LazyComponentProps = {
  load: () => Promise<{ default: ComponentType<any> }>;
  loading?: React.ReactNode;
  [key: string]: any;
};

export default function LazyComponent({ 
  load, 
  loading: LoadingFallback = <DefaultLoading />, 
  ...props 
}: LazyComponentProps) {
  const LazyLoadedComponent = lazy(load);

  return (
    <Suspense fallback={LoadingFallback}>
      <LazyLoadedComponent {...props} />
    </Suspense>
  );
}

function DefaultLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-[200px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-text/60">Loading content...</p>
      </div>
    </div>
  );
}
