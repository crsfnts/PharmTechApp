import React, { ReactNode, useMemo, useState } from 'react';

interface OnboardingProps {
  onClose: () => void;
}

type VisualType = 'welcome' | 'calculator' | 'learning' | 'trust' | 'start';

interface OnboardingStep {
  title?: string;
  headline: string;
  body: string;
  visual: VisualType;
  featureChips?: string[];
}

interface OnboardingScreenProps extends OnboardingStep {
  showSkip: boolean;
  primaryButtonLabel: string;
  onPrimary: () => void;
  onSkip: () => void;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: 'rxmate',
    headline: 'Your pharmacy partner, every step of the way.',
    body: 'Tools, knowledge, and support built for pharmacy technicians.',
    visual: 'welcome',
  },
  {
    headline: 'Powerful tools at your fingertips.',
    body: 'Calculators for days supply, insulin, IV flow, conversions, and more. Get accurate results fast.',
    visual: 'calculator',
    featureChips: ['Smart Calculators', 'Drug Lookup', 'Unit Conversions'],
  },
  {
    headline: 'Learn and grow your career.',
    body: 'Flashcards, practice questions, quick lessons, and trusted references anytime, anywhere.',
    visual: 'learning',
    featureChips: ['Flashcards', 'Lessons', 'Clinical References'],
  },
  {
    headline: 'Reliable and trustworthy.',
    body: 'Accurate information you can count on, so you can work with confidence.',
    visual: 'trust',
    featureChips: ['Trusted Content', 'Built for Accuracy', 'Your Data is Safe'],
  },
  {
    title: 'rxmate',
    headline: "Let's get started!",
    body: 'Everything you need to work smarter, learn more, and feel confident.',
    visual: 'start',
  },
];

const FeatureChip: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-violet-50/80 px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-violet-100">
    {label}
  </span>
);

const PageDots: React.FC<{ total: number; current: number; onSelect: (index: number) => void }> = ({ total, current, onSelect }) => (
  <div className="flex items-center justify-center gap-2" aria-label={`Screen ${current + 1} of ${total}`}>
    {Array.from({ length: total }).map((_, index) => (
      <button
        key={index}
        onClick={() => onSelect(index)}
        className={[
          'h-2.5 rounded-full transition-all duration-300',
          index === current ? 'w-7 bg-indigo-600 shadow-sm shadow-indigo-500/30' : 'w-2.5 bg-violet-100',
        ].join(' ')}
        aria-label={`Go to onboarding screen ${index + 1}`}
        aria-current={index === current ? 'step' : undefined}
      />
    ))}
  </div>
);

const Sparkle: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z" fill="currentColor" />
  </svg>
);

const VisualFrame: React.FC<{ children: ReactNode; large?: boolean }> = ({ children, large }) => (
  <div className={['relative mx-auto flex items-center justify-center', large ? 'h-72 w-full' : 'h-56 w-full'].join(' ')}>
    <div className="absolute h-44 w-44 rounded-full bg-gradient-to-br from-violet-100 via-indigo-50 to-sky-50 blur-[1px]" />
    <div className="absolute left-[16%] top-[22%] h-5 w-5 rounded-full bg-teal-100" />
    <div className="absolute right-[15%] top-[28%] h-6 w-3 rotate-45 rounded-full bg-violet-200" />
    <Sparkle className="absolute left-[24%] top-[16%] h-4 w-4 text-violet-300" />
    <Sparkle className="absolute right-[24%] bottom-[22%] h-4 w-4 text-amber-200" />
    <div className="relative z-10">{children}</div>
  </div>
);

