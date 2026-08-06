import { useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2 } from 'lucide-react';
import { FormField } from './FormField';
import { inputClass, textareaClass } from './styles';
import { Button } from '../../ui/Button';
import { track, type AnalyticsEvent } from '../../analytics/analytics';
import { useSubmitLead } from '../../api/useSubmitLead';

/**
 * Shared conversion form (Phase 6B §M). RHF + Zod, inline validation on blur,
 * accessible errors, loading/success states, duplicate-submit prevention, data
 * preserved on error.
 *
 * ⚠️ SUBMISSION IS SIMULATED. No backend endpoint is wired yet — real POST to the
 * CRM/leads API is Phase 6C. The success panel says so; nothing is actually sent.
 */

export type LeadFormVariant = 'demo' | 'contact-sales' | 'partner' | 'waitlist';

interface FieldDef {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select';
  required?: boolean;
  hint?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

type FormValues = Record<string, string>;

const email = z.string().min(1, 'Work email is required').email('Enter a valid email');
const req = (label: string) => z.string().min(1, `${label} is required`);

interface VariantConfig {
  fields: FieldDef[];
  schema: z.ZodTypeAny;
  submitLabel: string;
  startEvent: AnalyticsEvent;
  submitEvent: AnalyticsEvent;
  successTitle: string;
  successBody: string;
}

const ROLE_OPTIONS = ['Owner / Investor', 'General Manager', 'Revenue Manager', 'Operations Manager', 'IT / Security', 'Other'].map((v) => ({ value: v, label: v }));
const SIZE_OPTIONS = ['1–25 rooms', '26–75 rooms', '76–150 rooms', '150+ rooms', 'Multi-property group'].map((v) => ({ value: v, label: v }));
const PARTNER_OPTIONS = ['Technology Partner', 'System Integrator', 'Reseller', 'Consultant / Agency', 'Implementation Partner'].map((v) => ({ value: v, label: v }));

const configs: Record<LeadFormVariant, VariantConfig> = {
  demo: {
    fields: [
      { name: 'fullName', label: 'Full name', type: 'text', required: true },
      { name: 'workEmail', label: 'Work email', type: 'email', required: true },
      { name: 'hotelName', label: 'Hotel / group name', type: 'text', required: true },
      { name: 'role', label: 'Your role', type: 'select', required: true, options: ROLE_OPTIONS },
      { name: 'propertySize', label: 'Property size', type: 'select', required: true, options: SIZE_OPTIONS },
      { name: 'message', label: 'Anything specific you want to see?', type: 'textarea', placeholder: 'Optional' },
    ],
    schema: z.object({ fullName: req('Full name'), workEmail: email, hotelName: req('Hotel name'), role: req('Role'), propertySize: req('Property size'), message: z.string().optional().default('') }),
    submitLabel: 'Request my demo',
    startEvent: 'demo_form_start',
    submitEvent: 'demo_form_submit',
    successTitle: "Thanks — we'll be in touch",
    successBody: "We'll email you within one business day to schedule a 30-minute demo tailored to your property.",
  },
  'contact-sales': {
    fields: [
      { name: 'fullName', label: 'Full name', type: 'text', required: true },
      { name: 'workEmail', label: 'Work email', type: 'email', required: true },
      { name: 'company', label: 'Company', type: 'text', required: true },
      { name: 'message', label: 'How can we help?', type: 'textarea', required: true },
    ],
    schema: z.object({ fullName: req('Full name'), workEmail: email, company: req('Company'), message: req('Message') }),
    submitLabel: 'Contact Sales',
    startEvent: 'demo_form_start',
    submitEvent: 'demo_form_submit',
    successTitle: 'Message received',
    successBody: "Our team will reply within one business day.",
  },
  partner: {
    fields: [
      { name: 'fullName', label: 'Full name', type: 'text', required: true },
      { name: 'workEmail', label: 'Work email', type: 'email', required: true },
      { name: 'company', label: 'Company', type: 'text', required: true },
      { name: 'partnerType', label: 'Partnership type', type: 'select', required: true, options: PARTNER_OPTIONS },
      { name: 'message', label: 'Tell us about your business', type: 'textarea' },
    ],
    schema: z.object({ fullName: req('Full name'), workEmail: email, company: req('Company'), partnerType: req('Partnership type'), message: z.string().optional().default('') }),
    submitLabel: 'Become a Partner',
    startEvent: 'partner_application_start',
    submitEvent: 'partner_application_start',
    successTitle: 'Application received',
    successBody: "Thanks for your interest in partnering. Our partnerships team will be in touch.",
  },
  waitlist: {
    fields: [
      { name: 'fullName', label: 'Full name', type: 'text', required: true },
      { name: 'workEmail', label: 'Work email', type: 'email', required: true },
      { name: 'useCase', label: 'What would you build?', type: 'textarea', placeholder: 'Optional' },
    ],
    schema: z.object({ fullName: req('Full name'), workEmail: email, useCase: z.string().optional().default('') }),
    submitLabel: 'Join the developer waitlist',
    startEvent: 'developer_waitlist_start',
    submitEvent: 'developer_waitlist_start',
    successTitle: "You're on the list",
    successBody: "We'll email you when the developer preview opens.",
  },
};

export function LeadForm({ variant }: { variant: LeadFormVariant }) {
  const config = configs[variant];
  const [started, setStarted] = useState(false);
  const submit = useSubmitLead();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    // config.schema varies per variant; the double cast bridges zod's generic input
    // type to RHF's FieldValues resolver contract without using `any`.
    resolver: zodResolver(config.schema as unknown as z.ZodType<FormValues, FormValues>) as Resolver<FormValues>,
    mode: 'onBlur',
  });

  const onValid = (values: FormValues) => {
    // Honeypot value lives outside the Zod schema; read the raw registered field.
    const withHoneypot = { ...values, company_website: getValues('company_website') ?? '' };
    submit.mutate(
      { variant, values: withHoneypot, source: typeof window !== 'undefined' ? window.location.pathname : undefined },
      { onSuccess: () => track(config.submitEvent, { variant }) },
    );
  };

  const onInvalid = () => track('form_validation_error', { variant });

  const markStarted = () => {
    if (!started) {
      setStarted(true);
      track(config.startEvent, { variant });
    }
  };

  if (submit.isSuccess) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-mkt-lg border border-mkt-success/30 bg-mkt-success/5 p-6" role="status" aria-live="polite">
        <CheckCircle2 className="h-8 w-8 text-mkt-success" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-mkt-ink-900">{config.successTitle}</h3>
        <p className="text-sm text-mkt-ink-700">{config.successBody}</p>
        <p className="text-xs text-mkt-ink-500">
          Your reference: <span className="font-mono font-medium text-mkt-ink-700">{submit.data.referenceId}</span>
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onValid, onInvalid)} onFocus={markStarted} className="flex flex-col gap-4">
      {/* Honeypot: hidden from users & screen readers; bots fill it and get dropped server-side. */}
      <input
        {...register('company_website')}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      {config.fields.map((field) => (
        <FormField key={field.name} id={`${variant}-${field.name}`} label={field.label} error={errors[field.name]?.message as string | undefined} required={field.required} hint={field.hint}>
          {(a11y) =>
            field.type === 'textarea' ? (
              <textarea {...register(field.name)} {...a11y} placeholder={field.placeholder} className={textareaClass} />
            ) : field.type === 'select' ? (
              <select {...register(field.name)} {...a11y} className={inputClass} defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                {field.options!.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <input {...register(field.name)} {...a11y} type={field.type} placeholder={field.placeholder} className={inputClass} />
            )
          }
        </FormField>
      ))}
      {submit.isError && (
        <p role="alert" className="rounded-mkt-md bg-mkt-error/10 px-3 py-2 text-sm font-medium text-mkt-error">
          {submit.error.message}
        </p>
      )}
      <Button type="submit" size="lg" loading={submit.isPending} fullWidth>
        {config.submitLabel}
      </Button>
      <p className="text-xs text-mkt-ink-500">
        By submitting, you agree to our{' '}
        <a href="/legal/privacy" className="underline hover:text-mkt-ink-700">Privacy Policy</a>. No obligation — we never share your details.
      </p>
    </form>
  );
}
