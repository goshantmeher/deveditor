export interface CssPreset {
   id: string;
   name: string;
   icon: string;
   description: string;
   html: string;
   css: string;
}

export const VIEWPORT_SIZES = {
   desktop: { label: 'Desktop', width: '100%', icon: '🖥️' },
   tablet: { label: 'Tablet', width: '768px', icon: '📱' },
   mobile: { label: 'Mobile', width: '375px', icon: '📲' },
} as const;

export type ViewportSize = keyof typeof VIEWPORT_SIZES;

export const PREVIEW_BACKGROUNDS = {
   light: { label: 'Light', value: '#ffffff' },
   dark: { label: 'Dark', value: '#1a1a2e' },
   checkered: { label: 'Checkered', value: 'checkered' },
} as const;

export type PreviewBackground = keyof typeof PREVIEW_BACKGROUNDS;

export const DEFAULT_HTML = `<div class="container">
  <div class="card">
    <div class="card-header">
      <div class="icon">✨</div>
      <h1>CSS Playground</h1>
    </div>
    <p>Start editing the HTML and CSS to see live changes. Try one of the preset templates above!</p>
    <div class="features">
      <div class="feature">
        <span class="badge">Live</span>
        Real-time preview
      </div>
      <div class="feature">
        <span class="badge">Fast</span>
        Instant updates
      </div>
      <div class="feature">
        <span class="badge">Free</span>
        No sign-up needed
      </div>
    </div>
    <button class="btn">Get Started</button>
  </div>
</div>`;

export const DEFAULT_CSS = `/* Welcome to CSS Playground! */
/* Edit this CSS and see live changes */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #e0e0e0;
}

.container {
  padding: 2rem;
  width: 100%;
  max-width: 480px;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
}

.card-header {
  margin-bottom: 1.5rem;
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

h1 {
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, #a78bfa, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

p {
  color: #a0a0b8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.features {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #b0b0c8;
}

.badge {
  background: rgba(167, 139, 250, 0.2);
  color: #a78bfa;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.btn {
  background: linear-gradient(135deg, #7c3aed, #3b82f6);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
}

.btn:active {
  transform: translateY(0);
}`;

