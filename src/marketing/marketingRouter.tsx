import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import { MarketingLayout } from './layout/MarketingLayout';
import { marketingChildren } from './routes';

const lazyNotFound: RouteObject['lazy'] = async () => {
  const mod = await import('./pages/MarketingNotFoundPage');
  return { Component: mod.MarketingNotFoundPage };
};

/**
 * Standalone router for the marketing website. It contains only the public marketing
 * pages — no product routes and no authentication. Includes a "/" → home redirect and a
 * catch-all "*" → branded 404.
 */
export const marketingRouter = createBrowserRouter([
  {
    element: <MarketingLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      ...marketingChildren,
      { path: '*', lazy: lazyNotFound },
    ],
  },
]);
