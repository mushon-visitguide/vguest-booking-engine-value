import { useState, useEffect } from "react";
import { ArrowRight, PhoneCall, CalendarCheck, Sun, Moon } from "lucide-react";

// Muted color palette - derived from logo analysis
const colors = {
  // Primary brand - muted peach-orange from logo
  primary: '#e08050',        // Muted warm orange (from logo)
  primaryLight: '#fc9951',   // Logo's main color
  primaryDark: '#c06030',    // Darker accent

  // Step colors - all muted
  missed: '#c45a5a',         // Soft muted red for missed call
  missedAccent: '#d97676',   // Softer red for active state
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

// Card Stack Demo - swipeable cards showing one at a time
const CardStackDemo = ({ isDark }: { isDark: boolean }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [subStep, setSubStep] = useState(0);

  // Timing
  useEffect(() => {
    const durations = [6500, 5500, 5000];
    const advanceStep = () => {
      setSubStep(0);
      setActiveStep((prev) => (prev + 1) % 3);
    };
    const timer = setTimeout(advanceStep, durations[activeStep]);
    return () => clearTimeout(timer);
  }, [activeStep]);

  // Sub-step animation
  useEffect(() => {
    const maxSubSteps = activeStep === 0 ? 8 : activeStep === 1 ? 4 : 5;
    // Slower subSteps for step 0 to give time to see animations
    const subStepDuration = activeStep === 0 ? 800 : activeStep === 1 ? 1100 : activeStep === 2 ? 800 : 400;
    if (subStep < maxSubSteps) {
      const timer = setTimeout(() => setSubStep((s) => s + 1), subStepDuration);
      return () => clearTimeout(timer);
    }
  }, [activeStep, subStep]);

  const textMuted = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)';
  const textSubtle = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';

  // Card definitions
  const cards = [
    {
      id: 0,
      title: 'Missed Call',
      glowColor: subStep >= 5 ? 'rgba(74, 158, 124, 0.2)' : 'rgba(122, 128, 144, 0.18)',
      borderColor: subStep >= 5 ? `rgba(74, 158, 124, ${isDark ? '0.3' : '0.2'})` : `rgba(122, 128, 144, ${isDark ? '0.3' : '0.2'})`,
      bgGradient: subStep >= 5
        ? `linear-gradient(180deg, rgba(74, 158, 124, ${isDark ? '0.12' : '0.1'}) 0%, rgba(74, 158, 124, 0.03) 100%)`
        : `linear-gradient(180deg, rgba(122, 128, 144, ${isDark ? '0.12' : '0.1'}) 0%, rgba(122, 128, 144, 0.03) 100%)`,
    },
    {
      id: 1,
      title: 'AI Chat',
      glowColor: `rgba(74, 158, 124, ${isDark ? '0.2' : '0.15'})`,
      borderColor: `rgba(74, 158, 124, ${isDark ? '0.25' : '0.18'})`,
      bgGradient: `linear-gradient(180deg, rgba(74, 158, 124, ${isDark ? '0.1' : '0.08'}) 0%, rgba(74, 158, 124, 0.02) 100%)`,
    },
    {
      id: 2,
      title: 'Revenue',
      glowColor: `rgba(224, 128, 80, ${isDark ? '0.22' : '0.15'})`,
      borderColor: `rgba(224, 128, 80, ${isDark ? '0.3' : '0.2'})`,
      bgGradient: `linear-gradient(180deg, rgba(224, 128, 80, ${isDark ? '0.12' : '0.1'}) 0%, rgba(224, 128, 80, 0.03) 100%)`,
    },
  ];

  // Solid backgrounds - no transparency
  const cardBg = isDark ? '#1a1a22' : '#f5f5f3';
  const inactiveBg = isDark ? '#16161c' : '#eaeae8';
  const inactiveBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

  // Render card content based on step
  const renderCardContent = (cardIndex: number) => {
    if (cardIndex === 0) {
      // Missed Call card
      const isTransitioning = activeStep === 0 && subStep >= 5;

      return (
        <div className="flex flex-col items-center justify-center h-full relative">
          {/* All elements in one layout - animate with CSS */}
          <div className="relative flex items-center justify-center mb-4" style={{ minHeight: '200px', width: '100%' }}>
            {/* Phone icon - starts centered, slides left when transitioning, fades when sending */}
            <div
              className="relative flex-shrink-0 z-10"
              style={{
                position: 'absolute',
                left: '50%',
                transform: isTransitioning ? 'translateX(-150px)' : 'translateX(-36px)',
                opacity: subStep >= 7 ? 0 : 1,
                transition: subStep >= 7
                  ? 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Pulse rings - fade out during transition */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  width: '120px',
                  height: '120px',
                  left: '-24px',
                  top: '-24px',
                  border: `2px solid ${colors.missedAccent}`,
                  opacity: isTransitioning ? 0 : 0.3,
                  animation: isTransitioning ? 'none' : 'pulseRing 2s ease-out infinite',
                  transition: 'opacity 0.5s ease-out',
                }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  width: '120px',
                  height: '120px',
                  left: '-24px',
                  top: '-24px',
                  border: `2px solid ${colors.missedAccent}`,
                  opacity: isTransitioning ? 0 : 0.3,
                  animation: isTransitioning ? 'none' : 'pulseRing 2s ease-out infinite 0.7s',
                  transition: 'opacity 0.5s ease-out',
                }}
              />
              {/* Phone icon - keeps original size */}
              <div
                className="rounded-full flex items-center justify-center relative z-10"
                style={{
                  width: '72px',
                  height: '72px',
                  background: `rgba(122, 128, 144, ${isDark ? '0.25' : '0.18'})`,
                  boxShadow: isTransitioning ? 'none' : '0 0 25px rgba(122, 128, 144, 0.3)',
                  animation: isTransitioning ? 'none' : 'phoneShake 0.6s ease-in-out infinite',
                  transition: 'box-shadow 0.5s ease-out',
                }}
              >
                <PhoneCall className="w-9 h-9" style={{ color: colors.missedAccent }} />
              </div>
            </div>

            {/* Arrow - appears first (0.2s delay), fades out when sending */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-100px)',
                opacity: isTransitioning ? (subStep >= 7 ? 0 : 1) : 0,
                transition: subStep >= 7
                  ? 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              <svg width="200" height="200" viewBox="0 0 800 800" fill="none">
                <g strokeWidth="10" stroke={colors.whatsapp} fill="none" strokeLinecap="round" strokeLinejoin="round" transform="rotate(317, 400, 400)">
                  <path d="M250 250Q450 350 550 550" markerEnd="url(#arrowMarker)" />
                </g>
                <defs>
                  <marker markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" viewBox="0 0 5 5" orient="auto" id="arrowMarker">
                    <polygon points="0,5 1.6666666666666667,2.5 0,0 5,2.5" fill={colors.whatsapp} />
                  </marker>
                </defs>
              </svg>
            </div>

            {/* WhatsApp icon - same size as phone (72px), appears after arrow (0.6s delay), then slides left, grows and fades out together */}
            <div
              className="flex-shrink-0 z-10"
              style={{
                position: 'absolute',
                left: '50%',
                transform: subStep >= 7
                  ? 'translateX(-40px) scale(2)'
                  : 'translateX(80px) scale(1)',
                opacity: isTransitioning ? (subStep >= 7 ? 0 : 1) : 0,
                transition: subStep >= 7
                  ? 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
              }}
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: '72px',
                  height: '72px',
                  background: subStep >= 7 ? '#7a8090' : colors.whatsappBright,
                  boxShadow: subStep >= 7
                    ? '0 0 25px rgba(122, 128, 144, 0.5)'
                    : '0 0 25px rgba(37, 211, 102, 0.5)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <WhatsAppIcon className="w-9 h-9 text-white" />
              </div>
            </div>
          </div>

          {/* Bottom text area */}
          <div className="text-center relative" style={{ minHeight: '50px' }}>
            {/* Ring counter dots - fade out during transition */}
            <div
              className="flex gap-2 mb-3 justify-center"
              style={{
                opacity: isTransitioning ? 0 : 1,
                transition: 'opacity 0.3s ease-out',
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: i <= subStep ? colors.missedAccent : textSubtle,
                    boxShadow: i <= subStep ? `0 0 12px ${colors.missedAccent}60` : 'none',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              ))}
            </div>
            {/* Phone rings text - shows during ringing */}
            <p
              className="font-semibold whitespace-nowrap"
              style={{
                fontSize: '1.25rem',
                color: textMuted,
                opacity: !isTransitioning && subStep >= 2 && subStep < 4 ? 1 : 0,
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                transition: 'all 0.6s ease-out',
              }}
            >
              Phone rings...
            </p>
            {/* No Answer text - shows after 4 dots, stays until arrow appears */}
            <p
              className="font-semibold whitespace-nowrap"
              style={{
                fontSize: '1.25rem',
                color: textMuted,
                opacity: subStep >= 4 && subStep < 6 ? 1 : 0,
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                transition: 'all 0.4s ease-out',
              }}
            >
              No one answered
            </p>
            {/* Forward to AI text - appears with arrow (0.2s delay after transition) */}
            <p
              className="font-semibold whitespace-nowrap"
              style={{
                fontSize: '1.25rem',
                color: colors.whatsapp,
                opacity: subStep >= 6 && subStep < 8 ? 1 : 0,
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                transition: 'all 0.4s ease-out 0.2s',
              }}
            >
              Forward to vGuest on WhatsApp
            </p>
          </div>
        </div>
      );
    } else if (cardIndex === 1) {
      // AI Chat card
      return (
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Header */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
            }}
          >
            <div className="rounded-full flex items-center justify-center" style={{ width: '32px', height: '32px', background: colors.whatsappBright }}>
              <WhatsAppIcon className="text-white w-5 h-5" />
            </div>
            <span style={{ color: textMuted }} className="font-semibold text-sm">vGuest AI</span>
          </div>
          {/* Messages */}
          <div
            className="flex-1 px-4 py-3 flex flex-col justify-evenly gap-1"
          >
            {activeStep === 1 && subStep === 0 && (
              <div className="flex items-center gap-2" style={{ animation: 'fadeIn 0.5s ease' }}>
                <span className="text-sm font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}>typing</span>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)', animationDelay: `${i * 150}ms`, animationDuration: '0.6s' }} />
                  ))}
                </div>
              </div>
            )}
            {[
              { text: "How can I help?", isUser: false, time: "10:31" },
              { text: "Tomorrow, 2 guests?", isUser: true, time: "10:31" },
              { text: "Deluxe €149 available!", isUser: false, time: "10:32" },
              { text: "I would like to reserve please", isUser: true, time: "10:32" },
            ].map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-1.5 ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                style={{
                  opacity: activeStep === 1 ? (i < subStep ? 1 : 0) : 0.5,
                  transform: activeStep === 1 && i < subStep ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.95)',
                  transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`,
                }}
              >
                <div
                  className="relative max-w-[80%]"
                  style={{
                    padding: '12px 16px',
                    borderRadius: msg.isUser ? '22px 8px 22px 22px' : '8px 22px 22px 22px',
                    background: msg.isUser
                      ? (isDark ? '#005c4b' : '#dcf8c6')
                      : (isDark ? '#1f2c34' : '#ffffff'),
                    color: msg.isUser
                      ? (isDark ? 'rgba(255,255,255,0.95)' : '#111b21')
                      : (isDark ? 'rgba(255,255,255,0.95)' : '#111b21'),
                    boxShadow: isDark
                      ? '0 2px 6px rgba(0,0,0,0.15)'
                      : '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <span className="text-base leading-snug">{msg.text}</span>
                  <span
                    className="inline-flex items-center gap-1 ml-2 align-bottom"
                    style={{
                      fontSize: '11px',
                      color: msg.isUser
                        ? (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)')
                        : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)'),
                    }}
                  >
                    {msg.time}
                    {msg.isUser && (
                      <svg className="w-4 h-4" viewBox="0 0 16 15" fill="currentColor" style={{ color: isDark ? '#53bdeb' : '#4fc3f7' }}>
                        <path d="M15.01 3.316l-.478-.372a.365.365 0 00-.51.063L8.666 9.88a.32.32 0 01-.484.032l-.358-.325a.32.32 0 00-.484.032l-.378.48a.418.418 0 00.036.54l1.32 1.267a.32.32 0 00.484-.034l6.272-8.048a.366.366 0 00-.064-.512zm-4.1 0l-.478-.372a.365.365 0 00-.51.063L4.566 9.88a.32.32 0 01-.484.032L1.89 7.77a.366.366 0 00-.516.005l-.423.433a.364.364 0 00.006.514l3.255 3.185a.32.32 0 00.484-.033l6.272-8.048a.365.365 0 00-.063-.51z" />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      // Revenue card - Card Swipe → Loading → Success
      const showCard = subStep === 0;
      const cardSwiping = subStep === 1;
      const showLoader = subStep >= 1;
      const isSpinning = subStep >= 1 && subStep < 3;
      const circleComplete = subStep >= 3;
      const showCheckmark = subStep >= 4;
      const showConfetti = subStep >= 4;

      return (
        <div className="flex flex-col items-center justify-center h-full relative overflow-hidden">
          {/* Credit card swipe animation */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              opacity: showCard ? 1 : 0,
              transform: subStep >= 1
                ? 'translateX(300px) rotate(15deg) scale(0.9)'
                : 'translateX(0) rotate(0deg) scale(1)',
              transition: subStep >= 1
                ? 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: showCard ? 10 : 0,
              pointerEvents: 'none',
            }}
          >
            <div
              className="relative"
              style={{
                width: '180px',
                height: '110px',
                background: `linear-gradient(135deg, ${isDark ? '#2a2a3a' : '#f0f0f5'} 0%, ${isDark ? '#1a1a24' : '#e0e0e8'} 100%)`,
                borderRadius: '12px',
                boxShadow: isDark
                  ? '0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(224, 128, 80, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                  : '0 8px 32px rgba(0,0,0,0.15), 0 0 40px rgba(224, 128, 80, 0.2), inset 0 1px 0 rgba(255,255,255,0.8)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'}`,
                overflow: 'hidden',
                animation: showCard ? 'cardPulse 2s ease-in-out infinite' : 'none',
              }}
            >
              {/* Card chip */}
              <div
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '24px',
                  width: '36px',
                  height: '28px',
                  background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)',
                  borderRadius: '4px',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4)',
                }}
              >
                <div style={{ position: 'absolute', left: '4px', top: '8px', width: '28px', height: '2px', background: 'rgba(0,0,0,0.15)' }} />
                <div style={{ position: 'absolute', left: '4px', top: '13px', width: '28px', height: '2px', background: 'rgba(0,0,0,0.15)' }} />
                <div style={{ position: 'absolute', left: '4px', top: '18px', width: '28px', height: '2px', background: 'rgba(0,0,0,0.15)' }} />
              </div>
              {/* Contactless icon */}
              <svg style={{ position: 'absolute', right: '16px', top: '24px' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'} strokeWidth="2">
                <path d="M8.5 14.5c1.5-1.5 1.5-4 0-5.5" strokeLinecap="round" />
                <path d="M12 17c3-3 3-8 0-11" strokeLinecap="round" />
                <path d="M15.5 19.5c4.5-4.5 4.5-11.5 0-16" strokeLinecap="round" />
              </svg>
              {/* Card number dots */}
              <div style={{ position: 'absolute', bottom: '32px', left: '16px', display: 'flex', gap: '8px' }}>
                {[0, 1, 2, 3].map((g) => (
                  <div key={g} style={{ display: 'flex', gap: '3px' }}>
                    {[0, 1, 2, 3].map((d) => (
                      <div key={d} style={{ width: '6px', height: '6px', borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)' }} />
                    ))}
                  </div>
                ))}
              </div>
              {/* Card brand */}
              <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '40px', height: '14px', background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)', borderRadius: '2px' }} />
            </div>
          </div>

          {/* Confetti particles */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${50 + (Math.random() - 0.5) * 60}%`,
                    top: '50%',
                    width: `${6 + Math.random() * 6}px`,
                    height: `${6 + Math.random() * 6}px`,
                    background: ['#25D366', '#fc9951', '#7aa2d4', '#e08050', '#4a9e7c'][i % 5],
                    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    animation: `confetti-${i % 4} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                    opacity: 0,
                  }}
                />
              ))}
            </div>
          )}

          {/* Professional circular loader → checkmark */}
          <div
            className="relative mb-6"
            style={{
              opacity: showLoader ? 1 : 0,
              transform: showLoader ? 'scale(1)' : 'scale(0.8)',
              filter: showCheckmark ? 'drop-shadow(0 0 20px rgba(37, 211, 102, 0.4))' : 'none',
              transition: 'all 0.5s ease-out',
            }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120">
              <defs>
                {/* Gradient for the progress arc */}
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#25D366" />
                  <stop offset="100%" stopColor="#128C7E" />
                </linearGradient>
                {/* Subtle inner glow */}
                <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              {/* Background track */}
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}
                strokeWidth="5"
              />
              {/* Success fill circle - appears on completion */}
              <circle
                cx="60"
                cy="60"
                r="48"
                fill={showCheckmark ? (isDark ? 'rgba(37, 211, 102, 0.12)' : 'rgba(37, 211, 102, 0.08)') : 'transparent'}
                style={{
                  transition: 'fill 0.4s ease-out',
                }}
              />
              {/* Animated arc - spins while loading, completes on success */}
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circleComplete ? '327' : '80 247'}
                strokeDashoffset={circleComplete ? 0 : 0}
                style={{
                  transform: 'rotate(-90deg)',
                  transformOrigin: '60px 60px',
                  transition: circleComplete ? 'stroke-dasharray 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                  animation: isSpinning ? 'spinLoader 1s linear infinite' : 'none',
                }}
              />
            </svg>
            {/* Checkmark - appears after circle completes */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: showCheckmark ? 1 : 0,
                transform: showCheckmark ? 'scale(1)' : 'scale(0.5)',
                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13L9 17L19 7"
                  stroke="url(#checkGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 22,
                    strokeDashoffset: showCheckmark ? 0 : 22,
                    transition: 'stroke-dashoffset 0.2s cubic-bezier(0.16, 1, 0.3, 1) 0.05s',
                  }}
                />
                <defs>
                  <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#25D366" />
                    <stop offset="100%" stopColor="#128C7E" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Success text */}
          <div
            className="flex flex-col items-center"
            style={{
              opacity: showCheckmark ? 1 : 0,
              transform: showCheckmark ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            <p
              className="text-lg font-semibold mb-1"
              style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}
            >
              Booking Recovered!
            </p>
            <p className="text-3xl font-bold" style={{ color: '#25D366' }}>€149</p>
            <p
              className="font-semibold whitespace-nowrap mt-3"
              style={{ fontSize: '1.25rem', color: '#7aa2d4' }}
            >
              Phew! Booking almost lost
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="relative w-[380px] h-[400px]">
      {cards.map((card, index) => {
        const isActive = activeStep === index;
        // Calculate position offset for stacking
        const offset = (index - activeStep + 3) % 3;

        // Only show active card
        if (!isActive) return null;

        // Chat card gets full card styling, others are clean
        const isChatCard = index === 1;

        return (
          <div
            key={card.id}
            className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center"
            style={{
              background: isChatCard ? cardBg : 'transparent',
              border: isChatCard ? `1px solid ${card.borderColor}` : 'none',
              ['--glow-color' as string]: card.glowColor,
              animation: isChatCard ? 'subtleGlow 3s ease-in-out infinite' : 'none',
              boxShadow: isChatCard ? `0 0 50px ${card.glowColor}, 0 8px 32px rgba(0,0,0,0.4)` : 'none',
            }}
          >
            {/* Card content */}
            <div className={isChatCard ? 'w-full h-full' : 'flex flex-col items-center justify-center h-full'}>
              {renderCardContent(index)}
            </div>
          </div>
        );
      })}

      {/* Subtitle for chat card - shown below the card */}
      {activeStep === 1 && (
        <p
          className="absolute font-semibold whitespace-nowrap text-center w-full"
          style={{
            bottom: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '1.25rem',
            color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)',
            opacity: 1,
            transition: 'all 0.5s ease-out',
          }}
        >
          vGuest AI takes care of the guest
        </p>
      )}
    </div>
  );
};

