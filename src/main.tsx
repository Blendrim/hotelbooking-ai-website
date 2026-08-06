import { StrictMode, Component, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './theme';
import { marketingRouter } from './marketing/marketingRouter';
import './marketing/styles/entry.css';

/**
 * Entry point for the standalone HotelBooking AI marketing website.
 * Contains only public marketing code — no SaaS app, auth, tenant, or dashboard.
 */

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

class MarketingErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="mkt flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
          <h1 className="text-2xl font-semibold text-mkt-ink-900">Something went wrong</h1>
          <p className="text-mkt-ink-500">Please refresh the page. If it persists, contact us.</p>
          <a href="/home" className="rounded-mkt-md bg-mkt-primary-500 px-5 py-2.5 text-sm font-medium text-white">
            Go home
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element #root not found');

createRoot(rootElement).render(
  <StrictMode>
    <MarketingErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={marketingRouter} />
        </QueryClientProvider>
      </ThemeProvider>
    </MarketingErrorBoundary>
  </StrictMode>,
);
