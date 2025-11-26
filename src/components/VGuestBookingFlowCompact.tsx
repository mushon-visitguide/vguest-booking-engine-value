import { useState, useEffect, useRef } from "react";
import { ArrowRight, PhoneMissed, CalendarCheck, CheckCheck, MessageCircle, Sun, Moon } from "lucide-react";

// Muted color palette - derived from logo analysis
const colors = {
  // Primary brand - muted peach-orange from logo
  primary: '#e08050',        // Muted warm orange (from logo)
  primaryLight: '#fc9951',   // Logo's main color
  primaryDark: '#c06030',    // Darker accent

  // Step colors - all muted
  missed: '#7a8090',         // Cool blue-gray (neutral, less alarming)
  missedAccent: '#8a92a5',   // Slightly lighter for active state
  whatsapp: '#4a9e7c',       // Muted sage green (instead of bright #25D366)
  whatsappBright: '#25D366', // Keep for WhatsApp icon only
  booking: '#e08050',        // Same as primary
};

// Theme configuration
const themes = {
  dark: {
    bg: '#0d0d12',           // Slightly warmer dark
    bgGradient: 'radial-gradient(ellipse, rgba(224, 128, 80, 0.4) 0%, transparent 70%)',
    cardBg: 'rgba(255,255,255,0.02)',
    cardBgActive: '0.08',
    text: '#ffffff',
    textMuted: 'rgba(255,255,255,0.6)',
    textSubtle: 'rgba(255,255,255,0.3)',
    border: 'rgba(255,255,255,0.05)',
    borderActive: '0.25',
    statColor: '#ffffff',
  },
  light: {
    bg: '#faf9f7',           // Warm off-white
    bgGradient: 'radial-gradient(ellipse, rgba(224, 128, 80, 0.2) 0%, transparent 70%)',
    cardBg: 'rgba(0,0,0,0.02)',
    cardBgActive: '0.05',
    text: '#2a2a35',
    textMuted: 'rgba(42,42,53,0.65)',
    textSubtle: 'rgba(42,42,53,0.4)',
    border: 'rgba(0,0,0,0.06)',
    borderActive: '0.15',
    statColor: '#2a2a35',
  },
};

// WhatsApp icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Premium chat bubble with glow
const ChatBubble = ({ message, isUser, isVisible = true, isNew = false }: { message: string; isUser: boolean; isVisible?: boolean; isNew?: boolean }) => {
  if (!isVisible) return null;

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      style={{
        animation: 'slideIn 0.4s ease forwards',
      }}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 ${
          isUser
            ? 'bg-[#005c4b] rounded-tr-sm'
            : 'bg-[#1f2c34] rounded-tl-sm'
        }`}
        style={{
          boxShadow: isNew ? (isUser ? '0 0 15px rgba(37, 211, 102, 0.25)' : '0 0 15px rgba(255, 255, 255, 0.08)') : 'none',
        }}
      >
        <p className="text-[12px] text-white/95 leading-relaxed">{message}</p>
        <div className={`flex items-center gap-1 mt-0.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-[9px] text-white/40">now</span>
          {isUser && <CheckCheck className="w-3 h-3 text-[#53bdeb]" />}
        </div>
      </div>
    </div>
  );
};

