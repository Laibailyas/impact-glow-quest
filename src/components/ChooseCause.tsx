import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BadgeCheck, Droplets, Flame, HeartHandshake, PawPrint, Utensils } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

type Cause = {
  id: string;
  label: string;
  headline: string[];
  blurb: string;
  icon: typeof PawPrint;
  charities: string[];
  unit: string;
  perDollar: number;
};

const CAUSES: Cause[] = [
  {
    id: "wildlife",
    label: "Wildlife rescue",
    headline: ["Wildlife", "rescue"],
    blurb:
      "Anti-poaching patrols, rehabilitation centres and habitat protection for animals with nowhere left to go.",
    icon: PawPrint,
    charities: ["WildAid", "IFAW", "The Nature Conservancy"],
    unit: "animals treated",
    perDollar: 0.42,
  },
  {
    id: "food",
    label: "Food aid",
    headline: ["Food", "aid"],
    blurb:
      "Warm meals delivered through community kitchens and food banks in the neighbourhoods that need them most.",
    icon: Utensils,
    charities: ["Feeding America", "OXFAM", "Action Against Hunger"],
    unit: "meals served",
    perDollar: 8.5,
  },
  {
    id: "disaster",
    label: "Disaster relief",
    headline: ["Disaster", "relief"],
    blurb:
      "First responders on the ground within hours — shelter, medicine and clean-up crews after floods and fires.",
    icon: Flame,
    charities: ["Direct Relief", "Mercy Corps", "CARE"],
    unit: "emergency kits",
    perDollar: 1.1,
  },
  {
    id: "water",
    label: "Clean water",
    headline: ["Clean", "water"],
    blurb:
      "Wells, filters and repairs that keep drinking water safe long after the trucks have driven away.",
    icon: Droplets,
    charities: ["charity: water", "WaterAid", "Water.org"],
    unit: "days of water",
    perDollar: 6.2,
  },
];

function Counter({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 70, damping: 20 });
  const text = useTransform(spring, (v) =>
    v >= 100 ? Math.round(v).toLocaleString() : v.toFixed(1),
  );

  useEffect(() => {
    mv.set(value);
  }, [mv, value]);

  return <motion.span>{text}</motion.span>;
}

