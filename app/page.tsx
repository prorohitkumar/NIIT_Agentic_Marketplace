import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { BentoCard } from '@/components/bento-card';
import { HeroBackgroundCarousel } from '@/components/hero-background-carousel';

export default async function Home() {
  const promptsCount = '1000+';
  const workflowsCount = '2+';
  const agentsCount = '15+';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full overflow-hidden border-b border-border">
        <HeroBackgroundCarousel />

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="min-h-[520px] sm:min-h-[560px] flex items-center py-12 sm:py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-white/15 bg-black/25 backdrop-blur text-sm text-white/85">
                <span className="text-cyan-300">●</span>
                NIIT AI Marketplace
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Build, Deploy &amp; Govern
                <span className="block bg-gradient-to-r from-primary via-cyan-300 to-pink-300 bg-clip-text text-transparent">
                  Enterprise AI
                </span>
              </h1>

              <p className="text-lg text-white/80 max-w-2xl mb-8">
                Discover reusable prompts, production-ready workflows, and specialized agents—designed for teams shipping real automation.
              </p>

              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-4">
                <Link
                  href="/prompts"
                  className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 text-white bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 hover:to-cyan-300 shadow-lg shadow-primary/20"
                >
                  Explore Prompts
                </Link>
                <Link
                  href="/workflows"
                  className="px-8 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-lg font-semibold transition-colors duration-200 backdrop-blur"
                >
                  View Workflows
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-sm text-white/85">
                  <span className="text-cyan-300">✨</span>
                  {promptsCount} prompts
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-sm text-white/85">
                  <span className="text-purple-300">⚙️</span>
                  {workflowsCount} workflows
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-sm text-white/85">
                  <span className="text-pink-300">🤖</span>
                  {agentsCount} agents
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-14 sm:py-16">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="glass p-6 rounded-lg text-center">
            <p className="text-3xl font-bold text-primary">{promptsCount}</p>
            <p className="text-muted-foreground mt-2">Pre-built Prompts</p>
          </div>
          <div className="glass p-6 rounded-lg text-center">
            <p className="text-3xl font-bold text-purple-500">{workflowsCount}</p>
            <p className="text-muted-foreground mt-2">Ready-to-Deploy Workflows</p>
          </div>
          <div className="glass p-6 rounded-lg text-center">
            <p className="text-3xl font-bold text-pink-500">{agentsCount}</p>
            <p className="text-muted-foreground mt-2">Specialized AI Agents</p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <BentoCard
            icon="🏷️"
            title="AI Prompts"
            description="Pre-designed prompts for classification, analysis, and content generation tasks"
            className="lg:col-span-1"
            gradient="from-primary/20 to-cyan-500/20"
          />
          <BentoCard
            icon="⚙️"
            title="Workflows"
            description="End-to-end automation workflows combining multiple agents and services"
            className="lg:col-span-1"
            gradient="from-purple-500/20 to-pink-500/20"
          />
          <BentoCard
            icon="🤖"
            title="AI Agents"
            description="Specialized agents for data processing, routing, and decision-making"
            className="lg:col-span-1"
            gradient="from-green-500/20 to-emerald-500/20"
          />
          <BentoCard
            icon="📊"
            title="Analytics"
            description="Real-time insights into usage patterns, performance metrics, and ROI"
            className="lg:col-span-1"
            gradient="from-orange-500/20 to-red-500/20"
            ctaLabel="Coming soon"
            ctaDisabled
          />
          <BentoCard
            icon="🔗"
            title="Integrations"
            description="Seamless integration with existing enterprise systems and platforms"
            className="lg:col-span-1"
            gradient="from-indigo-500/20 to-primary/20"
            ctaLabel="Coming soon"
            ctaDisabled
          />
          <BentoCard
            icon="🚀"
            title="Quick Deploy"
            description="One-click deployment with automatic scaling and monitoring"
            className="lg:col-span-1"
            gradient="from-rose-500/20 to-pink-500/20"
            ctaLabel="Coming soon"
            ctaDisabled
          />
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-md p-10 sm:p-12 shadow-sm shadow-black/5">
          <div className="pointer-events-none absolute -top-28 -right-28 h-72 w-72 rounded-full bg-purple-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start relative">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl">
                Choose a launch path and ship faster with reusable building blocks. Everything here is designed for teams moving from prototype to production.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/prompts"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors duration-200 shadow-sm shadow-black/10"
                >
                  Explore Solutions
                </Link>
                <Link
                  href="/agents"
                  className="inline-flex items-center justify-center px-6 py-3 bg-background/40 hover:bg-background/70 text-foreground border border-border rounded-lg font-semibold transition-colors duration-200"
                >
                  Browse Agents
                </Link>
              </div>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-background/35 p-4">
                  <p className="text-sm text-muted-foreground">Recommended</p>
                  <p className="mt-1 font-semibold text-foreground">Start with prompts</p>
                  <p className="mt-2 text-sm text-muted-foreground">Copy, tailor, and reuse patterns across teams.</p>
                </div>
                <div className="rounded-xl border border-border bg-background/35 p-4">
                  <p className="text-sm text-muted-foreground">Teams</p>
                  <p className="mt-1 font-semibold text-foreground">Standardize outputs</p>
                  <p className="mt-2 text-sm text-muted-foreground">Consistent structure makes reviews and audits easy.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-background/35 p-6">
                <p className="text-sm text-muted-foreground">Launchpad</p>
                <p className="mt-1 text-lg font-semibold text-foreground">Get value in 3 steps</p>

                <ol className="mt-4 space-y-3">
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                      1
                    </span>
                    <div>
                      <p className="font-medium text-foreground">Pick a prompt</p>
                      <p className="text-sm text-muted-foreground">Find a reusable starting point for your use-case.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex size-7 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-700 text-sm font-semibold">
                      2
                    </span>
                    <div>
                      <p className="font-medium text-foreground">Connect a workflow</p>
                      <p className="text-sm text-muted-foreground">Chain steps, tools, and approvals end-to-end.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex size-7 items-center justify-center rounded-full bg-pink-500/10 text-pink-700 text-sm font-semibold">
                      3
                    </span>
                    <div>
                      <p className="font-medium text-foreground">Deploy an agent</p>
                      <p className="text-sm text-muted-foreground">Ship a specialized assistant for repeatable tasks.</p>
                    </div>
                  </li>
                </ol>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    href="/prompts"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-foreground hover:bg-card transition-colors"
                  >
                    ✨ Prompts
                  </Link>
                  <Link
                    href="/workflows"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-foreground hover:bg-card transition-colors"
                  >
                    ⚙️ Workflows
                  </Link>
                  <Link
                    href="/agents"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-foreground hover:bg-card transition-colors"
                  >
                    🤖 Agents
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-background/35 p-4">
                  <p className="text-sm text-muted-foreground">Deploy faster</p>
                  <p className="mt-1 font-semibold text-foreground">Use ready workflows</p>
                  <p className="mt-2 text-sm text-muted-foreground">Reference architectures to accelerate automation.</p>
                </div>
                <div className="rounded-xl border border-border bg-background/35 p-4">
                  <p className="text-sm text-muted-foreground">Discover</p>
                  <p className="mt-1 font-semibold text-foreground">Explore AI agents</p>
                  <p className="mt-2 text-sm text-muted-foreground">Purpose-built agents with trending and stable tags.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">© 2024 NIIT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