const WelcomeVisual = () => (
  <VisualFrame large>
    <div className="relative h-64 w-64">
      <div className="absolute bottom-0 left-2 h-32 w-60 rounded-t-[48px] bg-gradient-to-br from-violet-100 to-indigo-100" />
      <div className="absolute bottom-6 right-0 h-28 w-20 rounded-2xl bg-white/75 p-2 shadow-sm ring-1 ring-violet-100">
        <div className="mb-2 h-4 rounded bg-violet-100" />
        <div className="mb-2 h-4 rounded bg-violet-100" />
        <div className="h-4 rounded bg-indigo-100" />
      </div>
      <div className="absolute bottom-5 left-9 h-36 w-28 rounded-t-[44px] bg-indigo-600 shadow-xl shadow-indigo-500/25">
        <div className="absolute left-1/2 top-4 h-16 w-16 -translate-x-1/2 rounded-full bg-orange-100">
          <div className="absolute left-4 top-7 h-1.5 w-1.5 rounded-full bg-slate-800" />
          <div className="absolute right-4 top-7 h-1.5 w-1.5 rounded-full bg-slate-800" />
          <div className="absolute left-1/2 top-10 h-3 w-5 -translate-x-1/2 rounded-b-full border-b-2 border-orange-500" />
        </div>
        <div className="absolute left-1/2 top-0 h-12 w-24 -translate-x-1/2 rounded-b-[28px] rounded-t-[42px] bg-slate-800" />
        <div className="absolute bottom-5 left-1/2 h-12 w-24 -translate-x-1/2 rounded-2xl bg-indigo-500" />
        <div className="absolute bottom-16 right-[-36px] h-20 w-16 -rotate-6 rounded-xl bg-slate-700 shadow-lg" />
        <div className="absolute bottom-10 left-4 rounded-md bg-white px-1.5 py-1 text-[10px] font-bold text-indigo-700">Rx</div>
      </div>
      <div className="absolute bottom-2 left-0 h-8 w-3 rounded-full bg-violet-300" />
      <div className="absolute bottom-2 left-5 h-14 w-3 rounded-full bg-indigo-200" />
    </div>
  </VisualFrame>
);

const CalculatorVisual = () => (
  <VisualFrame>
    <div className="relative h-36 w-32 rotate-[-2deg] rounded-[28px] bg-gradient-to-br from-violet-500 via-indigo-500 to-indigo-700 p-3 shadow-2xl shadow-indigo-500/30 ring-1 ring-white/60">
      <div className="mb-3 flex h-9 items-center justify-end rounded-xl bg-teal-50 px-3 text-lg font-semibold text-slate-700 shadow-inner">125</div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} className="h-6 rounded-lg bg-white/85 shadow-sm" />
        ))}
      </div>
      <div className="absolute -right-4 -top-4 rounded-full bg-amber-200 px-2.5 py-1 text-xl font-bold text-amber-600 shadow-sm">+</div>
    </div>
  </VisualFrame>
);

const LearningVisual = () => (
  <VisualFrame>
    <div className="relative h-36 w-36">
      <div className="absolute inset-x-3 bottom-0 h-28 rounded-[24px] bg-indigo-700 shadow-2xl shadow-indigo-500/25" />
      <div className="absolute inset-x-1 bottom-3 h-32 rotate-2 rounded-[24px] bg-gradient-to-br from-violet-500 to-indigo-600 p-4 shadow-xl">
        <div className="h-16 w-8 rounded-b-lg bg-white shadow-sm" />
        <div className="absolute bottom-4 left-4 right-4 h-4 rounded-full bg-white/20" />
      </div>
      <div className="absolute -right-1 bottom-1 h-7 w-28 rounded-full bg-white shadow-sm" />
    </div>
  </VisualFrame>
);

const TrustVisual = () => (
  <VisualFrame>
    <div className="relative flex h-36 w-32 items-center justify-center rounded-b-[42px] rounded-t-[28px] bg-gradient-to-br from-violet-500 via-indigo-500 to-indigo-700 shadow-2xl shadow-indigo-500/30">
      <div className="absolute top-0 h-11 w-24 rounded-b-[26px] bg-white/10" />
      <svg className="h-20 w-20 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true">
        <path d="m5 12 4.2 4.2L19.5 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </VisualFrame>
);

const StartVisual = () => (
  <VisualFrame>
    <div className="relative flex h-32 w-32 items-center justify-center rounded-[32px] bg-gradient-to-br from-violet-500 via-indigo-600 to-blue-700 text-5xl font-bold text-white shadow-2xl shadow-indigo-500/35">
      Rx
      <Sparkle className="absolute -left-8 -top-4 h-7 w-7 text-amber-300" />
      <Sparkle className="absolute -right-7 top-2 h-6 w-6 text-violet-300" />
      <Sparkle className="absolute -bottom-6 right-2 h-5 w-5 text-teal-200" />
      <div className="absolute -left-10 bottom-3 h-10 w-1.5 rotate-[-28deg] rounded-full bg-orange-300" />
      <div className="absolute -right-9 bottom-8 h-10 w-1.5 rotate-[28deg] rounded-full bg-indigo-300" />
    </div>
  </VisualFrame>
);

