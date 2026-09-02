/**
 * Right-side product preview for the auth pages.
 * A large light-mode application dashboard floating over a soft textured
 * background — metric card, graph, code editor. Pure markup, no hooks.
 */

export function DashboardPreview() {
  return (
    <div className="relative min-h-[560px] w-full overflow-hidden lg:min-h-screen">
      {/* Textured photographic background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 20% 10%, #FFFFFF 0%, #F0F0EE 42%, #E4E4DF 78%, #DBDBD5 100%)",
        }}
      />
      {/* Grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden>
        <filter id="auth-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
        </filter>
        <rect width="100%" height="100%" filter="url(#auth-grain)" />
      </svg>

      {/* Floating dashboard */}
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
        <div
          className="w-full max-w-2xl overflow-hidden rounded-xl border border-[#E1E1DD] bg-white"
          style={{ boxShadow: "0 24px 60px -24px rgba(17,17,17,0.18), 0 2px 6px rgba(17,17,17,0.05)" }}
        >
          <div className="flex">
            {/* Sidebar */}
            <div className="hidden w-40 shrink-0 border-r border-[#E1E1DD] bg-[#FAFAF8] p-3 sm:block">
              <div className="mb-4 flex items-center gap-2 px-1">
                <span className="h-5 w-5 rounded-md bg-[#111111]" />
                <span className="text-xs font-semibold text-[#111111]">Curricula</span>
              </div>
              {[
                ["Overview", true],
                ["Parcours", false],
                ["Cours", false],
                ["Emploi du temps", false],
                ["Progression", false],
              ].map(([label, active]) => (
                <div
                  key={label as string}
                  className={`mb-1 flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${
                    active
                      ? "bg-[#12B76A]/10 font-medium text-[#111111]"
                      : "text-[#707070]"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${active ? "bg-[#12B76A]" : "bg-[#E1E1DD]"}`}
                  />
                  {label}
                </div>
              ))}
              <div className="mt-6 rounded-md border border-[#E1E1DD] bg-white p-2">
                <p className="font-mono text-[9px] text-[#707070]">SEMAINE 4/10</p>
                <div className="mt-1.5 h-1 rounded-full bg-[#F0F0EE]">
                  <div className="h-1 w-2/5 rounded-full bg-[#12B76A]" />
                </div>
              </div>
            </div>

            {/* Main */}
            <div className="min-w-0 flex-1 p-4 sm:p-5">
              <div className="mb-4 flex items-baseline justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-[#707070]">
                    À faire maintenant
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-[#111111]">
                    CSE 100 — Advanced Data Structures
                  </p>
                </div>
                <span className="rounded-full bg-[#12B76A]/10 px-2 py-0.5 text-[10px] font-medium text-[#12B76A]">
                  semaine 4
                </span>
              </div>

              {/* Metric card */}
              <div className="mb-3 grid grid-cols-3 gap-2">
                {[
                  ["Sessions faites", "17/39", "44%"],
                  ["Skills validés", "8", "+2"],
                  ["Série", "12 j", "+1"],
                ].map(([label, value, delta]) => (
                  <div key={label} className="rounded-lg border border-[#E1E1DD] bg-white p-2.5">
                    <p className="text-[9px] text-[#707070]">{label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-[#111111]">{value}</p>
                    <p className="text-[9px] font-medium text-[#12B76A]">{delta}</p>
                  </div>
                ))}
              </div>

              {/* Graph */}
              <div className="mb-3 rounded-lg border border-[#E1E1DD] bg-white p-3">
                <div className="mb-2 flex items-baseline justify-between">
                  <p className="text-[10px] font-medium text-[#111111]">Maîtrise par semaine</p>
                  <p className="font-mono text-[9px] text-[#707070]">wi24 — sp24</p>
                </div>
                <svg viewBox="0 0 320 70" className="h-16 w-full" aria-hidden>
                  <polyline
                    points="0,58 40,54 80,50 120,44 160,40 200,32 240,26 280,18 320,10"
                    fill="none"
                    stroke="#12B76A"
                    strokeWidth="2"
                  />
                  <polyline
                    points="0,58 40,54 80,50 120,44 160,40 200,32 240,26 280,18 320,10 320,70 0,70"
                    fill="#12B76A"
                    opacity="0.07"
                  />
                  {[40, 80, 120, 160, 200, 240, 280].map((x) => (
                    <line key={x} x1={x} y1="0" x2={x} y2="70" stroke="#F0F0EE" strokeWidth="1" />
                  ))}
                  <circle cx="200" cy="32" r="3" fill="#12B76A" />
                </svg>
              </div>

              {/* Code editor */}
              <div className="overflow-hidden rounded-lg border border-[#E1E1DD] bg-[#FAFAF8]">
                <div className="flex items-center gap-1.5 border-b border-[#E1E1DD] px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#E1E1DD]" />
                  <span className="h-2 w-2 rounded-full bg-[#E1E1DD]" />
                  <span className="ml-1 font-mono text-[9px] text-[#707070]">cse-100.ts</span>
                </div>
                <pre className="overflow-x-auto p-3 font-mono text-[10px] leading-relaxed">
                  <code>
                    <span className="text-[#707070]">{"// semaine 4 — arbres équilibrés"}</span>
                    {"\n"}
                    <span className="text-[#111111]">const</span>{" "}
                    <span className="text-[#111111]">tree</span>{" "}
                    <span className="text-[#707070]">=</span>{" "}
                    <span className="text-[#111111]">new</span>{" "}
                    <span className="text-[#12B76A]">AVLTree</span>
                    <span className="text-[#707070]">{"<number>()"}</span>
                    {"\n"}
                    <span className="text-[#111111]">tree</span>
                    <span className="text-[#707070]">.</span>
                    <span className="text-[#12B76A]">insert</span>
                    <span className="text-[#707070]">(</span>
                    <span className="text-[#12B76A]">42</span>
                    <span className="text-[#707070]">)</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
