import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { BadgeCheck, Droplets, Flame, PawPrint, Utensils } from "lucide-react";
import wildlifeImage from "@/assets/cause-wildlife.jpg";
import foodImage from "@/assets/cause-food.jpg";
import disasterImage from "@/assets/cause-disaster.jpg";
import waterImage from "@/assets/cause-water.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const CAUSES = [
  {
    id: "wildlife",
    label: "Wildlife rescue",
    short: "Wildlife",
    icon: PawPrint,
    image: wildlifeImage,
    alt: "A wildlife rescue worker carrying a koala through a sanctuary",
    blurb: "Fund rescue, rehabilitation and protected habitats for animals with nowhere left to go.",
    charities: ["WildAid", "IFAW", "The Nature Conservancy"],
    unit: "animals treated",
    perDollar: 0.42,
  },
  {
    id: "food",
    label: "Food aid",
    short: "Food",
    icon: Utensils,
    image: foodImage,
    alt: "Volunteers preparing meals in a community kitchen",
    blurb: "Put warm meals on tables through community kitchens and trusted local food banks.",
    charities: ["Feeding America", "OXFAM", "Action Against Hunger"],
    unit: "meals served",
    perDollar: 8.5,
  },
  {
    id: "disaster",
    label: "Disaster relief",
    short: "Relief",
    icon: Flame,
    image: disasterImage,
    alt: "Disaster relief volunteers organizing emergency supplies after a flood",
    blurb: "Back first responders with shelter, medicine and supplies in the hours that matter most.",
    charities: ["Direct Relief", "Mercy Corps", "CARE"],
    unit: "emergency kits",
    perDollar: 1.1,
  },
  {
    id: "water",
    label: "Clean water",
    short: "Water",
    icon: Droplets,
    image: waterImage,
    alt: "A community gathering around a new clean-water pump",
    blurb: "Build wells, filters and lasting repairs that keep safe water flowing every day.",
    charities: ["charity: water", "WaterAid", "Water.org"],
    unit: "days of water",
    perDollar: 6.2,
  },
] as const;

function Counter({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 70, damping: 20 });
  const text = useTransform(spring, (v) => (v >= 100 ? Math.round(v).toLocaleString() : v.toFixed(1)));

  useEffect(() => mv.set(value), [mv, value]);
  return <motion.span>{text}</motion.span>;
}

export function ChooseCause() {
  const [active, setActive] = useState(0);
  const [amount, setAmount] = useState(12);
  const cause = CAUSES[active];

  return (
    <section id="causes" className="overflow-hidden bg-paper py-24 text-ink md:py-32">
      <div className="mx-auto max-w-[1800px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <span className="inline-block bg-tape px-6 py-2 font-stamp text-xs font-medium uppercase tracking-[0.32em]">Step three</span>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,5.4rem)] leading-[0.92]">
              Select the cause<br /><span className="text-flare">you want to support</span>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-ink/70">
            Dotis only pays verified charities. Pick your cause and every dollar your bandwidth earns lands there.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.9, ease }}
        className="mt-14 px-3 md:mt-20 md:px-6"
      >
        <div className="mx-auto flex h-[690px] max-w-[1880px] flex-col gap-2 md:h-[680px] md:flex-row md:gap-3">
          {CAUSES.map((item, index) => {
            const isActive = active === index;
            const Icon = item.icon;
            return (
              <motion.article
                key={item.id}
                layout
                transition={{ layout: { duration: 0.75, ease } }}
                className="relative min-h-0 overflow-hidden bg-ink text-paper"
                animate={{ flex: isActive ? 8 : 1 }}
              >
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Select ${item.label}`}
                  aria-pressed={isActive}
                  data-cursor-hover
                  className="absolute inset-0 z-10 w-full text-left"
                >
                  <span className="sr-only">Select {item.label}</span>
                </button>

                <motion.img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  width={1280}
                  height={900}
                  className="absolute inset-0 h-full w-full object-cover"
                  animate={{ scale: isActive ? 1 : 1.08, filter: isActive ? "saturate(1)" : "saturate(.55)" }}
                  transition={{ duration: 0.9, ease }}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/10 to-ink/20" />

                <div className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-3 md:left-5 md:top-5">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${isActive ? "bg-flare" : "bg-paper/90"}`}>
                    <Icon className={`h-5 w-5 ${isActive ? "text-paper" : "text-ink"}`} />
                  </span>
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        className="flex items-center gap-2 whitespace-nowrap bg-paper px-4 py-2 font-stamp text-[0.6rem] uppercase tracking-[0.24em] text-ink"
                      >
                        <BadgeCheck className="h-4 w-4 text-flare" /> Verified only
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key="open"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                      transition={{ duration: 0.55, delay: 0.2, ease }}
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5 md:p-8 lg:p-10"
                    >
                      <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.9fr]">
                        <div>
                          <p className="font-stamp text-[0.62rem] uppercase tracking-[0.3em] text-paper/70">0{index + 1} / choose your impact</p>
                          <h3 className="mt-3 font-display text-[clamp(2.8rem,5vw,5.4rem)] uppercase leading-[0.9]">{item.label}</h3>
                          <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/80 md:text-base">{item.blurb}</p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {item.charities.map((name) => (
                              <span key={name} className="border border-paper/30 bg-ink/35 px-3 py-1.5 text-xs backdrop-blur-sm">{name}</span>
                            ))}
                          </div>
                        </div>

                        <div className="pointer-events-auto bg-paper p-5 text-ink md:p-6">
                          <div className="flex items-center justify-between font-stamp text-[0.6rem] uppercase tracking-[0.2em] text-ink/60">
                            <span>Monthly earnings</span><span className="text-ink">${amount}</span>
                          </div>
                          <input
                            type="range"
                            min={2}
                            max={40}
                            value={amount}
                            onChange={(event) => setAmount(Number(event.target.value))}
                            aria-label="Monthly bandwidth earnings"
                            className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink/15 accent-[oklch(0.585_0.221_30.5)]"
                          />
                          <p className="mt-5 flex items-end gap-2">
                            <span className="font-display text-5xl leading-none text-flare"><Counter value={amount * item.perDollar} /></span>
                            <span className="pb-1 text-xs uppercase tracking-[0.14em] text-ink/60">{item.unit}</span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center md:bottom-8">
                      <span className="font-display text-2xl uppercase md:[writing-mode:vertical-rl] md:rotate-180">{item.short}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        <div className="mx-auto mt-5 flex max-w-[1880px] items-center justify-between gap-6 border-t border-ink/15 pt-5">
          <p className="max-w-3xl text-sm leading-relaxed text-ink/65">
            Every dollar shown on your Impact Dashboard is donated directly to your chosen charity. We cover infrastructure, security and operating costs separately.
          </p>
          <p className="hidden shrink-0 font-stamp text-[0.62rem] uppercase tracking-[0.28em] text-flare md:block">Click a card to explore</p>
        </div>
      </motion.div>
    </section>
  );
}