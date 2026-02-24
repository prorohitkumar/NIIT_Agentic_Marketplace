import { Navbar } from '@/components/navbar';

export default function SimulationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Simulations</h1>
        <p className="text-muted-foreground">Test and simulate workflows before deployment</p>
      </section>

      {/* Content */}
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pb-20">
        <div className="glass p-12 rounded-lg text-center">
          <div className="mb-6">
            <span className="text-6xl">🧪</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Workflow Simulations</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Coming soon: Test your workflows with simulated data, validate configurations, and preview results before deploying to production.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass p-6 rounded-lg">
              <span className="text-3xl mb-2 block">📊</span>
              <h3 className="text-foreground font-semibold mb-2">Data Simulation</h3>
              <p className="text-muted-foreground text-sm">Test with realistic sample data</p>
            </div>
            <div className="glass p-6 rounded-lg">
              <span className="text-3xl mb-2 block">⚡</span>
              <h3 className="text-foreground font-semibold mb-2">Performance Testing</h3>
              <p className="text-muted-foreground text-sm">Monitor latency and throughput</p>
            </div>
            <div className="glass p-6 rounded-lg">
              <span className="text-3xl mb-2 block">🔍</span>
              <h3 className="text-foreground font-semibold mb-2">Error Handling</h3>
              <p className="text-muted-foreground text-sm">Test failure scenarios and recovery</p>
            </div>
          </div>

          <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors duration-200">
            Notify Me When Ready
          </button>
        </div>
      </section>
    </div>
  );
}
