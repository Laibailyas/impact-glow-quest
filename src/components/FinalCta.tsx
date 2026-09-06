import { motion } from "motion/react";
import { Apple, Download } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const STEPS = ["Sign up in 30 seconds", "Install the app", "Pick your cause", "Watch the impact roll in"];

export function FinalCta() {
  return (
    <section
      id="install"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 py-28 text-paper"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flare/25 blur-[140px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="inline-block bg-flare px-7 py-2.5 font-stamp text-xs font-medium uppercase tracking-[0.32em] text-paper"
        >
          Ready when you are
        </motion.span>

        <h2 className="mt-8 font-display text-[clamp(3rem,8vw,8rem)] uppercase leading-[0.88]">
          {["Start giving", "without giving"].map((line, li) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className={`block ${li === 1 ? "text-flare" : ""}`}
                initial={{ y: "110%", rotate: 3 }}
                whileInView={{ y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, delay: li * 0.1, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-paper/70 md:text-xl"
        >
          Free forever, off in one tap, and every dollar lands with a verified charity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#causes"
            data-cursor-hover
            className="inline-flex items-center gap-3 rounded-full bg-flare px-9 py-4 text-lg font-medium text-paper transition-transform duration-300 hover:scale-[1.03]"
          >
            <Download className="h-5 w-5" />
            Install Dotis — it's free
          </a>
          <a
            href="#faq"
            data-cursor-hover
            className="inline-flex items-center gap-3 rounded-full border border-paper/25 px-8 py-4 text-lg text-paper/80 transition-colors duration-300 hover:border-paper/60 hover:text-paper"
          >
            <Apple className="h-5 w-5" />
            See how it works
          </a>
        </motion.div>

        <ol className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.li
              key={step}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i, ease }}
              className="rounded-2xl border border-paper/12 bg-paper/[0.04] px-5 py-6 text-left"
            >
              <span className="font-stamp text-[0.62rem] uppercase tracking-[0.28em] text-flare">Step 0{i + 1}</span>
              <p className="mt-3 text-base leading-snug text-paper/85">{step}</p>
            </motion.li>
          ))}
        </ol>

        <p className="mt-16 font-stamp text-[0.6rem] uppercase tracking-[0.3em] text-paper/40">
          Dotis — let your feed, feed someone
        </p>
      </div>
    </section>
  );
}
