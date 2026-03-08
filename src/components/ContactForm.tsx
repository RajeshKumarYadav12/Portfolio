import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, Loader2, User, Mail, Phone, MessageSquare, FileText } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── EmailJS Configuration ────────────────────────────────────────────────────
// 1. Sign up at https://www.emailjs.com (free tier allows 200 emails/month)
// 2. Create a Gmail service and connect it to yrajeshkumar799@gmail.com
// 3. Create an email template with variables:
//    {{message_number}}, {{from_name}}, {{from_email}}, {{phone}},
//    {{subject}}, {{message}}, {{to_email}}
// 4. Replace the three constants below with your actual IDs from the dashboard
const EMAILJS_SERVICE_ID  = 'service_4gu7ogh';    // ✅ confirmed
const EMAILJS_TEMPLATE_ID = 'template_75t8ak9';  // ✅ confirmed
const EMAILJS_PUBLIC_KEY  = 'kUN_NOiv3ONVueuSM'; // ✅ confirmed

function generateMessageNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'MSG-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  theme: 'dark' | 'light';
}

export function ContactForm({ theme }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [messageNumber, setMessageNumber] = useState('');

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (form.phone && !/^[+\d\s\-()]{7,15}$/.test(form.phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const msgNumber = generateMessageNumber();
    setStatus('loading');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          message_number: msgNumber,
          from_name:      form.name,
          from_email:     form.email,
          phone:          form.phone || 'Not provided',
          subject:        form.subject,
          message:        form.message,
          to_email:       'yrajeshkumar799@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );

      setMessageNumber(msgNumber);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputBase = cn(
    'w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:opacity-40',
    theme === 'dark'
      ? 'bg-white/5 border-white/10 text-white focus:border-emerald-500/60 focus:bg-white/8'
      : 'bg-white border-black/10 text-slate-900 focus:border-emerald-500/60 shadow-sm'
  );

  const errorClass = 'border-red-500/60 focus:border-red-500/60';

  const fields = [
    { id: 'name',    label: 'Full Name',     type: 'text',  icon: User,          placeholder: 'Rajesh Kumar Yadav', required: true },
    { id: 'email',   label: 'Email Address', type: 'email', icon: Mail,          placeholder: 'you@example.com',   required: true },
    { id: 'phone',   label: 'Phone Number',  type: 'tel',   icon: Phone,         placeholder: '+91 98765 43210',   required: false },
    { id: 'subject', label: 'Subject',       type: 'text',  icon: FileText,      placeholder: 'What is this about?', required: true },
  ] as const;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              'rounded-3xl border p-6 sm:p-8 md:p-10 text-center flex flex-col items-center gap-6',
              theme === 'dark' ? 'bg-white/3 border-white/10' : 'bg-white border-black/8 shadow-xl'
            )}
          >
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight mb-2">Message Sent!</h3>
              <p className={cn('text-sm mb-4', theme === 'dark' ? 'text-white/50' : 'text-slate-500')}>
                Thanks for reaching out. I'll get back to you soon.
              </p>
              <div className={cn(
                'inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-mono text-sm font-bold',
                theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              )}>
                <span className={cn('text-xs uppercase tracking-widest font-bold', theme === 'dark' ? 'text-white/40' : 'text-slate-400')}>Reference&nbsp;#</span>
                {messageNumber}
              </div>
            </div>
            <p className={cn('text-xs', theme === 'dark' ? 'text-white/30' : 'text-slate-400')}>
              Save your reference number for follow-up inquiries.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className={cn(
                'px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer',
                theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'
              )}
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            noValidate
            className={cn(
              'rounded-3xl border p-5 sm:p-8 md:p-10 space-y-5 sm:space-y-6',
              theme === 'dark' ? 'bg-white/3 border-white/10' : 'bg-white border-black/8 shadow-xl'
            )}
          >
            {/* Error banner */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Something went wrong. Please try again or email me directly.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fields.slice(0, 2).map(({ id, label, type, icon: Icon, placeholder, required }) => (
                <div key={id}>
                  <label className={cn('flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-2', theme === 'dark' ? 'text-white/50' : 'text-slate-400')}>
                    <Icon className="w-3 h-3 text-emerald-500" />
                    {label}
                    {required && <span className="text-emerald-500">*</span>}
                  </label>
                  <input
                    type={type}
                    name={id}
                    value={form[id]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={cn(inputBase, errors[id] && errorClass)}
                    autoComplete={id === 'email' ? 'email' : 'name'}
                  />
                  {errors[id] && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors[id]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Phone + Subject row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fields.slice(2, 4).map(({ id, label, type, icon: Icon, placeholder, required }) => (
                <div key={id}>
                  <label className={cn('flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-2', theme === 'dark' ? 'text-white/50' : 'text-slate-400')}>
                    <Icon className="w-3 h-3 text-emerald-500" />
                    {label}
                    {required && <span className="text-emerald-500">*</span>}
                  </label>
                  <input
                    type={type}
                    name={id}
                    value={form[id]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={cn(inputBase, errors[id] && errorClass)}
                    autoComplete={id === 'phone' ? 'tel' : 'off'}
                  />
                  {errors[id] && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors[id]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Message */}
            <div>
              <label className={cn('flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-2', theme === 'dark' ? 'text-white/50' : 'text-slate-400')}>
                <MessageSquare className="w-3 h-3 text-emerald-500" />
                Message <span className="text-emerald-500">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, opportunity, or just say hi..."
                rows={5}
                className={cn(inputBase, 'resize-none leading-relaxed', errors.message && errorClass)}
              />
              <div className="flex justify-between mt-1">
                {errors.message ? (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                ) : <span />}
                <span className={cn('text-xs font-mono', theme === 'dark' ? 'text-white/20' : 'text-slate-300')}>
                  {form.message.length} chars
                </span>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
              whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
              className={cn(
                'w-full py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-lg shadow-emerald-500/10',
                status === 'loading'
                  ? 'opacity-70 cursor-not-allowed bg-emerald-600 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-white'
              )}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </motion.button>

            <p className={cn('text-center text-xs', theme === 'dark' ? 'text-white/20' : 'text-slate-300')}>
              A unique message reference number will be generated upon submission.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