export const CSS_PRESETS: CssPreset[] = [
   {
      id: 'button-styles',
      name: 'Button Styles',
      icon: '🔘',
      description: 'Gradient buttons with hover and active states',
      html: `<div class="button-showcase">
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-secondary">Secondary</button>
  <button class="btn btn-outline">Outline</button>
  <button class="btn btn-ghost">Ghost</button>
  <button class="btn btn-glow">Glow Effect</button>
</div>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  font-family: system-ui, sans-serif;
}

.button-showcase {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  min-width: 200px;
}

.btn-primary {
  background: linear-gradient(135deg, #7c3aed, #3b82f6);
  color: white;
  border: none;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
}
.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.5);
}

.btn-secondary {
  background: linear-gradient(135deg, #ec4899, #f97316);
  color: white;
  border: none;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
}
.btn-secondary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.5);
}

.btn-outline {
  background: transparent;
  color: #a78bfa;
  border: 2px solid #a78bfa;
}
.btn-outline:hover {
  background: rgba(167, 139, 250, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(167, 139, 250, 0.2);
}

.btn-ghost {
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.btn-glow {
  background: #10b981;
  color: white;
  border: none;
  animation: glow 2s ease-in-out infinite alternate;
}
.btn-glow:hover { transform: scale(1.05); }

@keyframes glow {
  from { box-shadow: 0 0 10px #10b981, 0 0 20px rgba(16, 185, 129, 0.3); }
  to { box-shadow: 0 0 20px #10b981, 0 0 40px rgba(16, 185, 129, 0.5); }
}`,
   },
   {
      id: 'card-component',
      name: 'Card Component',
      icon: '🃏',
      description: 'Modern card with glassmorphism and hover effects',
      html: `<div class="cards-grid">
  <div class="card">
    <div class="card-icon">🚀</div>
    <h3>Performance</h3>
    <p>Lightning-fast rendering with optimized algorithms and lazy loading.</p>
    <a href="#" class="card-link">Learn more →</a>
  </div>
  <div class="card">
    <div class="card-icon">🎨</div>
    <h3>Design System</h3>
    <p>Beautiful, consistent UI components built with modern CSS.</p>
    <a href="#" class="card-link">Learn more →</a>
  </div>
  <div class="card">
    <div class="card-icon">🔒</div>
    <h3>Security</h3>
    <p>Enterprise-grade security with end-to-end encryption.</p>
    <a href="#" class="card-link">Learn more →</a>
  </div>
</div>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  font-family: system-ui, sans-serif;
  padding: 2rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  width: 100%;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #7c3aed, #3b82f6, #06b6d4);
  opacity: 0;
  transition: opacity 0.3s;
}

.card:hover {
  transform: translateY(-8px);
  border-color: rgba(124, 58, 237, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card:hover::before { opacity: 1; }

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

h3 {
  color: #f1f5f9;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

p {
  color: #94a3b8;
  line-height: 1.6;
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
}

.card-link {
  color: #a78bfa;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.2s;
}
.card-link:hover { color: #c4b5fd; }`,
   },
   {
      id: 'flexbox-layout',
      name: 'Flexbox Layout',
      icon: '📐',
      description: 'Holy grail layout using Flexbox',
      html: `<div class="layout">
  <header class="header">
    <div class="logo">⚡ FlexApp</div>
    <nav>
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </nav>
  </header>
  <div class="content">
    <aside class="sidebar">
      <div class="nav-item active">Dashboard</div>
      <div class="nav-item">Analytics</div>
      <div class="nav-item">Settings</div>
      <div class="nav-item">Profile</div>
    </aside>
    <main class="main">
      <h1>Dashboard</h1>
      <div class="stats">
        <div class="stat-card">
          <span class="stat-value">2,847</span>
          <span class="stat-label">Users</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">$12.4k</span>
          <span class="stat-label">Revenue</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">94%</span>
          <span class="stat-label">Uptime</span>
        </div>
      </div>
    </main>
  </div>
  <footer class="footer">Built with Flexbox · CSS Playground</footer>
</div>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: system-ui, sans-serif;
  background: #0f172a;
  color: #e2e8f0;
  min-height: 100vh;
}

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, #a78bfa, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

nav { display: flex; gap: 1.5rem; }
nav a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}
nav a:hover { color: #e2e8f0; }

.content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 220px;
  padding: 1.5rem 1rem;
  background: rgba(30, 41, 59, 0.5);
  border-right: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-item {
  padding: 0.65rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s;
}
.nav-item:hover { background: rgba(255,255,255,0.05); color: #e2e8f0; }
.nav-item.active {
  background: rgba(124, 58, 237, 0.15);
  color: #a78bfa;
  font-weight: 600;
}

.main {
  flex: 1;
  padding: 2rem;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.stats {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.stat-card {
  flex: 1;
  min-width: 140px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, #7c3aed, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.stat-label { font-size: 0.85rem; color: #64748b; }

.footer {
  padding: 1rem 2rem;
  text-align: center;
  font-size: 0.8rem;
  color: #475569;
  border-top: 1px solid rgba(255,255,255,0.06);
}`,
   },
   {
      id: 'grid-layout',
      name: 'Grid Layout',
      icon: '🔲',
      description: 'Responsive CSS Grid with spanning',
      html: `<div class="grid-container">
  <div class="grid-item span-2 featured">
    <div class="item-icon">🌟</div>
    <h3>Featured Project</h3>
    <p>A beautiful project showcase spanning two columns.</p>
  </div>
  <div class="grid-item">
    <div class="item-icon">📊</div>
    <h3>Analytics</h3>
    <p>Track performance metrics.</p>
  </div>
  <div class="grid-item">
    <div class="item-icon">⚙️</div>
    <h3>Settings</h3>
    <p>Configure your workspace.</p>
  </div>
  <div class="grid-item">
    <div class="item-icon">🎯</div>
    <h3>Goals</h3>
    <p>Set and track your goals.</p>
  </div>
  <div class="grid-item span-2">
    <div class="item-icon">📈</div>
    <h3>Growth Metrics</h3>
    <p>Monitor your growth across all channels with detailed analytics.</p>
  </div>
</div>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  font-family: system-ui, sans-serif;
  padding: 2rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 800px;
  width: 100%;
}

.grid-item {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}
.grid-item:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(124, 58, 237, 0.3);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.span-2 { grid-column: span 2; }

.featured {
  background: linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.1));
  border-color: rgba(124, 58, 237, 0.2);
}

.item-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

h3 {
  color: #f1f5f9;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

p {
  color: #94a3b8;
  font-size: 0.85rem;
  line-height: 1.5;
}`,
   },
   {
      id: 'css-animations',
      name: 'CSS Animations',
      icon: '🎬',
      description: 'Keyframe animations with transforms',
      html: `<div class="animation-showcase">
  <div class="orbit-container">
    <div class="center-sphere"></div>
    <div class="orbit orbit-1">
      <div class="planet planet-1"></div>
    </div>
    <div class="orbit orbit-2">
      <div class="planet planet-2"></div>
    </div>
    <div class="orbit orbit-3">
      <div class="planet planet-3"></div>
    </div>
  </div>
  <h2>CSS Animations</h2>
  <p>Pure CSS orbital animation</p>
  <div class="loading-bar">
    <div class="loading-progress"></div>
  </div>
</div>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a1a;
  font-family: system-ui, sans-serif;
  color: #e2e8f0;
}

.animation-showcase {
  text-align: center;
}

.orbit-container {
  position: relative;
  width: 250px;
  height: 250px;
  margin: 0 auto 2rem;
}

.center-sphere {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 30px; height: 30px;
  background: radial-gradient(circle, #a78bfa, #7c3aed);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(167, 139, 250, 0.5);
}

.orbit {
  position: absolute;
  top: 50%; left: 50%;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 50%;
}

.orbit-1 {
  width: 100px; height: 100px;
  margin: -50px 0 0 -50px;
  animation: spin 3s linear infinite;
}
.orbit-2 {
  width: 160px; height: 160px;
  margin: -80px 0 0 -80px;
  animation: spin 5s linear infinite reverse;
}
.orbit-3 {
  width: 220px; height: 220px;
  margin: -110px 0 0 -110px;
  animation: spin 8s linear infinite;
}

.planet {
  position: absolute;
  top: -5px; left: 50%;
  transform: translateX(-50%);
  width: 10px; height: 10px;
  border-radius: 50%;
}

.planet-1 {
  background: #60a5fa;
  box-shadow: 0 0 10px rgba(96, 165, 250, 0.6);
}
.planet-2 {
  background: #f472b6;
  box-shadow: 0 0 10px rgba(244, 114, 182, 0.6);
}
.planet-3 {
  background: #34d399;
  box-shadow: 0 0 10px rgba(52, 211, 153, 0.6);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

h2 {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #a78bfa, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

p { color: #64748b; margin-bottom: 1.5rem; font-size: 0.9rem; }

.loading-bar {
  width: 200px;
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
  overflow: hidden;
  margin: 0 auto;
}

.loading-progress {
  width: 40%;
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #3b82f6);
  border-radius: 4px;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}`,
   },
   {
      id: 'typography',
      name: 'Typography',
      icon: '🔤',
      description: 'Font pairing, scale, and text styling',
      html: `<div class="type-showcase">
  <div class="type-hero">
    <span class="overline">Typography System</span>
    <h1>Beautiful Type</h1>
    <p class="lead">A well-crafted typographic scale brings harmony and readability to any interface.</p>
  </div>
  <div class="type-scale">
    <div class="type-row">
      <span class="type-label">Display</span>
      <span class="type-display">Aa</span>
    </div>
    <div class="type-row">
      <span class="type-label">Heading</span>
      <span class="type-heading">Aa Bb Cc</span>
    </div>
    <div class="type-row">
      <span class="type-label">Body</span>
      <span class="type-body">The quick brown fox jumps over the lazy dog.</span>
    </div>
    <div class="type-row">
      <span class="type-label">Caption</span>
      <span class="type-caption">SMALL CAPS · CAPTION · HELPER TEXT</span>
    </div>
  </div>
</div>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  font-family: system-ui, sans-serif;
  padding: 2rem;
}

.type-showcase {
  max-width: 600px;
  width: 100%;
}

.type-hero {
  text-align: center;
  margin-bottom: 3rem;
}

.overline {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  color: #7c3aed;
  font-weight: 600;
}

h1 {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #f1f5f9, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  margin: 0.5rem 0 1rem;
  letter-spacing: -0.02em;
}

.lead {
  color: #64748b;
  font-size: 1.1rem;
  line-height: 1.7;
  max-width: 450px;
  margin: 0 auto;
}

.type-scale {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 2rem;
}

.type-row {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}

.type-label {
  width: 80px;
  flex-shrink: 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #475569;
}

.type-display {
  font-size: 3rem;
  font-weight: 800;
  color: #f1f5f9;
  letter-spacing: -0.03em;
}

.type-heading {
  font-size: 1.5rem;
  font-weight: 600;
  color: #cbd5e1;
}

.type-body {
  font-size: 1rem;
  color: #94a3b8;
  line-height: 1.6;
}

.type-caption {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #64748b;
}`,
   },
   {
      id: 'glassmorphism',
      name: 'Glassmorphism',
      icon: '🪟',
      description: 'Frosted glass effect with backdrop-filter',
      html: `<div class="glass-scene">
  <div class="bg-shapes">
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
  </div>
  <div class="glass-card">
    <div class="glass-header">
      <div class="avatar">G</div>
      <div>
        <h3>Glass UI</h3>
        <span class="subtitle">Frosted Glass Effect</span>
      </div>
    </div>
    <p>This card uses backdrop-filter to create a beautiful frosted glass effect over the background shapes.</p>
    <div class="glass-stats">
      <div class="glass-stat">
        <span class="stat-num">12k</span>
        <span class="stat-txt">Views</span>
      </div>
      <div class="glass-stat">
        <span class="stat-num">847</span>
        <span class="stat-txt">Likes</span>
      </div>
      <div class="glass-stat">
        <span class="stat-num">32</span>
        <span class="stat-txt">Shares</span>
      </div>
    </div>
  </div>
</div>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0c29;
  font-family: system-ui, sans-serif;
  overflow: hidden;
}

.glass-scene {
  position: relative;
  width: 380px;
}

.bg-shapes {
  position: absolute;
  inset: -50px;
  z-index: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
}

.shape-1 {
  width: 200px; height: 200px;
  background: #7c3aed;
  top: -30px; left: -30px;
  animation: float 6s ease-in-out infinite;
}

.shape-2 {
  width: 150px; height: 150px;
  background: #ec4899;
  bottom: -20px; right: -20px;
  animation: float 8s ease-in-out infinite reverse;
}

.shape-3 {
  width: 100px; height: 100px;
  background: #06b6d4;
  top: 50%; left: 60%;
  animation: float 5s ease-in-out infinite 1s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
}

.glass-card {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  padding: 2rem;
}

.glass-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.avatar {
  width: 48px; height: 48px;
  background: linear-gradient(135deg, #7c3aed, #3b82f6);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  color: white;
}

h3 {
  color: #f1f5f9;
  font-size: 1.1rem;
}

.subtitle {
  color: #64748b;
  font-size: 0.8rem;
}

p {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.glass-stats {
  display: flex;
  gap: 1rem;
}

.glass-stat {
  flex: 1;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 0.75rem;
  text-align: center;
}

.stat-num {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: #e2e8f0;
}

.stat-txt {
  font-size: 0.7rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}`,
   },
   {
      id: 'gradients',
      name: 'Gradients',
      icon: '🌈',
      description: 'Linear, radial, and conic gradients',
      html: `<div class="gradient-gallery">
  <h2>CSS Gradients</h2>
  <div class="gradient-grid">
    <div class="gradient-card">
      <div class="gradient-preview linear-1"></div>
      <span>Linear Gradient</span>
    </div>
    <div class="gradient-card">
      <div class="gradient-preview linear-2"></div>
      <span>Multi-stop</span>
    </div>
    <div class="gradient-card">
      <div class="gradient-preview radial-1"></div>
      <span>Radial Gradient</span>
    </div>
    <div class="gradient-card">
      <div class="gradient-preview conic-1"></div>
      <span>Conic Gradient</span>
    </div>
    <div class="gradient-card">
      <div class="gradient-preview mesh"></div>
      <span>Mesh Gradient</span>
    </div>
    <div class="gradient-card">
      <div class="gradient-preview animated"></div>
      <span>Animated</span>
    </div>
  </div>
</div>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  font-family: system-ui, sans-serif;
  padding: 2rem;
}

.gradient-gallery {
  max-width: 500px;
  width: 100%;
}

h2 {
  text-align: center;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #a78bfa, #f472b6, #fb923c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
}

.gradient-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.gradient-card {
  text-align: center;
}

.gradient-preview {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 16px;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(255,255,255,0.06);
}

span {
  color: #64748b;
  font-size: 0.8rem;
}

.linear-1 {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.linear-2 {
  background: linear-gradient(135deg, #f093fb, #f5576c, #ffc371);
}

.radial-1 {
  background: radial-gradient(circle at 30% 30%, #7c3aed, #1e1b4b);
}

.conic-1 {
  background: conic-gradient(from 0deg, #7c3aed, #3b82f6, #06b6d4, #10b981, #f59e0b, #ef4444, #7c3aed);
}

.mesh {
  background:
    radial-gradient(at 40% 20%, #7c3aed 0px, transparent 50%),
    radial-gradient(at 80% 0%, #1e40af 0px, transparent 50%),
    radial-gradient(at 0% 50%, #ec4899 0px, transparent 50%),
    radial-gradient(at 80% 80%, #06b6d4 0px, transparent 50%),
    radial-gradient(at 0% 100%, #7c3aed 0px, transparent 50%);
  background-color: #0f172a;
}

.animated {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient-shift 4s ease infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
   },
];
