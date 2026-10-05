# Dandiya Nights Matches 🪔

> **Festive Navratri & Dandiya Partner-Matching Web App**  
> Built with Next.js 14, React 18, Tailwind CSS, and Framer Motion following the **MotionSite AI** design system.

---

## 🎨 Visual Style & MotionSite AI Theme

- **Dark Canvas Backdrop**: Dark Royal Velvet (`#12032B`) with dynamic ambient floating diya embers & particles.
- **Vibrant Accent Palette**:
  - **Deep Neon Magenta** (`#FF007F`): High energy, Dandiya strikes, active accents
  - **Radiant Gold** (`#FFD700`): VIP honors, sync metrics, Aarti glows
  - **Cyber Turquoise** (`#00F5D4`): Live venue radar, verified status badges
- **Glassmorphism**: Backdrop blur (`backdrop-blur-xl`), subtle gradient borders, and soft neon glows.
- **Physics & Motion**:
  - Spring-physics card swipe and 3D tilt tracking (`drag="x"`, rotational torque proportional to drag velocity)
  - Interactive cursor light-track glow on buttons (`GlowButton`)
  - Smooth animated underline tab switching with Framer Motion `layoutId`
  - Festive confetti particle explosions on Dandiya matches (`canvas-confetti`)
  - Ambient Web Audio API Garba Dhol rhythm generator with synchronized equalizer pulses

---

## 📱 Core Layout & Features

1. **Header Navigation**:
   - Glassmorphic top bar with glowing **Dandiya Matches 🪔** logo and pulsing diya flame.
   - Animated tab switcher with live indicator counters:
     - **Discover**: Swipeable partner radar cards
     - **Matches**: Mutual Dandiya strike partner list and venue meet plans
     - **Chat**: Real-time interactive messaging with festive icebreakers
     - **VIP Pass**: 3-tier Garba arena passes with digital hologram ticket generation
     - **Profile**: Customize dance styles (Dodhiya, Tran Taali, Sanedo), energy meter, and signature sticks
   - Ambient Garba Dhol beat toggle with animated audio visualizer bars.
   - User profile avatar with golden VIP aura.

2. **Hero Showcase**:
   - High-impact animated headline with neon gradient text.
   - Live real-time statistics:
     - **24,800+** Live Rhythm Strikes
     - **98.7%** Dodhiya Beat Sync Accuracy
     - **Hot Arenas**: Dome SVP Stadium (Worli), Kora Kendra (Borivali), GMDC (Ahmedabad), United Way (Baroda)
   - Dynamic call-to-action buttons with hover spotlight effects.

3. **Discover Deck**:
   - Tinder/Bumble-style interactive cards with spring drag physics.
   - Dance style pills, compatibility percentage halo, live venue distance, energy stamina meter.
   - Micro-interactions: Skip (❌), Super Aarti Boost (🌟), and Dandiya Strike (🪘) with confetti burst and celebration popup modal.

4. **Matches & Chat**:
   - Mutual match cards with shared ground plan and last messages.
   - Responsive chat drawer with instant simulated partner responses and Navratri quick replies.

5. **VIP Garba Passes**:
   - **Silver Aarti Pass** (₹899): Express gate entry & free wooden dandiya pair.
   - **Gold Raas Royal** (₹1,999): Red carpet entry, orchestra circle, custom LED sticks.
   - **Platinum Monarch** (₹3,999): Stage enclosure, celebrity lounge, 24K gold-leaf sticks.
   - Digital pass modal featuring holographic QR code and pass ID.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Run in Development
```bash
cd C:\Users\pc\.gemini\antigravity\scratch\dandiya-nights-matches
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
dandiya-nights-matches/
├── src/
│   ├── app/
│   │   ├── globals.css         # Glassmorphism, neon shadows, custom scrollbars
│   │   ├── layout.tsx          # Root layout & Navratri SEO metadata
│   │   └── page.tsx            # Central state & tab coordinator
│   ├── components/
│   │   ├── audio/
│   │   │   └── GarbaAudioVisualizer.tsx # Web Audio API Dhol percussion synth
│   │   ├── discover/
│   │   │   └── DiscoverView.tsx # Framer Motion tilt & swipe deck
│   │   ├── effects/
│   │   │   └── FestiveParticles.tsx # 60fps canvas floating diya embers
│   │   ├── hero/
│   │   │   └── HeroSection.tsx  # Dynamic hero banner & live counters
│   │   ├── layout/
│   │   │   └── Navbar.tsx       # Glassmorphic header & animated tabs
│   │   ├── matches/
│   │   │   └── MatchesView.tsx  # Mutual matches grid & sync status
│   │   ├── chat/
│   │   │   └── ChatView.tsx     # Partner messaging with typing simulation
│   │   ├── modals/
│   │   │   └── MatchCelebrationModal.tsx # Intersecting avatar celebration
│   │   ├── profile/
│   │   │   └── ProfileView.tsx  # Garba style selector & energy slider
│   │   ├── ui/
│   │   │   ├── FestiveBadge.tsx # Glowing status pills
│   │   │   └── GlowButton.tsx   # Light-track hover spotlight button
│   │   └── vip/
│   │       └── VipPassView.tsx  # Festive passes & digital hologram ticket
│   ├── data/
│   │   └── mockData.ts          # Authentic Navratri dancer profiles & venues
│   └── types/
│       └── index.ts             # TypeScript definitions
├── tailwind.config.ts           # Theme colors, keyframes, shadows
└── package.json
```
