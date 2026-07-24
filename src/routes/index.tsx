import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { SpideySwinger, SpiderIcon, WebCorner } from "@/components/spidey";
import { CursorWebTrail } from "@/components/cursor-web";
import { Skyline } from "@/components/skyline";
import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brand New Day — Mission Brief" },
      {
        name: "description",
        content: "Spider-Man: Brand New Day. Want to team up for the mission?",
      },
      { property: "og:title", content: "Brand New Day — Mission Brief" },
      {
        property: "og:description",
        content: "A cinematic invite to see Spider-Man: Brand New Day together.",
      },
    ],
  }),
  component: Index,
});

type Stage = "story" | "form" | "ticket";

interface FormData {
  name: string;
  mobile: string;
  email: string;
  day: string;
  customDate?: string;
}

function Index() {
  const [stage, setStage] = useState<Stage>("story");
  const [confirmed, setConfirmed] = useState<FormData | null>(null);
  const [swingCount, setSwingCount] = useState(0);
  const [swingConfig, setSwingConfig] = useState({
    direction: "left" as "left" | "right",
    startY: "15vh",
    endY: "35vh",
    duration: 2.4,
  });

  useEffect(() => {
    // Trigger swinging Spidey animation across all pages every 7 seconds
    const interval = setInterval(() => {
      setSwingCount((prev) => prev + 1);
      setSwingConfig({
        direction: Math.random() > 0.5 ? "left" : "right",
        startY: `${Math.random() * 20 + 5}vh`, // Random start Y (5vh to 25vh)
        endY: `${Math.random() * 20 + 25}vh`, // Random end Y (25vh to 45vh)
        duration: Math.random() * 0.8 + 2.0, // Random duration (2.0s to 2.8s)
      });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CursorWebTrail />
      <CornerWebs />
      <CrawlingSpiders />

      {/* Global swinging Spidey animation from random directions every 7 seconds */}
      <motion.div
        key={`global-swinging-spidey-${swingCount}`}
        initial={{
          x: swingConfig.direction === "left" ? "-40vw" : "115vw",
          y: swingConfig.startY,
          rotate: swingConfig.direction === "left" ? -25 : 25,
          scaleX: swingConfig.direction === "left" ? 1 : -1,
        }}
        animate={{
          x: swingConfig.direction === "left" ? "115vw" : "-40vw",
          y: swingConfig.endY,
          rotate: swingConfig.direction === "left" ? 15 : -15,
        }}
        transition={{ duration: swingConfig.duration, ease: "easeInOut" }}
        className="pointer-events-none fixed left-0 top-0 z-50 h-64 w-48"
      >
        <SpideySwinger className="h-full w-full" />
      </motion.div>

      <AnimatePresence mode="wait">
        {stage === "story" && (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            <ComicStory />
            <Timeline />
            <MissionCard onAccept={() => setStage("form")} />
            <Footer />
          </motion.div>
        )}
        {stage === "form" && (
          <WebSwingTransition key="form">
            <RegistrationPage
              onSubmit={(d) => {
                setConfirmed(d);
                setStage("ticket");
              }}
            />
          </WebSwingTransition>
        )}
        {stage === "ticket" && confirmed && (
          <motion.div
            key="ticket"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <SuccessScreen data={confirmed} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Corner webs & spiders ---------- */

function CornerWebs() {
  return (
    <>
      <WebCorner className="pointer-events-none fixed left-0 top-0 z-10 h-40 w-40 md:h-56 md:w-56" />
      <WebCorner
        className="pointer-events-none fixed right-0 top-0 z-10 h-40 w-40 md:h-56 md:w-56"
        flip
      />
    </>
  );
}

function CrawlingSpiders() {
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-2 top-1/3 z-20"
        animate={{ y: [0, 40, 0, -20, 0], rotate: [0, 10, -5, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <SpiderIcon className="h-6 w-6 opacity-80" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed right-3 top-2/3 z-20"
        animate={{ y: [0, -30, 10, -15, 0], rotate: [0, -8, 5, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <SpiderIcon className="h-5 w-5 opacity-70" />
      </motion.div>
    </>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const skylineY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      <motion.div style={{ y: skylineY }} className="absolute inset-x-0 bottom-0 h-[55%]">
        <Skyline className="h-full w-full" />
      </motion.div>

      <div className="absolute inset-0 halftone pointer-events-none opacity-30 mix-blend-multiply" />

      {/* Swinging Spidey */}
      <motion.div
        initial={{ x: "-60vw", y: "-40vh", rotate: -20, opacity: 0 }}
        animate={{ x: 0, y: 0, rotate: [0, 8, -4, 0], opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute right-[8%] top-8 z-20 h-64 w-48 md:h-96 md:w-72"
      >
        <SpideySwinger className="h-full w-full drop-shadow-[6px_6px_0_oklch(0.14_0.02_40)]" />
      </motion.div>

      <motion.div
        style={{ y: titleY }}
        className="relative z-30 max-w-4xl -mt-28 text-center md:-mt-40"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-4 inline-block rounded-full border-2 border-ink bg-cream px-4 py-1 text-xs uppercase tracking-[0.3em] text-ink"
          style={{ fontFamily: "var(--font-comic)" }}
        >
          The Daily Bugle · Special Edition
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-5xl leading-[0.95] text-ink md:text-8xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          A <span className="text-primary">Brand New Day</span>
          <br /> deserves a pretty
          <br />{" "}
          <span className="inline-block -translate-y-2 md:-translate-y-4">good teammate.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mx-auto mt-8 max-w-xl text-lg text-brown-deep md:text-xl"
        >
          Spider-Man has MJ.
          <br />
          Miles has Gwen.
          <br />I figured I probably shouldn't watch this one alone either…
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" })}
          className="comic-border mt-10 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground"
          style={{ fontFamily: "var(--font-comic)", letterSpacing: "0.05em" }}
        >
          🕸 Continue the Mission
        </motion.button>
      </motion.div>
    </section>
  );
}

/* ---------- Comic story panels ---------- */

const panels = [
  { text: "Spider-Man: Brand New Day is finally here.", tag: "ISSUE #01" },
  { text: "Watching it alone would still be fun…", tag: "ISSUE #02" },
  { text: "But watching it with someone who loves Marvel? Way better.", tag: "ISSUE #03" },
  { text: "No pressure. Just thought it'd be fun if you came along.", tag: "ISSUE #04" },
];

function ComicStory() {
  return (
    <section className="relative px-6 py-24">
      <h2
        className="mb-12 text-center text-4xl text-ink md:text-6xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        The <span className="text-primary">Story</span> So Far
      </h2>
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        {panels.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="comic-border newsprint relative overflow-hidden rounded-lg p-8"
          >
            <div className="absolute inset-0 halftone opacity-20" />
            <div
              className="relative mb-3 inline-block bg-ink px-3 py-1 text-xs text-cream"
              style={{ fontFamily: "var(--font-comic)", letterSpacing: "0.15em" }}
            >
              {p.tag}
            </div>
            <p
              className="relative text-2xl leading-snug text-ink md:text-3xl"
              style={{ fontFamily: "var(--font-comic)" }}
            >
              {p.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Timeline ---------- */

const timeline = [
  {
    title: "Before Movie",
    icon: "🗞",
    items: ["Meet up.", "Avoid spoilers at all costs."],
  },
  {
    title: "During Movie",
    icon: "🍿",
    items: ["Popcorn is compulsory.", "Sharing is optional.", "(I might steal one or two 😅)"],
  },
  {
    title: "After Movie",
    icon: "🕸",
    items: [
      "We grab your favourite — 🍝 pasta, 🍔 burger, or 🍩 donuts…",
      "…and dissect every post-credit scene & Spider-theory.",
    ],
  },
];

function Timeline() {
  return (
    <section className="relative px-6 py-24">
      <h2
        className="mb-16 text-center text-4xl text-ink md:text-6xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Mission <span className="text-primary">Timeline</span>
      </h2>
      <div className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {timeline.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="glass-panel comic-border rounded-2xl p-6"
          >
            <div className="mb-3 text-5xl">{t.icon}</div>
            <h3
              className="mb-4 text-2xl text-primary"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.title}
            </h3>
            <ul className="space-y-2 text-brown-deep">
              {t.items.map((it, j) => (
                <li key={j} className="flex gap-2">
                  <span className="text-primary">▸</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Mission Card w/ runaway Nope ---------- */

const nopeMessages = [
  "🍿 I'll buy the popcorn.",
  "🍝 Your favourite pasta afterwards?",
  "🍔 Burgers are officially on the mission list.",
  "🍩 Fine… donuts too.",
  "😄 It'll actually be a really fun day.",
];

function MissionCard({ onAccept }: { onAccept: () => void }) {
  const [nopePos, setNopePos] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState(0);
  const [bubble, setBubble] = useState<string | null>(null);
  const [finalMsg, setFinalMsg] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const nopeRef = useRef<HTMLButtonElement>(null);

  const runAway = () => {
    const card = cardRef.current;
    const btn = nopeRef.current;
    if (!card || !btn) return;

    // Use bounded translation offsets relative to center so the button never leaves the card area
    const x = (Math.random() - 0.5) * 280; // -140px to +140px
    const y = (Math.random() - 0.5) * 160; // -80px to +80px
    setNopePos({ x, y });

    const next = clicks + 1;
    setClicks(next);
    setBubble(nopeMessages[Math.min(next - 1, nopeMessages.length - 1)]);

    if (next >= 5) {
      setTimeout(() => {
        setFinalMsg(true);
        setBubble(null);
      }, 900);
    }
  };

  return (
    <section id="mission" className="relative px-6 py-24">
      <div
        ref={cardRef}
        className="comic-border-red newsprint relative mx-auto max-w-3xl overflow-hidden rounded-2xl p-8 md:p-14"
        style={{ minHeight: 520 }}
      >
        <div className="absolute inset-0 halftone opacity-20" />
        <div className="relative text-center">
          <div
            className="mx-auto mb-6 inline-block rounded-md bg-ink px-4 py-1 text-xs text-cream"
            style={{ fontFamily: "var(--font-comic)", letterSpacing: "0.3em" }}
          >
            CLASSIFIED · S.H.I.E.L.D.
          </div>
          <h2
            className="text-5xl text-ink md:text-7xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Mission <span className="text-primary">Brief</span>
          </h2>
          <p
            className="mx-auto mt-6 max-w-lg text-lg text-brown-deep md:text-xl"
            style={{ fontFamily: "var(--font-comic)" }}
          >
            Spider-Man: Brand New Day is almost here… Want to team up for this mission?
          </p>

          <div className="relative mt-12 flex min-h-40 flex-wrap items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.06, rotate: -2 }}
              whileTap={{ scale: 0.94 }}
              onClick={onAccept}
              className="comic-border rounded-full bg-primary px-8 py-4 text-xl text-primary-foreground"
              style={{ fontFamily: "var(--font-comic)", letterSpacing: "0.05em" }}
            >
              🕷 Suit Up!
            </motion.button>

            {!finalMsg && (
              <motion.button
                ref={nopeRef}
                animate={{ x: nopePos.x, y: nopePos.y }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                onMouseEnter={runAway}
                onFocus={runAway}
                onClick={runAway}
                className="comic-border rounded-full bg-cream px-8 py-4 text-xl text-ink"
                style={{ fontFamily: "var(--font-comic)", letterSpacing: "0.05em" }}
              >
                🕸 Nope…
              </motion.button>
            )}
          </div>

          <AnimatePresence>
            {bubble && (
              <motion.div
                key={bubble + clicks}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                className="speech-bubble mx-auto mt-10 inline-block max-w-md text-lg text-ink"
              >
                {bubble}
              </motion.div>
            )}
            {finalMsg && (
              <motion.div
                key="final"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="speech-bubble mx-auto mt-10 inline-block max-w-md text-xl text-ink"
              >
                Well… I guess the multiverse has already decided. 😆
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------- Web-swing transition ---------- */

function WebSwingTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <motion.div
        initial={{ x: "-100vw", y: "-30vh", rotate: -30 }}
        animate={{ x: "120vw", y: "20vh", rotate: 20 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.6, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-40 h-72 w-56"
      >
        <SpideySwinger className="h-full w-full" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ---------- Registration ---------- */

const days = ["Thursday", "Friday", "Saturday", "Sunday", "Custom Date"];

function RegistrationPage({ onSubmit }: { onSubmit: (d: FormData) => void }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { day: "Friday" },
  });
  const selectedDay = watch("day");

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 inline-block rounded-full border-2 border-ink bg-cream px-4 py-1 text-xs uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-comic)" }}
          >
            Recruitment · Restricted
          </div>
          <h2
            className="text-5xl text-ink md:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Suit <span className="text-primary">Up</span>
          </h2>
          <p className="mt-3 text-brown-deep">
            Great power comes with great... administrative tasks. Sorry.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="glass-panel comic-border space-y-6 rounded-2xl p-8"
        >
          <Field label="Name" error={errors.name?.message}>
            <input
              {...register("name", { required: "Even heroes need a name." })}
              placeholder="(Maybe someone named Saina?)"
              className="w-full rounded-lg border-2 border-ink bg-cream/80 px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>

          <Field label="Mobile Number" error={errors.mobile?.message}>
            <input
              type="text"
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel"
              {...register("mobile", {
                required: "Spider-Signal needs a phone.",
                setValueAs: (value) => String(value ?? "").replace(/\D/g, "").slice(0, 10),
                validate: (value) =>
                  /^\d{10}$/.test(String(value ?? "")) || "Enter exactly 10 digits.",
              })}
              placeholder="Enter 10 digits only"
              className="w-full rounded-lg border-2 border-ink bg-cream/80 px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>

          <Field label="Email" error={errors.email?.message}>
            <input
              type="email"
              {...register("email", { required: "Where do I send the mission?" })}
              placeholder="Where should Spidey send the mission details?"
              className="w-full rounded-lg border-2 border-ink bg-cream/80 px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>

          <div>
            <label className="mb-3 block text-sm font-bold uppercase tracking-widest text-ink">
              Preferred Day
            </label>
            <div className="flex flex-wrap gap-2">
              {days.map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setValue("day", d)}
                  className={`comic-border rounded-full px-5 py-2 text-sm transition ${
                    selectedDay === d
                      ? "bg-primary text-primary-foreground"
                      : "bg-cream text-ink hover:bg-secondary"
                  }`}
                  style={{ fontFamily: "var(--font-comic)" }}
                >
                  {d}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {selectedDay === "Custom Date" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <input
                    type="date"
                    {...register("customDate")}
                    className="w-full rounded-lg border-2 border-ink bg-cream/80 px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, rotate: -1 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="comic-border w-full rounded-full bg-primary py-4 text-xl text-primary-foreground"
            style={{ fontFamily: "var(--font-comic)", letterSpacing: "0.06em" }}
          >
            🕸 Confirm Mission
          </motion.button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-ink">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-primary">{error}</p>}
    </div>
  );
}

/* ---------- Success / Ticket ---------- */

/* ---------- Success / Ticket ---------- */

/* ---------- Integration Helpers ---------- */

const sendEmailFn = createServerFn({ method: "POST" })
  .validator((d: { name: string; email: string; mobile: string; date: string }) => d)
  .handler(async ({ data }) => {
    const adminEmail = "jaisingpure.harsh08@gmail.com";
    const gmailUser = process.env.GMAIL_USER ?? adminEmail;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const userEmail = data.email;
    const mobile = data.mobile.replace(/\D/g, "");

    if (!/^\d{10}$/.test(mobile)) {
      return { success: false, error: "Mobile number must be exactly 10 digits." };
    }

    const userSubject = `🕷️ Mission Accepted: ${data.name} joined Brand New Day`;
    const adminSubject = `🕷️ Mission Confirmation: ${data.name} submitted the form`;

    const emailHtml = `
      <div style="font-family: 'Courier New', Courier, monospace; max-width: 600px; margin: 0 auto; border: 3px solid #111; padding: 25px; background-color: #faf8f5; box-shadow: 8px 8px 0 #111;">
        <h1 style="color: #e11d48; text-align: center; text-transform: uppercase; border-bottom: 2px dashed #111; padding-bottom: 15px; margin-top: 0;">
          🕷️ MISSION BRIEFING ACCEPTED 🕸️
        </h1>
        <p style="font-size: 16px;">Attention Agents,</p>
        <p style="font-size: 16px;">The recruit questionnaire has been received. S.H.I.E.L.D. Command has scheduled a collaborative screening operation:</p>
        
        <div style="background-color: #f1ede4; border: 2px solid #111; padding: 15px; margin: 20px 0; border-radius: 8px;">
          <table style="width: 100%; font-size: 15px;">
            <tr><td style="padding: 6px 0; font-weight: bold; width: 40%;">OPERATION:</td><td>Spider-Man: Brand New Day</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">HOST AGENT:</td><td>Harsh</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">PARTNER AGENT:</td><td>${data.name}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">RECRUIT EMAIL:</td><td>${data.email}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">CONTACT PHONE:</td><td>${mobile}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">MISSION DATE:</td><td>${data.date}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">SUPPLIES:</td><td>🍿 Compulsory Popcorn</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">POST-MISSION:</td><td>🍝 Pasta / 🍔 Burger / 🍩 Donuts</td></tr>
          </table>
        </div>
        
        <p style="text-align: center; font-size: 16px; font-weight: bold; margin-top: 25px; color: #111;">
          "A Brand New Day deserves a pretty good teammate."
        </p>
      </div>
    `;

    if (gmailUser && gmailAppPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUser,
            pass: gmailAppPassword,
          },
        });

        await transporter.sendMail({
          from: `Spidey Invites <${adminEmail}>`,
          to: userEmail,
          subject: userSubject,
          html: emailHtml,
          replyTo: data.email,
        });

        await transporter.sendMail({
          from: `Spidey Invites <${adminEmail}>`,
          to: adminEmail,
          subject: adminSubject,
          html: emailHtml,
          replyTo: data.email,
        });

        return { success: true, provider: "gmail" };
      } catch (error) {
        console.error("Gmail SMTP error:", error);
        return { success: false, error: String(error) };
      }
    }

    console.log("[EMAIL SIMULATION] Missing Gmail credentials. Email data:", {
      to: userEmail,
      adminTo: adminEmail,
      userSubject,
      adminSubject,
      html: emailHtml,
    });
    return { success: false, missingCredentials: true };
  });

function getWhatsAppUrl(data: FormData) {
  const adminNumber = "919529389244";
  const date = data.day === "Custom Date" ? data.customDate || "TBD" : data.day;
  const mobile = data.mobile.replace(/\D/g, "");
  const message =
    `🕷️ *MISSION BRIEFING ACCEPTED* 🕸️\n\n` +
    `• *Agent:* ${data.name}\n` +
    `• *Spider-Phone:* ${mobile}\n` +
    `• *Email:* ${data.email}\n` +
    `• *Preferred Day:* ${date}\n\n` +
    `"A Brand New Day deserves a pretty good teammate." 🍿 Let's suit up, Harsh! 🎬`;
  return `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
}

function getGoogleCalendarUrl(data: FormData) {
  const title = encodeURIComponent("🕷️ Spider-Man: Brand New Day Movie Mission");
  let dateStr = "";

  if (data.day === "Custom Date" && data.customDate) {
    const cleanDate = data.customDate.replace(/-/g, "");
    dateStr = `${cleanDate}T180000/${cleanDate}T210000`; // 6 PM - 9 PM
  } else {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0].replace(/-/g, "");
    dateStr = `${formattedToday}/${formattedToday}`;
  }

  const details = encodeURIComponent(
    `Mission Briefing:\n` +
      `-------------------\n` +
      `Agent Host: Harsh\n` +
      `Agent Partner: ${data.name}\n` +
    `Spider-Phone: ${data.mobile.replace(/\D/g, "")}\n` +
      `Email: ${data.email}\n` +
      `Preferred Day: ${data.day === "Custom Date" ? data.customDate : data.day}\n\n` +
      `🍿 Popcorn is compulsory. Sharing is optional!\n` +
      `🎬 Movie & post-credits theory discussion.`,
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}&details=${details}`;
}

/* ---------- Success / Ticket ---------- */

function SuccessScreen({ data }: { data: FormData }) {
  const [showTicket, setShowTicket] = useState(false);

  const date = data.day === "Custom Date" ? data.customDate || "TBD" : data.day;

  useEffect(() => {
    const t = setTimeout(() => setShowTicket(true), 1600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showTicket) return;

    // Automatically trigger email sending to both recruit and Harsh (admin)
    const triggerEmail = async () => {
      try {
        const res = await sendEmailFn({
          data: {
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            date: date,
          },
        });
        if (res.success) {
          toast.success(
            "Mission briefing emailed to you, with Harsh copied in. Check your inbox or spam folder if you do not see it.",
          );
        } else if (res.missingCredentials) {
          toast.error("Set GMAIL_USER and GMAIL_APP_PASSWORD to send the mission email.");
        } else {
          toast.error("Mission saved, but briefing email delivery failed.");
        }
      } catch (err) {
        console.error("Email API failed:", err);
      }
    };
    triggerEmail();
  }, [showTicket, data, date]);

  return (
    <section className="relative min-h-screen px-6 py-20">
      {/* Confetti + SFX */}
      <Confetti />
      <SoundEffects />

      <div className="mx-auto max-w-2xl text-center">
        <motion.h2
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-6xl text-primary md:text-8xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Mission Accepted ✅
        </motion.h2>
        <p className="mt-4 text-sm text-brown-deep">
          Check your inbox, and if you do not see the email, please check the spam or junk folder.
        </p>

        <AnimatePresence>
          {showTicket && (
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 60, rotate: -6 }}
                animate={{ opacity: 1, y: 0, rotate: -2 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="comic-border newsprint relative mx-auto mt-12 max-w-xl overflow-hidden rounded-2xl p-8 text-left w-full"
              >
                <div className="absolute inset-0 halftone opacity-15" />
                <div className="relative">
                  <div className="flex items-center justify-between border-b-2 border-dashed border-ink pb-4">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-primary font-bold tracking-[0.2em]">
                        🕷️ S.H.I.E.L.D. MISSION PASS
                      </div>
                    </div>
                    <SpiderIcon className="h-10 w-10" />
                  </div>

                  <TicketRow k="Movie" v="Spider-Man: Brand New Day" />
                  <TicketRow k="Mission Host" v="Harsh" />
                  <TicketRow k="Mission Date" v={date} />
                  <TicketRow k="Theatre" v="To be decided after discussion." />
                  <TicketRow k="Show Time" v="To be decided after discussion." />
                  <TicketRow k="Mission Snacks" v="🍿 Popcorn" />
                  <TicketRow k="After Movie" v="🍝 Pasta · 🍔 Burger · 🍩 Donuts" />

                  <p
                    className="mt-6 border-t-2 border-dashed border-ink pt-4 text-center text-lg text-brown-deep"
                    style={{ fontFamily: "var(--font-comic)" }}
                  >
                    Looking forward to an amazing Spider-Man day together.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex flex-col sm:flex-row justify-center gap-4 w-full max-w-xl"
              >
                <a
                  href={getWhatsAppUrl(data)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="comic-border flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-bold text-white hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 flex-1 cursor-pointer"
                  style={{ fontFamily: "var(--font-comic)", textShadow: "1px 1px 0 var(--ink)" }}
                >
                  💬 Send to WhatsApp
                </a>
                <a
                  href={getGoogleCalendarUrl(data)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="comic-border flex items-center justify-center gap-2 rounded-full bg-[#4285F4] px-6 py-4 font-bold text-white hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 flex-1 cursor-pointer"
                  style={{ fontFamily: "var(--font-comic)", textShadow: "1px 1px 0 var(--ink)" }}
                >
                  📅 Add to Google Calendar
                </a>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function TicketRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="mt-4 flex flex-col gap-1 border-b border-dashed border-ink/40 pb-2 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs uppercase tracking-widest text-brown-deep">{k}</span>
      <span className="text-right text-ink" style={{ fontFamily: "var(--font-comic)" }}>
        {v}
      </span>
    </div>
  );
}

function SoundEffects() {
  const words = ["THWIP!", "POW!", "BOOM!"];
  return (
    <>
      {words.map((w, i) => (
        <motion.div
          key={w}
          initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.3, 1.2, 1, 0.9], rotate: [-15, 5, -3, 10] }}
          transition={{ duration: 1.6, delay: 0.2 + i * 0.25 }}
          className="pointer-events-none fixed z-40 text-5xl text-primary md:text-7xl"
          style={{
            fontFamily: "var(--font-comic)",
            textShadow: "4px 4px 0 var(--ink)",
            left: `${15 + i * 30}%`,
            top: `${25 + (i % 2) * 20}%`,
          }}
        >
          {w}
        </motion.div>
      ))}
    </>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 40 });
  const colors = [
    "oklch(0.52 0.17 27)",
    "oklch(0.32 0.06 45)",
    "oklch(0.955 0.028 82)",
    "oklch(0.14 0.02 40)",
  ];
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {pieces.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -50, x: `${Math.random() * 100}%`, rotate: 0, opacity: 1 }}
          animate={{ y: "110vh", rotate: 720, opacity: [1, 1, 0] }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.6,
            ease: "easeIn",
          }}
          className="absolute h-3 w-3"
          style={{
            background: colors[i % colors.length],
            border: "1.5px solid oklch(0.14 0.02 40)",
            borderRadius: i % 3 === 0 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="relative border-t-2 border-ink/20 px-6 py-10 text-center text-sm text-brown-deep">
      <p style={{ fontFamily: "var(--font-comic)" }}>
        The Daily Bugle · Vol. 1 · A Friendly Neighborhood Invitation
      </p>
    </footer>
  );
}