const OnboardingVisual: React.FC<{ type: VisualType }> = ({ type }) => {
  if (type === 'welcome') return <WelcomeVisual />;
  if (type === 'calculator') return <CalculatorVisual />;
  if (type === 'learning') return <LearningVisual />;
  if (type === 'trust') return <TrustVisual />;
  return <StartVisual />;
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  title,
  headline,
  body,
  visual,
  featureChips,
  showSkip,
  primaryButtonLabel,
  onPrimary,
  onSkip,
}) => (
  <section className="flex min-h-[100svh] flex-col px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
    <div className="mx-auto flex w-full max-w-md items-center justify-between">
      <div className="h-11">
        {title && <p className="text-3xl font-bold tracking-normal text-indigo-600">{title}</p>}
      </div>
      {showSkip && (
        <button
          onClick={onSkip}
          className="min-h-11 rounded-2xl px-4 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
        >
          Skip
        </button>
      )}
    </div>

    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-3">
      <OnboardingVisual type={visual} />

      <div className="mt-4 text-center">
        <h1 id="onboarding-title" className="mx-auto max-w-sm text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-4xl">
          {headline}
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-slate-600">{body}</p>
      </div>

      {featureChips && (
        <div className="mx-auto mt-7 grid w-full max-w-sm gap-3">
          {featureChips.map(chip => (
            <FeatureChip key={chip} label={chip} />
          ))}
        </div>
      )}
    </div>

    <button
      onClick={onPrimary}
      className="mx-auto mt-4 flex min-h-14 w-full max-w-md items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-700 px-6 text-base font-bold text-white shadow-xl shadow-indigo-500/25 transition hover:from-indigo-700 hover:to-violet-800 active:scale-[0.99]"
    >
      {primaryButtonLabel}
    </button>
  </section>
);

const OnboardingCarousel: React.FC<OnboardingProps> = ({ onClose }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const isFinalScreen = currentScreen === onboardingSteps.length - 1;
  const activeStep = onboardingSteps[currentScreen];

  const carouselStyle = useMemo(
    () => ({ transform: `translateX(-${currentScreen * 100}%)` }),
    [currentScreen],
  );

  const goToScreen = (screen: number) => {
    setCurrentScreen(Math.min(Math.max(screen, 0), onboardingSteps.length - 1));
  };

  const handlePrimary = () => {
    if (isFinalScreen) {
      onClose();
      return;
    }

    goToScreen(currentScreen + 1);
  };

  const handleTouchEnd = (xPosition: number) => {
    if (touchStart === null) return;

    const distance = touchStart - xPosition;
    if (Math.abs(distance) > 45) {
      goToScreen(currentScreen + (distance > 0 ? 1 : -1));
    }
    setTouchStart(null);
  };

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden bg-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.14),transparent_32%),linear-gradient(180deg,#ffffff_0%,#faf8ff_72%,#ffffff_100%)]" />
      <div
        className="relative flex h-full transition-transform duration-500 ease-out"
        style={carouselStyle}
        onTouchStart={event => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={event => handleTouchEnd(event.changedTouches[0].clientX)}
      >
        {onboardingSteps.map((step, index) => (
          <div key={step.headline} className="w-full shrink-0">
            <OnboardingScreen
              {...step}
              showSkip={index !== onboardingSteps.length - 1}
              primaryButtonLabel={index === onboardingSteps.length - 1 ? 'Continue' : 'Next'}
              onPrimary={handlePrimary}
              onSkip={onClose}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+4.75rem)]">
        <PageDots total={onboardingSteps.length} current={currentScreen} onSelect={goToScreen} />
      </div>

      <span className="sr-only">{activeStep.headline}</span>
    </div>
  );
};

export default OnboardingCarousel;