export function ChooseCause() {
  const [active, setActive] = useState(0);
  const [amount, setAmount] = useState(12);
  const cause = CAUSES[active]!;
  const Icon = cause.icon;
  const listRef = useRef<HTMLUListElement>(null);

  return (
    <section
      id="causes"
      className="relative overflow-hidden bg-paper px-6 py-24 text-ink md:py-32"
    >
      {/* soft flare wash that follows the active cause */}
      <motion.div
        aria-hidden
        key={`wash-${cause.id}`}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.28, scale: 1 }}
        transition={{ duration: 1.1, ease }}
        className="pointer-events-none absolute -right-40 top-10 h-[42rem] w-[42rem] rounded-full bg-flare/25 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <span className="inline-block bg-tape px-6 py-2 font-stamp text-xs font-medium uppercase tracking-[0.32em]">
              Step three
            </span>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,5.4rem)] leading-[0.92]">
              Select the cause
              <br />
              <span className="text-flare">you want to support</span>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-ink/70">
            Dotis only pays verified charities. Pick one and every dollar your
            bandwidth earns lands there — nowhere else.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 items-stretch gap-10 lg:mt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Cause index */}
          <div className="flex h-full flex-col">
          <ul ref={listRef} className="flex flex-1 flex-col border-t border-ink/12">

            {CAUSES.map((item, index) => {
              const ItemIcon = item.icon;
              const isActive = index === active;
              return (
                <li key={item.id} className="border-b border-ink/12">
                  <button
                    type="button"
                    data-cursor-hover
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    aria-pressed={isActive}
                    className="group relative flex w-full items-center gap-6 overflow-hidden px-2 py-6 text-left md:py-8"
                  >
                    <motion.span
                      aria-hidden
                      className="absolute inset-y-0 left-0 -z-0 bg-ink"
                      initial={false}
                      animate={{ width: isActive ? "100%" : "0%" }}
                      transition={{ duration: 0.6, ease }}
                    />
                    <span
                      className={`relative z-10 font-stamp text-xs tracking-[0.3em] transition-colors duration-300 ${isActive ? "text-flare" : "text-ink/40"}`}
                    >
                      0{index + 1}
                    </span>
                    <motion.span
                      className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full"
                      initial={false}
                      animate={{
                        backgroundColor: isActive
                          ? "oklch(0.585 0.221 30.5)"
                          : "oklch(0.16 0.008 60 / 0.07)",
                        rotate: isActive ? 0 : -8,
                      }}
                      transition={{ duration: 0.5, ease }}
                    >
                      <ItemIcon
                        className={`h-5 w-5 transition-colors duration-300 ${isActive ? "text-paper" : "text-ink/60"}`}
                      />
                    </motion.span>
                    <span
                      className={`relative z-10 font-display text-[clamp(1.9rem,3.4vw,3.1rem)] uppercase leading-none transition-colors duration-300 ${isActive ? "text-paper" : "text-ink"}`}
                    >
                      {item.label}
                    </span>
                    <motion.span
                      className="relative z-10 ml-auto flex items-center gap-2 pr-2 font-stamp text-[0.65rem] uppercase tracking-[0.28em] text-flare"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 14 }}
                      transition={{ duration: 0.45, ease }}
                    >
                      <BadgeCheck className="h-4 w-4" />
                      Verified
                    </motion.span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Live impact card */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease }}
            className="relative self-start overflow-hidden rounded-3xl bg-ink p-8 text-paper shadow-[0_50px_110px_-45px_rgba(0,0,0,0.65)] md:p-10"
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-flare/30 blur-[90px]"
              animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.7, 0.45] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative flex items-center justify-between">
              <span className="font-stamp text-[0.65rem] uppercase tracking-[0.32em] text-paper/50">
                Impact preview
              </span>
              <span className="flex items-center gap-2 rounded-full border border-paper/20 px-3 py-1.5 font-stamp text-[0.6rem] uppercase tracking-[0.24em] text-paper/70">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-flare"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                Live
              </span>
            </div>

            <div className="relative mt-8 flex items-start gap-5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`icon-${cause.id}`}
                  initial={{ scale: 0.6, rotate: -25, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.6, rotate: 20, opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-flare"
                >
                  <Icon className="h-8 w-8 text-paper" />
                </motion.span>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={`title-${cause.id}`}
                  className="font-display text-[clamp(2.1rem,3.6vw,3.2rem)] uppercase leading-[0.92]"
                >
                  {cause.headline.map((line, li) => (
                    <span key={line} className="block overflow-hidden">
                      <motion.span
                        className="block"
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-110%" }}
                        transition={{ duration: 0.55, delay: li * 0.07, ease }}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </motion.h3>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={`blurb-${cause.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
                className="relative mt-6 text-base leading-relaxed text-paper/70"
              >
                {cause.blurb}
              </motion.p>
            </AnimatePresence>

            <div className="relative mt-8 rounded-2xl bg-paper/[0.06] p-6">
              <div className="flex items-baseline justify-between font-stamp text-[0.65rem] uppercase tracking-[0.26em] text-paper/50">
                <span>Bandwidth earnings / month</span>
                <span className="text-paper">${amount}</span>
              </div>
              <input
                type="range"
                min={2}
                max={40}
                step={1}
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
                aria-label="Monthly bandwidth earnings"
                data-cursor-hover
                className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-paper/20 accent-[oklch(0.585_0.221_30.5)]"
              />
              <div className="mt-6 flex items-end gap-3">
                <span className="font-display text-[clamp(2.6rem,5vw,4rem)] leading-none text-flare">
                  <Counter value={amount * cause.perDollar} />
                </span>
                <span className="pb-2 text-sm uppercase tracking-[0.18em] text-paper/60">
                  {cause.unit}
                </span>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-paper/45">
                Every dollar shown on your Impact Dashboard is donated directly to
                your chosen charity. Infrastructure, security and operating costs
                are covered separately by our enterprise network revenue.
              </p>
            </div>

            <div className="relative mt-7">
              <p className="font-stamp text-[0.6rem] uppercase tracking-[0.3em] text-paper/40">
                Whitelisted partners
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <AnimatePresence mode="popLayout">
                  {cause.charities.map((name, i) => (
                    <motion.span
                      key={`${cause.id}-${name}`}
                      initial={{ opacity: 0, y: 10, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.35, delay: i * 0.06, ease }}
                      className="flex items-center gap-1.5 rounded-full border border-paper/15 px-3.5 py-1.5 text-xs text-paper/80"
                    >
                      <BadgeCheck className="h-3.5 w-3.5 text-flare" />
                      {name}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <a
              href="#install"
              data-cursor-hover
              className="relative mt-8 flex items-center justify-center gap-3 rounded-full bg-flare px-8 py-4 text-base font-medium text-paper transition-transform duration-300 hover:scale-[1.02]"
            >
              <HeartHandshake className="h-5 w-5" />
              Support {cause.label.toLowerCase()}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
