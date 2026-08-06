import { useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/utils/cn';
import { track } from '../analytics/analytics';

interface VideoSectionProps {
  /** Accessible title of the video. */
  title: string;
  /** Poster image shown before play (required — nothing heavy loads until clicked). */
  poster: string;
  /** MP4/WebM source, OR an embed URL (YouTube/Vimeo) loaded lazily on play. */
  src: string;
  /** `file` = native <video>; `embed` = iframe (loaded only after the user clicks play). */
  kind?: 'file' | 'embed';
  /** WebVTT captions track (native video only). Strongly recommended for accessibility. */
  captionsSrc?: string;
  /** Analytics label. */
  label?: string;
  className?: string;
}

/**
 * Reusable marketing video block (Phase-6D / launch prep). Poster-first: no video or
 * iframe is loaded until the user presses play — so heavy demo assets never hurt initial
 * page load, and there is never autoplay-with-audio. Accessible controls; captions
 * supported. If a video doesn't exist yet, simply don't render this section.
 */
export function VideoSection({ title, poster, src, kind = 'file', captionsSrc, label, className }: VideoSectionProps) {
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    track('video_play', { label: label ?? title });
  };

  return (
    <div className={cn('relative overflow-hidden rounded-mkt-lg border border-mkt-border bg-mkt-primary-900 shadow-mkt-3', className)}>
      <div className="aspect-video w-full">
        {!playing ? (
          <button
            type="button"
            onClick={start}
            className="mkt-focusable group relative h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mkt-focus"
            aria-label={`Play video: ${title}`}
          >
            <img src={poster} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" />
            <span className="absolute inset-0 flex items-center justify-center bg-mkt-primary-900/30 transition-colors group-hover:bg-mkt-primary-900/20">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-mkt-accent-400 text-mkt-primary-900 shadow-mkt-2 transition-transform group-hover:scale-105">
                <Play className="ml-0.5 h-7 w-7" fill="currentColor" aria-hidden="true" />
              </span>
            </span>
          </button>
        ) : kind === 'embed' ? (
          <iframe
            src={src}
            title={title}
            className="h-full w-full"
            allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <video src={src} poster={poster} controls autoPlay className="h-full w-full" playsInline>
            {captionsSrc && <track kind="captions" src={captionsSrc} srcLang="en" label="English" default />}
          </video>
        )}
      </div>
    </div>
  );
}
