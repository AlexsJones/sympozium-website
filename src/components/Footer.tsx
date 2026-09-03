import ThemeIcon from './ThemeIcon'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <ThemeIcon className="w-9 h-9 rounded-lg object-cover" />
              <span className="text-xl font-bold text-white">
                sympozium<span className="text-kube-blue">.ai</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              The Kubernetes-Native Agentic Control Plane. From the creator of{' '}
              <a href="https://k8sgpt.ai" target="_blank" rel="noopener noreferrer" className="text-kube-blue hover:text-primary-light transition-colors">
                k8sgpt
              </a>.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Project</h4>
            <ul className="space-y-3">
              {[
                { label: 'GitHub', href: 'https://github.com/sympozium-ai/sympozium' },
                { label: 'Releases', href: 'https://github.com/sympozium-ai/sympozium/releases' },
                { label: 'Issues', href: 'https://github.com/sympozium-ai/sympozium/issues' },
                { label: 'License (Apache 2.0)', href: 'https://github.com/sympozium-ai/sympozium/blob/main/LICENSE' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Related</h4>
            <ul className="space-y-3">
              {[
                { label: 'k8sgpt', href: 'https://k8sgpt.ai' },
                { label: 'OpenClaw', href: 'https://openclaw.ai' },
                { label: 'llmfit', href: 'https://github.com/AlexsJones/llmfit' },
                { label: 'Celln', href: 'https://github.com/sympozium-ai/celln' },
                { label: 'Ergoz', href: 'https://github.com/sympozium-ai/ergoz' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              {[
                { label: 'Getting Started', href: 'https://deploy.sympozium.ai/docs/getting-started/' },
                { label: 'Architecture', href: 'https://deploy.sympozium.ai/docs/architecture/' },
                { label: 'Skill Authoring Guide', href: 'https://deploy.sympozium.ai/docs/skills/' },
                { label: 'AgentHarness', href: 'https://deploy.sympozium.ai/docs/guides/agentharness/' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            Apache License 2.0 · Built with Kubernetes primitives
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/sympozium-ai/sympozium"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
