import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Lyon Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"JetBrains Sans Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Paper & ink
        paper: 'var(--paper)',
        'paper-deep': 'var(--paper-deep)',
        sheet: 'var(--sheet)',
        'sheet-edge': 'var(--sheet-edge)',
        ink: {
          DEFAULT: 'var(--ink)',
          2: 'var(--ink-2)',
          3: 'var(--ink-3)',
          4: 'var(--ink-4)',
        },
        hair: {
          DEFAULT: 'var(--hair)',
          soft: 'var(--hair-soft)',
        },
        rule: 'var(--rule)',

        // Apothecary green
        green: {
          50: 'var(--green-50)',
          100: 'var(--green-100)',
          200: 'var(--green-200)',
          300: 'var(--green-300)',
          400: 'var(--green-400)',
          500: 'var(--green-500)',
          600: 'var(--green-600)',
          700: 'var(--green-700)',
          800: 'var(--green-800)',
          900: 'var(--green-900)',
        },

        // Clinical state (each tone is a triplet)
        crit: {
          DEFAULT: 'var(--crit)',
          bg: 'var(--crit-bg)',
          edge: 'var(--crit-edge)',
        },
        warn: {
          DEFAULT: 'var(--warn)',
          bg: 'var(--warn-bg)',
          edge: 'var(--warn-edge)',
        },
        low: {
          DEFAULT: 'var(--low)',
          bg: 'var(--low-bg)',
          edge: 'var(--low-edge)',
        },

        // Ribbons
        'ribbon-allergy': 'var(--ribbon-allergy)',
        'ribbon-warn': 'var(--ribbon-warn)',
        'ribbon-watch': 'var(--ribbon-watch)',
      },
      borderRadius: {
        sharp: 'var(--r-sharp)',
        paper: 'var(--r-paper)',
        card: 'var(--r-card)',
        control: 'var(--r-control)',
        soft: 'var(--r-soft)',
        modal: 'var(--r-modal)',
        pill: 'var(--r-pill)',
      },
      letterSpacing: {
        display: 'var(--track-display)',
        h: 'var(--track-h)',
        body: 'var(--track-body)',
        label: 'var(--track-label)',
        overline: 'var(--track-overline)',
        mono: 'var(--track-mono)',
      },
      spacing: {
        gutter: 'var(--gutter)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        'paper-out': 'var(--ease-paper-out)',
        'paper-in': 'var(--ease-paper-in)',
        'paper-turn': 'var(--ease-paper-turn)',
      },
      fontFeatureSettings: {
        tabular: '"tnum" 1, "lnum" 1',
      },
    },
  },
  plugins: [],
};

export default config;
