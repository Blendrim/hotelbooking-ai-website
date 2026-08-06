import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Accessible FAQ accordion (Phase 4B/4C). Uses native <button> for keyboard support,
 * `aria-expanded` + `aria-controls`. Smooth height/fade honored via CSS; reduced-motion
 * neutralizes it globally (tokens.css).
 */
export function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-mkt-border border-y border-mkt-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="mkt-focusable flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mkt-focus"
              >
                <span className="text-base font-medium text-mkt-ink-900">{item.question}</span>
                <ChevronDown
                  className={cn('h-5 w-5 shrink-0 text-mkt-ink-500 transition-transform duration-200', isOpen && 'rotate-180')}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5"
            >
              <p className="max-w-mkt-prose text-mkt-ink-700 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
