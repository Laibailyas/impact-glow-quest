import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/CustomCursor";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ChooseCause } from "@/components/ChooseCause";
import { SecurityControl } from "@/components/SecurityControl";
import { SocialProof } from "@/components/SocialProof";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dotis — Let your feed, feed someone" },
      { name: "description", content: "Share unused internet and generate donations for causes that need it most — at no cost to you." },
      { property: "og:title", content: "Dotis — Let your feed, feed someone" },
      { property: "og:description", content: "Turn unused bandwidth into donations for wildlife, disaster relief, and food aid." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <CustomCursor />
      <Hero />
      <HowItWorks />
      <ChooseCause />
      <SecurityControl />
      <SocialProof />
      <Faq />
      <FinalCta />
    </main>
  );
}
