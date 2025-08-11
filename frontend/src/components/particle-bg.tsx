// Particle background for landing page
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import config from "../../particlesjs-config.json";

export default function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <div className="absolute inset-0 -z-10">
      <Particles id="tsparticles" options={config as ISourceOptions} />
      <div className="absolute top-12 left-0 w-20 bg-[#000022] text-[#13E8E9] text-xs font-bold text-left px-1 rounded-b-md select-none">
      </div>
    </div>
  );
}
