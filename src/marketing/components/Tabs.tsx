import { useId, useState, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

/**
 * Accessible tabs (Phase 4C). ARIA tablist/tab/tabpanel, arrow-key navigation, panels
 * cross-fade (no horizontal slide). Used by Contact (intent routing) etc.
 */
export function Tabs({ items, initial }: { items: TabItem[]; initial?: string }) {
  const [active, setActive] = useState(initial ?? items[0]?.id);
  const baseId = useId();

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = (index + dir + items.length) % items.length;
    setActive(items[next]!.id);
    document.getElementById(`${baseId}-tab-${items[next]!.id}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Options" className="flex flex-wrap gap-1 border-b border-mkt-border">
        {items.map((item, i) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              id={`${baseId}-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                'mkt-focusable -mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mkt-focus',
                selected ? 'border-mkt-accent-400 text-mkt-ink-900' : 'border-transparent text-mkt-ink-500 hover:text-mkt-ink-900',
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          id={`${baseId}-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== active}
          className="pt-6"
        >
          {item.id === active && item.content}
        </div>
      ))}
    </div>
  );
}