// Premium chat popup with slow reveal
const ChatPopup = ({ isVisible }: { isVisible: boolean }) => {
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messages = [
    { message: "Hi, available tonight?", isUser: true },
    { message: "Yes! Deluxe €149. Book?", isUser: false },
    { message: "Yes please", isUser: true },
    { message: "Done! Confirmed ✓", isUser: false },
  ];

  useEffect(() => {
    if (!isVisible) {
      setStep(0);
      setIsTyping(false);
      return;
    }

    // Show typing indicator, then message
    const showNextMessage = () => {
      if (step >= messages.length) return;

      // Show typing for 1.2 seconds
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setStep((s) => s + 1);
      }, 1200);
    };

    // Initial delay before first message
    const timeout = setTimeout(showNextMessage, step === 0 ? 600 : 1500);
    return () => clearTimeout(timeout);
  }, [isVisible, step, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [step, isTyping]);

  return (
    <div
      className="absolute -top-6 left-1/2 -translate-x-1/2 -translate-y-full z-50"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(-50%, -100%) scale(1)' : 'translate(-50%, -90%) scale(0.95)',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div
        className="w-[300px] rounded-2xl overflow-hidden border border-white/15"
        style={{
          background: 'linear-gradient(180deg, rgba(20,20,25,0.95) 0%, rgba(15,15,20,0.98) 100%)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center">
            <WhatsAppIcon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-white">Grand Hotel AI</div>
            <div className="text-[11px] text-[#25D366] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
              Online
            </div>
          </div>
        </div>

        {/* Chat with scroll */}
        <div
          ref={chatRef}
          className="h-[150px] px-3 py-2 space-y-2 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {messages.map((msg, i) => (
            <ChatBubble
              key={i}
              message={msg.message}
              isUser={msg.isUser}
              isVisible={i < step}
              isNew={i === step - 1}
            />
          ))}

          {/* Typing indicator - small dots */}
          {isTyping && (
            <div className="flex justify-start" style={{ animation: 'fadeIn 0.3s ease' }}>
              <div className="bg-[#1f2c34] rounded-2xl rounded-tl-sm px-3 py-2">
                <div className="flex gap-0.5 items-center">
                  <span className="w-1 h-1 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.6s' }}></span>
                  <span className="w-1 h-1 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.6s' }}></span>
                  <span className="w-1 h-1 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.6s' }}></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Success indicator */}
        <div className="px-3 pb-3 h-[36px]">
          {step >= messages.length && !isTyping && (
            <div className="flex justify-center" style={{ animation: 'fadeIn 0.5s ease' }}>
              <div className="bg-[#25D366]/20 text-[#25D366] text-[11px] px-4 py-1.5 rounded-full font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                Booking Confirmed
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Arrow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 border-r border-b border-white/15"
        style={{ background: 'rgba(15,15,20,0.98)' }}
      />
    </div>
  );
};

// Missed call popup with animation
const MissedCallPopup = ({ isVisible }: { isVisible: boolean }) => {
  const [ringCount, setRingCount] = useState(0);
  const [showSent, setShowSent] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setRingCount(0);
      setShowSent(false);
      return;
    }

    // Animate ring count
    const ringInterval = setInterval(() => {
      setRingCount((c) => {
        if (c >= 4) {
          clearInterval(ringInterval);
          setTimeout(() => setShowSent(true), 400);
          return 4;
        }
        return c + 1;
      });
    }, 500);

    return () => clearInterval(ringInterval);
  }, [isVisible]);

  return (
    <div
      className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full z-50"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(-50%, -100%) scale(1)' : 'translate(-50%, -90%) scale(0.95)',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div
        className="w-[200px] rounded-2xl overflow-hidden border border-white/15 p-4"
        style={{
          background: 'linear-gradient(180deg, rgba(20,20,25,0.95) 0%, rgba(15,15,20,0.98) 100%)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Phone icon with ring animation */}
        <div className="flex justify-center mb-3">
          <div
            className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center"
            style={{
              animation: ringCount > 0 && ringCount < 4 ? 'phoneRing 0.3s ease-in-out' : 'none',
            }}
          >
            <PhoneMissed className="w-6 h-6 text-red-400" />
          </div>
        </div>

        {/* Ring counter */}
        <div className="text-center mb-3">
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: i <= ringCount ? '#ef4444' : 'rgba(255,255,255,0.2)',
                  boxShadow: i <= ringCount ? '0 0 8px rgba(239,68,68,0.5)' : 'none',
                }}
              />
            ))}
          </div>
          <p className="text-white/70 text-[11px]">
            {ringCount < 4 ? `Ringing... ${ringCount}/4` : 'No answer'}
          </p>
        </div>

        {/* WhatsApp sent notification */}
        <div
          className="flex items-center justify-center gap-2 py-2 rounded-lg"
          style={{
            opacity: showSent ? 1 : 0,
            transform: showSent ? 'translateY(0)' : 'translateY(4px)',
            transition: 'all 0.4s ease',
            background: showSent ? 'rgba(37, 211, 102, 0.15)' : 'transparent',
          }}
        >
          <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
          <span className="text-[#25D366] text-[11px] font-medium">Message sent!</span>
        </div>
      </div>
      {/* Arrow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 border-r border-b border-white/15"
        style={{ background: 'rgba(15,15,20,0.98)' }}
      />
    </div>
  );
};

// Booking Engine popup with animation
const BookingEnginePopup = ({ isVisible }: { isVisible: boolean }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setStep(0);
      return;
    }

    const steps = [1, 2, 3, 4];
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep > steps.length) {
        clearInterval(interval);
        return;
      }
      setStep(currentStep);
    }, 600);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div
      className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full z-50"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(-50%, -100%) scale(1)' : 'translate(-50%, -90%) scale(0.95)',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div
        className="w-[220px] rounded-2xl overflow-hidden border border-white/15 p-4"
        style={{
          background: 'linear-gradient(180deg, rgba(20,20,25,0.95) 0%, rgba(15,15,20,0.98) 100%)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-3">
          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Powered by</div>
          <div style={{ color: colors.primary }} className="font-bold text-sm tracking-wide">Booking Engine</div>
        </div>

        {/* Progress steps */}
        <div className="space-y-2 mb-3">
          {[
            { label: 'Checking availability', icon: '🔍' },
            { label: 'Reserving room', icon: '🏨' },
            { label: 'Processing payment', icon: '💳' },
            { label: 'Confirming booking', icon: '✓' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-300"
              style={{
                opacity: step > i ? 1 : 0.3,
                background: step > i ? 'rgba(224, 128, 80, 0.1)' : 'transparent',
                transform: step > i ? 'translateX(0)' : 'translateX(-4px)',
              }}
            >
              <span className="text-xs">{item.icon}</span>
              <span className="text-[11px] text-white/80">{item.label}</span>
              {step > i && (
                <span className="ml-auto text-xs" style={{ color: colors.whatsapp }}>✓</span>
              )}
            </div>
          ))}
        </div>

        {/* Success */}
        <div
          className="flex items-center justify-center gap-2 py-2 rounded-lg"
          style={{
            opacity: step >= 4 ? 1 : 0,
            transform: step >= 4 ? 'translateY(0)' : 'translateY(4px)',
            transition: 'all 0.4s ease',
            background: step >= 4 ? 'rgba(224, 128, 80, 0.12)' : 'transparent',
          }}
        >
          <CalendarCheck className="w-4 h-4" style={{ color: colors.primary }} />
          <span style={{ color: colors.primary }} className="text-[11px] font-semibold">Direct Booking!</span>
        </div>
      </div>
      {/* Arrow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 border-r border-b border-white/15"
        style={{ background: 'rgba(15,15,20,0.98)' }}
      />
    </div>
  );
};

// Progress dots component - muted colors with smooth transitions
const ProgressDots = ({ activeStep, totalSteps, isDark }: { activeStep: number; totalSteps: number; isDark: boolean }) => {
  const dotColors = [colors.missedAccent, colors.whatsapp, colors.booking];
  return (
    <div className="flex items-center justify-center gap-2.5 mt-10">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === activeStep ? '28px' : '8px',
            height: '8px',
            borderRadius: '4px',
            background: i === activeStep
              ? dotColors[i]
              : i < activeStep
                ? (isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)')
                : (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'),
            boxShadow: i === activeStep
              ? `0 0 12px ${dotColors[i]}50`
              : 'none',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      ))}
    </div>
  );
};

// Step label - minimal text only, left-aligned
const StepLabel = ({ label, isActive, color, isDark }: { label: string; isActive: boolean; color: string; isDark: boolean }) => (
  <div className="mt-3 w-full">
    <span
      className="text-xs font-medium tracking-wide"
      style={{
        color: isActive ? color : (isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'),
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {label}
    </span>
  </div>
);

// Sequential Flow Demo - focuses on one step at a time
const SequentialFlowDemo = ({ isDark }: { isDark: boolean }) => {
  const [activeStep, setActiveStep] = useState(0); // 0, 1, 2
  const [subStep, setSubStep] = useState(0);

  // Timing with breathing room (balanced pace)
  // Step 0: 3.5s (missed call), Step 1: 5.5s (chat conversation), Step 2: 5s (revenue reveal)
  useEffect(() => {
    const durations = [3500, 5500, 5000];
    const advanceStep = () => {
      setSubStep(0);
      setActiveStep((prev) => (prev + 1) % 3);
    };
    const timer = setTimeout(advanceStep, durations[activeStep]);
    return () => clearTimeout(timer);
  }, [activeStep]);

  // Sub-step animation - balanced reveals
  useEffect(() => {
    const maxSubSteps = activeStep === 0 ? 5 : activeStep === 1 ? 4 : 2;
    // Substep timing: missed call 450ms, chat: 1100ms, revenue: 800ms (faster reveal)
    const subStepDuration = activeStep === 0 ? 450 : activeStep === 1 ? 1100 : 800;
    if (subStep < maxSubSteps) {
      const timer = setTimeout(() => setSubStep((s) => s + 1), subStepDuration);
      return () => clearTimeout(timer);
    }
  }, [activeStep, subStep]);

  // Muted step colors - much more subtle
  const stepColors = [colors.missed, colors.whatsapp, colors.booking];
  const inactiveBg = isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.02)';
  const inactiveBorder = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';
  const textMuted = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)';
  const textSubtle = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center gap-3 lg:gap-5">
      {/* Step 1: Missed Call */}
      <div
        className="flex flex-col items-center"
        style={{
          transform: activeStep === 0 ? 'scale(1)' : 'scale(0.95)',
          opacity: activeStep === 0 ? 1 : 0.6,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden"
          style={{
            width: '200px',
            height: '220px',
            background: activeStep === 0
              ? subStep >= 5
                ? `linear-gradient(180deg, rgba(74, 158, 124, ${isDark ? '0.12' : '0.1'}) 0%, rgba(74, 158, 124, 0.03) 100%)`
                : `linear-gradient(180deg, rgba(122, 128, 144, ${isDark ? '0.12' : '0.1'}) 0%, rgba(122, 128, 144, 0.03) 100%)`
              : inactiveBg,
            border: `1px solid ${activeStep === 0
              ? subStep >= 5
                ? `rgba(74, 158, 124, ${isDark ? '0.3' : '0.2'})`
                : `rgba(122, 128, 144, ${isDark ? '0.3' : '0.2'})`
              : inactiveBorder}`,
            ['--glow-color' as string]: subStep >= 5
              ? `rgba(74, 158, 124, ${isDark ? '0.2' : '0.15'})`
              : `rgba(122, 128, 144, ${isDark ? '0.18' : '0.12'})`,
            animation: activeStep === 0 ? 'subtleGlow 3s ease-in-out infinite' : 'none',
            boxShadow: activeStep === 0
              ? subStep >= 5
                ? `0 0 40px rgba(74, 158, 124, ${isDark ? '0.18' : '0.12'})`
                : `0 0 40px rgba(122, 128, 144, ${isDark ? '0.15' : '0.1'})`
              : 'none',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {activeStep === 0 ? (
            subStep < 5 ? (
              /* Phase 1: Phone ringing → No Answer */
              <>
                <div
                  className="rounded-full flex items-center justify-center mb-4 relative z-10"
                  style={{
                    width: '64px',
                    height: '64px',
                    background: `rgba(122, 128, 144, ${isDark ? '0.25' : '0.18'})`,
                    boxShadow: '0 0 20px rgba(122, 128, 144, 0.3)',
                  }}
                >
                  <PhoneMissed className="w-8 h-8" style={{ color: colors.missedAccent }} />
                </div>
                <div className="flex gap-2 mb-3 justify-center">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        background: i <= subStep ? colors.missedAccent : textSubtle,
                        boxShadow: i <= subStep ? `0 0 12px ${colors.missedAccent}60` : 'none',
                        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  ))}
                </div>
                <p
                  className="text-sm font-medium transition-all duration-300"
                  style={{
                    color: textMuted,
                    opacity: subStep >= 4 ? 1 : 0,
                  }}
                >
                  No Answer
                </p>
              </>
            ) : (
              /* Phase 2: Forward to WhatsApp → Sent */
              <div className="flex flex-col items-center" style={{ animation: 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <div
                  className="rounded-full flex items-center justify-center mb-4"
                  style={{
                    width: '64px',
                    height: '64px',
                    background: colors.whatsappBright,
                    boxShadow: '0 0 30px rgba(37, 211, 102, 0.5)',
                  }}
                >
                  <WhatsAppIcon className="w-8 h-8 text-white" />
                </div>
                <p style={{ color: colors.whatsapp }} className="text-base font-bold">Forward to AI Chat</p>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center" style={{ opacity: 0.5, filter: 'blur(0.5px)' }}>
              <div
                className="rounded-full flex items-center justify-center mb-4"
                style={{
                  width: '64px',
                  height: '64px',
                  background: colors.whatsappBright,
                }}
              >
                <WhatsAppIcon className="w-8 h-8 text-white" />
              </div>
              <p style={{ color: colors.whatsapp }} className="text-base font-bold">Forward to AI Chat</p>
            </div>
          )}
        </div>
              </div>

      {/* Connector 1 */}
      <div className="flex items-center gap-1 px-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-500"
            style={{
              background: activeStep >= 1
                ? colors.whatsapp
                : (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'),
              opacity: activeStep >= 1 ? 0.6 - i * 0.15 : 0.4,
            }}
          />
        ))}
      </div>

      {/* Step 2: WhatsApp Chat */}
      <div
        className="flex flex-col items-center"
        style={{
          transform: activeStep === 1 ? 'scale(1.05)' : 'scale(0.92)',
          opacity: activeStep === 1 ? 1 : 0.6,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="rounded-2xl overflow-hidden flex flex-col relative"
          style={{
            width: '260px',
            height: '300px',
            background: activeStep === 1
              ? `linear-gradient(180deg, rgba(74, 158, 124, ${isDark ? '0.1' : '0.08'}) 0%, rgba(74, 158, 124, 0.02) 100%)`
              : inactiveBg,
            border: `1px solid ${activeStep === 1 ? `rgba(74, 158, 124, ${isDark ? '0.25' : '0.18'})` : inactiveBorder}`,
            ['--glow-color' as string]: `rgba(74, 158, 124, ${isDark ? '0.2' : '0.15'})`,
            animation: activeStep === 1 ? 'subtleGlow 3s ease-in-out infinite' : 'none',
            boxShadow: activeStep === 1
              ? `0 0 40px rgba(74, 158, 124, ${isDark ? '0.15' : '0.1'})`
              : 'none',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-2 px-3 py-2 border-b transition-all duration-500"
            style={{ borderColor: activeStep === 1 ? `rgba(74, 158, 124, ${isDark ? '0.15' : '0.1'})` : inactiveBorder }}
          >
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: '28px',
                height: '28px',
                background: colors.whatsappBright,
              }}
            >
              <WhatsAppIcon className="text-white w-4 h-4" />
            </div>
            <span style={{ color: textMuted }} className="font-semibold text-xs">vGuest AI</span>
          </div>

          {/* 4-message chat */}
          <div className="flex-1 px-2 pt-2 pb-6 flex flex-col justify-evenly overflow-hidden">
            {activeStep === 1 ? (
              <>
                {/* Typing indicator before first message */}
                {subStep === 0 && (
                  <div className="flex justify-start items-center gap-1" style={{ animation: 'fadeIn 0.3s ease' }}>
                    <span className="text-xs font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}>typing</span>
                    <div className="flex gap-[2px] items-center">
                      <span className="w-[3px] h-[3px] rounded-full animate-bounce" style={{ background: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)', animationDelay: '0ms', animationDuration: '0.5s' }}></span>
                      <span className="w-[3px] h-[3px] rounded-full animate-bounce" style={{ background: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)', animationDelay: '120ms', animationDuration: '0.5s' }}></span>
                      <span className="w-[3px] h-[3px] rounded-full animate-bounce" style={{ background: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)', animationDelay: '240ms', animationDuration: '0.5s' }}></span>
                    </div>
                  </div>
                )}
                {[
                  { text: "How can I help?", isUser: false },
                  { text: "Tomorrow, 2 guests?", isUser: true },
                  { text: "Deluxe €149 available!", isUser: false },
                  { text: "Book it!", isUser: true },
                ].map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                    style={{
                      opacity: i < subStep ? 1 : 0,
                      transform: i < subStep ? 'translateY(0)' : 'translateY(10px)',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <div
                      className={`px-3 py-2 rounded-lg text-sm ${msg.isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
                      style={{
                        background: msg.isUser
                          ? (isDark ? '#005c4b' : '#4a9e7c')
                          : (isDark ? '#1f2c34' : 'rgba(0,0,0,0.08)'),
                        color: msg.isUser
                          ? 'rgba(255,255,255,0.95)'
                          : (isDark ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.85)'),
                      }}
                    >
                      <span className="font-medium">{msg.text}</span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="flex flex-col justify-start gap-1.5 h-full" style={{ opacity: 0.5, filter: 'blur(0.5px)' }}>
                {[
                  { text: "How can I help?", isUser: false },
                  { text: "Tomorrow, 2 guests?", isUser: true },
                  { text: "Deluxe €149 available!", isUser: false },
                  { text: "Book it!", isUser: true },
                ].map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`px-3 py-2 rounded-lg text-sm ${msg.isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
                      style={{
                        background: msg.isUser
                          ? (isDark ? '#005c4b' : '#4a9e7c')
                          : (isDark ? '#1f2c34' : 'rgba(0,0,0,0.08)'),
                        color: msg.isUser
                          ? 'rgba(255,255,255,0.95)'
                          : (isDark ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.85)'),
                      }}
                    >
                      <span className="font-medium">{msg.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
              </div>

      {/* Connector 2 */}
      <div className="flex items-center gap-1 px-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-500"
            style={{
              background: activeStep >= 2
                ? colors.booking
                : (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'),
              opacity: activeStep >= 2 ? 0.6 - i * 0.15 : 0.4,
            }}
          />
        ))}
      </div>

      {/* Step 3: Direct Revenue */}
      <div
        className="flex flex-col items-center"
        style={{
          transform: activeStep === 2 ? 'scale(1)' : 'scale(0.95)',
          opacity: activeStep === 2 ? 1 : 0.6,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden"
          style={{
            width: '200px',
            height: '220px',
            background: activeStep === 2
              ? `linear-gradient(180deg, rgba(224, 128, 80, ${isDark ? '0.12' : '0.1'}) 0%, rgba(224, 128, 80, 0.03) 100%)`
              : inactiveBg,
            border: `1px solid ${activeStep === 2 ? `rgba(224, 128, 80, ${isDark ? '0.3' : '0.2'})` : inactiveBorder}`,
            ['--glow-color' as string]: `rgba(224, 128, 80, ${isDark ? '0.22' : '0.15'})`,
            animation: activeStep === 2 ? 'subtleGlow 3s ease-in-out infinite' : 'none',
            boxShadow: activeStep === 2
              ? `0 0 40px rgba(224, 128, 80, ${isDark ? '0.18' : '0.12'})`
              : 'none',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {activeStep === 2 ? (
            subStep < 2 ? (
              /* Phase 1: Almost Lost - tension */
              <div className="flex flex-col items-center justify-center h-full">
                <div
                  className="rounded-full flex items-center justify-center mb-4"
                  style={{
                    width: '64px',
                    height: '64px',
                    background: `rgba(239, 68, 68, ${isDark ? '0.2' : '0.15'})`,
                    boxShadow: '0 0 20px rgba(239, 68, 68, 0.25)',
                    opacity: subStep >= 1 ? 1 : 0,
                    transform: subStep >= 1 ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <PhoneMissed className="w-7 h-7" style={{ color: '#ef4444' }} />
                </div>
                <p
                  className="text-base font-bold"
                  style={{
                    color: '#ef4444',
                    opacity: subStep >= 1 ? 1 : 0,
                    transform: subStep >= 1 ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                  }}
                >
                  Almost Lost
                </p>
              </div>
            ) : (
              /* Phase 2: €149 Secured - relief */
              <div className="flex flex-col items-center justify-center h-full" style={{ animation: 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <div
                  className="rounded-full flex items-center justify-center mb-4"
                  style={{
                    width: '64px',
                    height: '64px',
                    background: `rgba(74, 158, 124, ${isDark ? '0.25' : '0.18'})`,
                    boxShadow: '0 0 20px rgba(74, 158, 124, 0.3)',
                  }}
                >
                  <CalendarCheck className="w-8 h-8" style={{ color: '#25D366' }} />
                </div>
                <p
                  className="text-lg font-bold"
                  style={{ color: '#25D366' }}
                >
                  €149 Secured
                </p>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full" style={{ opacity: 0.5, filter: 'blur(0.5px)' }}>
              <div
                className="rounded-full flex items-center justify-center mb-3"
                style={{
                  width: '48px',
                  height: '48px',
                  background: `rgba(74, 158, 124, ${isDark ? '0.2' : '0.15'})`,
                  border: `1px solid rgba(74, 158, 124, ${isDark ? '0.3' : '0.2'})`,
                }}
              >
                <CalendarCheck className="w-6 h-6" style={{ color: colors.whatsapp }} />
              </div>
              <p className="text-sm font-bold" style={{ color: colors.whatsapp }}>
                €149 Secured
              </p>
            </div>
          )}
        </div>
              </div>
      </div>
    </div>
  );
};

// Clean arrow connector (kept for potential future use)
const FlowArrow = ({ fromColor, toColor }: { fromColor: string; toColor: string }) => (
  <div className="flex items-center px-1 lg:px-2">
    <div
      className="w-8 lg:w-12 h-[1px]"
      style={{ background: `linear-gradient(90deg, ${fromColor}40, ${toColor}40)` }}
    />
    <ArrowRight
      className="w-4 h-4 -ml-0.5 text-white/30"
    />
  </div>
);

// Stat card - clean typography
const StatCard = ({ value, label, color, labelColor }: { value: string; label: string; color: string; labelColor: string }) => (
  <div className="text-center">
    <div
      className="text-2xl lg:text-3xl font-bold transition-colors duration-500"
      style={{ color }}
    >
      {value}
    </div>
    <div className="text-[11px] mt-1 uppercase tracking-wide transition-colors duration-500" style={{ color: labelColor }}>{label}</div>
  </div>
);

export default function VGuestBookingFlowCompact() {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? themes.dark : themes.light;

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden flex flex-col transition-colors duration-500"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Clean gradient background - subtle warm glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main top glow - warm muted */}
        <div
          className="absolute w-[1200px] h-[600px] rounded-full -top-[300px] left-1/2 -translate-x-1/2 transition-opacity duration-500"
          style={{
            background: theme.bgGradient,
            filter: "blur(120px)",
            opacity: isDark ? 0.12 : 0.2,
          }}
        />
        {/* Subtle secondary glow */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full top-1/3 -right-[100px] transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle, rgba(224, 128, 80, 0.4) 0%, transparent 70%)",
            filter: "blur(100px)",
            opacity: isDark ? 0.06 : 0.1,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col max-w-6xl mx-auto w-full px-8 lg:px-12">

        {/* Header */}
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img
              src="https://dashboard.visitguide.ai/logo.png"
              alt="vGuest"
              className="h-10 w-auto"
              style={{ filter: isDark ? 'brightness(1.1)' : 'brightness(0.9)' }}
            />
            <span style={{ color: theme.text }} className="text-xl font-bold tracking-tight">vGuest</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-xl transition-all duration-300"
              style={{
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              }}
            >
              {isDark ? (
                <Sun className="w-5 h-5" style={{ color: colors.primaryLight }} />
              ) : (
                <Moon className="w-5 h-5" style={{ color: '#1a1a2e' }} />
              )}
            </button>
            <button
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white"
              style={{
                background: `linear-gradient(180deg, ${colors.primaryLight} 0%, ${colors.primaryDark} 100%)`,
                boxShadow: '0 1px 0 0 rgba(255,255,255,0.2) inset, 0 -1px 0 0 rgba(0,0,0,0.15) inset, 0 2px 8px rgba(224, 128, 80, 0.25)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 1px 0 0 rgba(255,255,255,0.2) inset, 0 -1px 0 0 rgba(0,0,0,0.15) inset, 0 4px 12px rgba(224, 128, 80, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 0 0 rgba(255,255,255,0.2) inset, 0 -1px 0 0 rgba(0,0,0,0.15) inset, 0 2px 8px rgba(224, 128, 80, 0.25)';
              }}
            >
              Book a Demo
            </button>
          </div>
        </header>

        {/* Hero Section - Clean */}
        <main className="min-h-screen flex flex-col items-center pt-4 lg:pt-6">

          {/* Badge + Headline - aligned left */}
          <div className="w-full flex flex-col items-start">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
              style={{
                background: isDark ? 'rgba(100, 140, 200, 0.12)' : 'rgba(100, 140, 200, 0.08)',
                border: `1px solid ${isDark ? 'rgba(100, 140, 200, 0.2)' : 'rgba(100, 140, 200, 0.15)'}`,
                animation: 'heroFadeIn 0.6s ease-out',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: isDark ? '#7aa2d4' : '#5a8ac4' }}
              />
              <span
                className="text-[11px] font-semibold"
                style={{ color: isDark ? '#7aa2d4' : '#5a8ac4' }}
              >
                AI-Powered Booking Assistant
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-left leading-[1.1] tracking-tight mb-3" style={{ animation: 'heroFadeIn 0.8s ease-out 0.1s both' }}>
              <span className="block transition-colors duration-500" style={{ color: theme.text }}>
                Never Lose a Booking
              </span>
              <span
                className="block mt-1 bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
                }}
              >
                to a Missed Call
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p
            className="text-left text-lg lg:text-xl mb-8 max-w-2xl leading-relaxed transition-colors duration-500 w-full"
            style={{ color: theme.textMuted, animation: 'heroFadeIn 0.8s ease-out 0.2s both' }}
          >
            AI answers on WhatsApp. Guests book direct. You keep the commission.
          </p>

          {/* === MAIN FLOW - Animation === */}
          <div className="mb-8" style={{ animation: 'heroFadeIn 0.8s ease-out 0.3s both' }}>
            <SequentialFlowDemo isDark={isDark} />
          </div>

          {/* CTA - Only button */}
          <button
            className="group flex items-center gap-3 px-10 py-4 rounded-xl text-base font-semibold text-white mb-3"
            style={{
              animation: 'heroFadeIn 0.8s ease-out 0.4s both',
              background: `linear-gradient(180deg, ${colors.primaryLight} 0%, ${colors.primaryDark} 100%)`,
              boxShadow: `0 1px 0 0 rgba(255,255,255,0.25) inset, 0 -2px 0 0 rgba(0,0,0,0.2) inset, 0 4px 20px rgba(224, 128, 80, ${isDark ? '0.4' : '0.3'})`,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 1px 0 0 rgba(255,255,255,0.25) inset, 0 -2px 0 0 rgba(0,0,0,0.2) inset, 0 8px 30px rgba(224, 128, 80, ${isDark ? '0.5' : '0.4'})`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 1px 0 0 rgba(255,255,255,0.25) inset, 0 -2px 0 0 rgba(0,0,0,0.2) inset, 0 4px 20px rgba(224, 128, 80, ${isDark ? '0.4' : '0.3'})`;
            }}
          >
            <span className="tracking-wide">Get a Demo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          <span className="text-sm transition-colors duration-500" style={{ color: theme.textSubtle, animation: 'heroFadeIn 0.8s ease-out 0.5s both' }}>Free · No commitment</span>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
            style={{ animation: 'heroFadeIn 0.8s ease-out 0.7s both' }}
          >
            <div
              className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }}
            >
              <div
                className="w-1 h-2 rounded-full"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)',
                  animation: 'scrollPulse 2s ease-in-out infinite'
                }}
              />
            </div>
          </div>
        </main>

        {/* Second Section - Stats & Social Proof */}
        <section
          className="min-h-[50vh] flex flex-col items-center justify-center py-20 relative"
          style={{
            background: isDark
              ? 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)'
              : 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0.02) 100%)',
          }}
        >
          {/* Section title */}
          <h2
            className="text-2xl lg:text-3xl font-bold text-center mb-12 transition-colors duration-500"
            style={{ color: theme.text }}
          >
            Why Hotels Choose vGuest
          </h2>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-12 lg:gap-20 mb-16">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2" style={{ color: theme.statColor }}>98%</div>
              <div className="text-sm" style={{ color: theme.textMuted }}>WhatsApp Open Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2" style={{ color: theme.statColor }}>100%</div>
              <div className="text-sm" style={{ color: theme.textMuted }}>Call Capture</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2" style={{ color: colors.whatsapp }}>€15+</div>
              <div className="text-sm" style={{ color: theme.textMuted }}>Saved Per Booking</div>
            </div>
          </div>

          {/* Social proof */}
          <div className="flex flex-col items-center gap-4">
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
            >
              Trusted by leading hotels
            </span>
            <div className="flex items-center gap-8">
              {['Jo Hotel', 'Numa', 'Hamat Gader'].map((name) => (
                <span
                  key={name}
                  className="text-lg font-semibold transition-colors duration-500"
                  style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Animations - using spring-like easing (Josh Comeau's principle) */}
      <style>{`
        /* Natural spring-like easing curve */
        :root {
          --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
          --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
          --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes phoneRing {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-12deg); }
          40% { transform: rotate(12deg); }
          60% { transform: rotate(-8deg); }
          80% { transform: rotate(8deg); }
        }

        /* Subtle breathing glow for active cards */
        @keyframes subtleGlow {
          0%, 100% {
            box-shadow: 0 0 30px var(--glow-color);
          }
          50% {
            box-shadow: 0 0 50px var(--glow-color);
          }
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.6; transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
}
