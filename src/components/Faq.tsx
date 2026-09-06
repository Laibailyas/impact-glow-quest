import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  {
    q: "Does Dotis slow down my internet?",
    a: "No. Dotis only uses bandwidth you aren't using, and it steps aside the moment you stream, call or game. You can also cap it or pause it at any time.",
  },
  {
    q: "Is any of my personal data shared?",
    a: "Never. Dotis routes public web requests through spare bandwidth only. Your files, accounts, messages and browsing history are never accessed.",
  },
  {
    q: "How much does it cost me?",
    a: "Nothing. You don't pay a cent and you don't donate your own money — the value comes from enterprise clients paying for network access.",
  },
  {
    q: "Where does the money actually go?",
    a: "Every dollar shown on your Impact Dashboard is donated directly to the charity you chose. Our infrastructure, security and operating costs are covered separately from enterprise revenue.",
  },
  {
    q: "How are charities chosen?",
    a: "Only vetted, registered organisations make the whitelist. Each one is reviewed for financial transparency and reporting before it can receive a single donation.",
  },
  {
    q: "Can I switch causes or stop anytime?",
    a: "Yes. Change your cause whenever you like, pause sharing with one switch, or uninstall in seconds. Nothing is locked in.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-paper px-6 py-24 text-ink md:py-32">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <span className="inline-block bg-tape px-6 py-2 font-stamp text-xs font-medium uppercase tracking-[0.32em]">
            Questions
          </span>
          <h2 className="mt-6 font-display text-[clamp(2.6rem,5.2vw,5rem)] leading-[0.92]">
            Everything
            <br />
            <span className="text-flare">worth asking</span>
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink/70">
            Straight answers about speed, privacy and where the money lands.
          </p>
        </motion.div>

        <ul className="border-t border-ink/12">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={item.q}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: i * 0.05, ease }}
                className="border-b border-ink/12"
              >
                <button
                  type="button"
                  data-cursor-hover
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-6 py-7 text-left"
                >
                  <span className="font-stamp text-xs tracking-[0.3em] text-ink/40">0{i + 1}</span>
                  <span
                    className={`flex-1 font-display text-[clamp(1.4rem,2.4vw,2.2rem)] uppercase leading-tight transition-colors duration-300 ${isOpen ? "text-flare" : "text-ink"}`}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 135 : 0, backgroundColor: isOpen ? "oklch(0.585 0.221 30.5)" : "oklch(0.16 0.008 60 / 0.07)" }}
                    transition={{ duration: 0.4, ease }}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
                  >
                    <Plus className={`h-5 w-5 ${isOpen ? "text-paper" : "text-ink/60"}`} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 pl-12 text-base leading-relaxed text-ink/70 md:text-lg">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