export default function VGuestBookingFlowCompact() {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? themes.dark : themes.light;

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden flex flex-col transition-colors duration-500"
      style={{ backgroundColor: theme.bg, fontFamily: "'Cairo', sans-serif" }}
    >
      {/* Soft colorful abstract background - very transparent, organic shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center" style={{ opacity: isDark ? 0.18 : 0.3 }}>
        {/* Purple/pink gradient blob - organic shape */}
        <div
          className="absolute transition-opacity duration-500"
          style={{
            width: '1000px',
            height: '600px',
            background: isDark
              ? 'linear-gradient(to bottom right, rgba(147, 51, 234, 0.5), rgba(236, 72, 153, 0.4), transparent)'
              : 'linear-gradient(to bottom right, rgba(79, 70, 229, 0.45), rgba(99, 102, 241, 0.35), transparent)',
            filter: 'blur(160px)',
            borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
            transform: 'rotate(-15deg) translateY(-120px) translateX(-50px)',
          }}
        />
        {/* Blue/cyan gradient blob - organic shape */}
        <div
          className="absolute transition-opacity duration-500"
          style={{
            width: '850px',
            height: '500px',
            background: isDark
              ? 'linear-gradient(to top left, rgba(59, 130, 246, 0.45), rgba(34, 211, 238, 0.35), transparent)'
              : 'linear-gradient(to top left, rgba(96, 165, 250, 0.55), rgba(103, 232, 249, 0.45), transparent)',
            filter: 'blur(150px)',
            borderRadius: '37% 63% 43% 57% / 52% 45% 55% 48%',
            transform: 'rotate(25deg) translateX(200px) translateY(80px)',
          }}
        />
        {/* Orange/yellow gradient blob - organic shape */}
        <div
          className="absolute transition-opacity duration-500"
          style={{
            width: '800px',
            height: '450px',
            background: isDark
              ? 'linear-gradient(to right, rgba(251, 146, 60, 0.35), rgba(250, 204, 21, 0.25), transparent)'
              : 'linear-gradient(to right, rgba(251, 146, 60, 0.5), rgba(253, 224, 71, 0.4), transparent)',
            filter: 'blur(140px)',
            borderRadius: '52% 48% 61% 39% / 43% 58% 42% 57%',
            transform: 'rotate(8deg) translateX(-180px) translateY(60px)',
          }}
        />
        {/* Indigo/purple gradient blob - organic shape */}
        <div
          className="absolute transition-opacity duration-500"
          style={{
            width: '750px',
            height: '400px',
            background: isDark
              ? 'linear-gradient(to bottom left, rgba(99, 102, 241, 0.35), rgba(168, 85, 247, 0.25), transparent)'
              : 'linear-gradient(to bottom left, rgba(20, 184, 166, 0.35), rgba(16, 185, 129, 0.25), transparent)',
            filter: 'blur(145px)',
            borderRadius: '45% 55% 38% 62% / 58% 42% 58% 42%',
            transform: 'rotate(-8deg) translateY(130px)',
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
            <span
              className="text-[21px] font-bold tracking-tight"
              style={{
                background: `linear-gradient(110deg, transparent 33%, rgba(255,255,255,0.6) 50%, transparent 66%) right/300% 100%, linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'textShineMove 3s ease-in-out infinite',
              }}
            >vGuest</span>
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

        {/* Hero Section - Two Column Layout */}
        <main className="flex items-start pt-8 lg:pt-12">
          <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">

            {/* Left Side - Text Content */}
            <div className="flex-1 max-w-xl">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6"
                style={{
                  background: isDark ? 'rgba(100, 140, 200, 0.12)' : 'rgba(30, 30, 40, 0.08)',
                  border: `1px solid ${isDark ? 'rgba(100, 140, 200, 0.2)' : 'rgba(30, 30, 40, 0.18)'}`,
                  animation: 'heroFadeIn 0.6s ease-out',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: isDark ? '#7aa2d4' : '#1a1a24' }}
                />
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: isDark ? '#7aa2d4' : '#1a1a24' }}
                >
                  AI-Powered Booking Assistant
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-left leading-[1.1] tracking-tight mb-6" style={{ animation: 'heroFadeIn 0.8s ease-out 0.1s both' }}>
                <span
                  className="block bg-clip-text text-transparent pb-2"
                  style={{
                    backgroundImage: isDark
                      ? 'linear-gradient(to right, #edecee, #9181ab)'
                      : 'linear-gradient(to right, #2a2a35, #5a4a6a)',
                  }}
                >
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

              {/* Subheadline */}
              <p
                className="text-left text-lg lg:text-xl mb-8 leading-relaxed transition-colors duration-500"
                style={{ color: theme.textMuted, animation: 'heroFadeIn 0.8s ease-out 0.2s both' }}
              >
                AI answers on WhatsApp. Guests book direct. You keep the commission.
              </p>

              {/* Stats Row */}
              <div className="flex items-center gap-6 mb-8" style={{ animation: 'heroFadeIn 0.8s ease-out 0.25s both' }}>
                <div>
                  <p className="text-2xl font-bold" style={{ color: colors.primary }}>20%</p>
                  <p className="text-xs" style={{ color: theme.textMuted }}>Calls missed</p>
                </div>
                <div className="w-px h-10" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
                <div>
                  <p className="text-2xl font-bold" style={{ color: colors.primary }}>85%</p>
                  <p className="text-xs" style={{ color: theme.textMuted }}>Won't call back</p>
                </div>
                <div className="w-px h-10" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
                <div>
                  <p className="text-2xl font-bold" style={{ color: colors.whatsapp }}>100%</p>
                  <p className="text-xs" style={{ color: theme.textMuted }}>Captured by vGuest</p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                className="group flex items-center gap-3 px-10 py-4 rounded-xl text-base font-semibold text-white"
                style={{
                  animation: 'heroFadeIn 0.8s ease-out 0.3s both',
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
              <span className="block mt-3 text-sm transition-colors duration-500" style={{ color: theme.textSubtle, animation: 'heroFadeIn 0.8s ease-out 0.35s both' }}>Free · No commitment</span>
            </div>

            {/* Right Side - Card Stack */}
            <div className="flex-shrink-0" style={{ animation: 'heroFadeIn 0.8s ease-out 0.4s both' }}>
              <CardStackDemo isDark={isDark} />
            </div>
          </div>

        </main>
      </div>

      {/* Google Font - Cairo */}
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Animations */}
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

        @keyframes textShineMove {
          0% { background-position: right; }
          50% { background-position: left; }
          100% { background-position: right; }
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

        /* WhatsApp icon shrink and move to header */
        @keyframes whatsappShrink {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          70% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(0) translateY(-150px);
            opacity: 0;
          }
        }

        /* Phone shake animation */
        @keyframes phoneShake {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(-6deg); }
          20% { transform: rotate(6deg); }
          30% { transform: rotate(-6deg); }
          40% { transform: rotate(6deg); }
          50% { transform: rotate(0deg); }
        }

        /* Pulse ring animation */
        @keyframes pulseRing {
          0% {
            transform: scale(0.8);
            opacity: 0.4;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
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

        /* Dot pulse animation for loading */
        @keyframes dotPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        /* Confetti animations - 4 different directions */
        @keyframes confetti-0 {
          0% {
            opacity: 1;
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-120px) translateX(-40px) rotate(360deg);
          }
        }
        @keyframes confetti-1 {
          0% {
            opacity: 1;
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) translateX(50px) rotate(-360deg);
          }
        }
        @keyframes confetti-2 {
          0% {
            opacity: 1;
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-140px) translateX(-20px) rotate(270deg);
          }
        }
        @keyframes confetti-3 {
          0% {
            opacity: 1;
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-90px) translateX(30px) rotate(-270deg);
          }
        }

        /* Spinner loader animation */
        @keyframes spinLoader {
          0% {
            transform: rotate(-90deg);
          }
          100% {
            transform: rotate(270deg);
          }
        }

        /* Credit card pulse glow */
        @keyframes cardPulse {
          0%, 100% {
            box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 30px rgba(224, 128, 80, 0.25);
          }
          50% {
            box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 50px rgba(224, 128, 80, 0.45);
          }
        }
      `}</style>
    </div>
  );
}
