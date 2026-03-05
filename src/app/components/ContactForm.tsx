import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Loader2, X } from 'lucide-react';
import { useI18n } from '../i18n';
import { ease, VP2 } from '../lib/animation';

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COOLDOWN_MS = 60_000;
const MAX_NAME    = 100;
const MAX_EMAIL   = 200;
const MAX_MESSAGE = 2000;

export default function ContactForm() {
  const { t } = useI18n();
  const f = t.contact.form;

  const [values, setValues]     = useState<Fields>({ name: '', email: '', message: '' });
  const [errors, setErrors]     = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const lastSent = useRef<number>(0);

  const validate = (v: Fields): Errors => {
    const e: Errors = {};
    if (!v.name.trim() || v.name.trim().length < 2) e.name    = f.nameError;
    if (!EMAIL_RE.test(v.email))                    e.email   = f.emailError;
    if (!v.message.trim() || v.message.trim().length < 5) e.message = f.messageError;
    return e;
  };

  const isValid = (id: keyof Fields) =>
    submitted && !errors[id] && values[id].trim() !== '';
  const hasError = (id: keyof Fields) =>
    submitted && !!errors[id];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const enviarMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const honey = (e.currentTarget.elements.namedItem('_honey') as HTMLInputElement)?.value;
    if (honey) return;
    if (Date.now() - lastSent.current < COOLDOWN_MS) {
      setErrors({ name: f.spamError });
      return;
    }
    setSubmitted(true);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setEnviando(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    delete data._honey;

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        lastSent.current = Date.now();
        setValues({ name: '', email: '', message: '' });
        setSubmitted(false);
        setErrors({});
        setShowModal(true);
      } else {
        alert(f.error);
      }
    } catch {
      alert(f.error);
    } finally {
      setEnviando(false);
    }
  };

  const topFields = [
    { id: 'name'  as const, label: f.nameLabel,  type: 'text',  placeholder: f.namePlaceholder,  maxLength: MAX_NAME },
    { id: 'email' as const, label: f.emailLabel, type: 'email', placeholder: f.emailPlaceholder, maxLength: MAX_EMAIL },
  ];

  const inputCls = (id: keyof Fields) => {
    const filled = values[id].trim() !== '';
    return (
      'w-full px-3 py-2  text-background text-base border ' +
      'placeholder:text-background/30 ' +
      'focus:outline-none transition-[border-color,background-color] duration-300 ' +
      (hasError(id)
        ? ' border-red-500 focus:border-red-400'
        : isValid(id)
          ? ' border-emerald-400 focus:border-emerald-300'
          : filled
            ? 'bg-transparent border-background/40 focus:border-background/70'
            : 'bg-transparent border-background/20 focus:border-background/60')
    );
  };

  const labelCls = 'block mb-1 text-[0.8rem] font-bold tracking-[0.15em] uppercase text-background/60';
  /* Fixed-height error slot — always rendered to prevent layout shift */
  const ErrorSlot = ({ id, isMsg = false }: { id: keyof Fields; isMsg?: boolean }) => (
    <div className="h-5 mt-1" aria-live="polite">
      <AnimatePresence>
        {hasError(id) && (
          <motion.p
            id={isMsg ? 'message-error' : `${id}-error`}
            role="alert"
            className="text-xs font-bold text-red-500 leading-5"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
          >
            {errors[id]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <form onSubmit={enviarMail} className="space-y-1" noValidate>

        {/* Honeypot */}
        <input
          name="_honey" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0 }}
        />

        {/* Name + Email */}
        {topFields.map((field, i) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, x: 48, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={VP2}
            transition={{ duration: 0.65, delay: 0.08 + i * 0.1, ease }}
          >
            <label htmlFor={field.id} className={labelCls}>{field.label}</label>
            <div className="relative max-w-[500px] lg:max-w-none">
              <input
                type={field.type} id={field.id} name={field.id}
                value={values[field.id]}
                onChange={handleChange}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                aria-invalid={hasError(field.id)}
                aria-describedby={`${field.id}-error`}
                className={inputCls(field.id)}
              />
              <AnimatePresence>
                {isValid(field.id) && (
                  <motion.span
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}
                  >
                    <Check className="w-5 h-5 stroke-[3]" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <ErrorSlot id={field.id} />
          </motion.div>
        ))}

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, x: 48, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={VP2}
          transition={{ duration: 0.65, delay: 0.28, ease }}
        >
          <label htmlFor="message" className={labelCls}>{f.messageLabel}</label>
          <div className="relative max-w-[500px] lg:max-w-none">
            <textarea
              id="message" name="message"
              value={values.message}
              onChange={handleChange}
              rows={5} placeholder={f.messagePlaceholder}
              maxLength={MAX_MESSAGE}
              aria-invalid={hasError('message')}
              aria-describedby="message-error"
              className={`${inputCls('message')} resize-none`}
            />
            <AnimatePresence>
              {isValid('message') && (
                <motion.span
                  className="absolute right-4 top-5 text-emerald-400 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}
                >
                  <Check className="w-5 h-5 stroke-[3]" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <ErrorSlot id="message" isMsg />
        </motion.div>

        {/* Submit */}
        <motion.div
          className=""
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP2}
          transition={{ duration: 0.6, delay: 0.4, ease }}
        >
          <motion.button
            type="submit"
            disabled={enviando}
            className={
              'inline-flex items-center gap-2 px-5 py-3 ' +
              'bg-white text-[#1A1A1A] text-sm font-bold tracking-[0.12em] uppercase ' +
              'border border-white ' +
              'disabled:opacity-40 disabled:cursor-not-allowed'
            }
            whileHover={enviando ? {} : { scale: 1.03, backgroundColor: '#e5e5e5' }}
            whileTap={enviando ? {} : { scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {enviando && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
            <span>{enviando ? f.sending : f.submit}</span>
          </motion.button>
        </motion.div>

      </form>

      {/* ── Success Modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="relative z-10 bg-[#111] border border-white/10 p-10 max-w-sm w-full text-center"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{    opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.3, ease }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white/25 hover:text-white/70 transition-colors"
                aria-label={f.modalClose}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mx-auto mb-7 w-14 h-14 rounded-full border border-emerald-400/25 flex items-center justify-center">
                <Check className="w-6 h-6 text-emerald-400" aria-hidden="true" />
              </div>

              <h3 id="modal-title" className="text-white text-xl font-extrabold tracking-tight mb-3">
                {f.modalTitle}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed mb-8">
                {f.modalText}
              </p>

              <button
                onClick={() => setShowModal(false)}
                className={
                  'px-8 py-3 bg-white text-[#111] text-xs font-bold tracking-[0.12em] uppercase ' +
                  'border border-white transition-[background-color,color] duration-300 ' +
                  'hover:bg-transparent hover:text-white'
                }
              >
                {f.modalClose}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}