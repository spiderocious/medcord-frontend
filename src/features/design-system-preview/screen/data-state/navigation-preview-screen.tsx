import { useState } from 'react';

import { AppShell } from '@ui/app-shell';
import { Breadcrumbs } from '@ui/breadcrumbs';
import { Button } from '@ui/button';
import { CommandPalette, type CommandPaletteItem } from '@ui/command-palette';
import { Page } from '@ui/page';
import { SavedViewTabs } from '@ui/saved-view-tabs';
import { SectionBreak } from '@ui/section-break';
import { SideNav } from '@ui/side-nav';
import { Stamp } from '@ui/stamp';
import { Tabs } from '@ui/tabs';
import { TopBar } from '@ui/top-bar';

const PALETTE_ITEMS: CommandPaletteItem[] = [
  { id: '1', group: 'Patient', label: 'Adebayo, Olumide · MRN 10458291', shortcut: '↵' },
  { id: '2', group: 'Patient', label: 'Chen, Wei-Lin · MRN 10293874', shortcut: '↵' },
  { id: '3', group: 'Order', label: 'New medication order', shortcut: '⌘O' },
  { id: '4', group: 'Order', label: 'New lab order', shortcut: '⌘L' },
  { id: '5', group: 'Note', label: 'Open new progress note', shortcut: '⌘N' },
  { id: '6', group: 'Action', label: 'Sign current note', shortcut: '⌘↵' },
];

export function NavigationPreviewScreen() {
  const [tab, setTab] = useState('chart');
  const [view, setView] = useState('mine');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('patients');

  return (
    <Page>
      <Stamp number="III · 10" title="Navigation · shell · ⌘K" meta="an envelope and a binder" />

      <SectionBreak label="App shell — top bar + side rail" />
      <div className="overflow-hidden rounded-card border border-hair">
        <AppShell
          topBar={
            <TopBar
              hospital="St. Catherine's General"
              subtitle="Multi-tenant · v 0.2"
              actions={
                <div className="flex items-center gap-2">
                  <Button variant="quiet" size="sm" onClick={() => setPaletteOpen(true)}>
                    ⌘K · Search
                  </Button>
                  <Button variant="secondary" size="sm">
                    Profile
                  </Button>
                </div>
              }
            />
          }
          sideNav={
            <SideNav
              activeId={activeNav}
              groups={[
                {
                  id: 'clinical',
                  title: 'Clinical',
                  items: [
                    {
                      id: 'patients',
                      number: '01',
                      label: 'Patients',
                      meta: '128',
                      onClick: () => setActiveNav('patients'),
                    },
                    {
                      id: 'orders',
                      number: '02',
                      label: 'Orders',
                      onClick: () => setActiveNav('orders'),
                    },
                    {
                      id: 'labs',
                      number: '03',
                      label: 'Labs',
                      meta: '6 new',
                      onClick: () => setActiveNav('labs'),
                    },
                    {
                      id: 'imaging',
                      number: '04',
                      label: 'Imaging',
                      onClick: () => setActiveNav('imaging'),
                    },
                  ],
                },
                {
                  id: 'ops',
                  title: 'Operations',
                  items: [
                    {
                      id: 'staff',
                      number: '05',
                      label: 'Staff',
                      onClick: () => setActiveNav('staff'),
                    },
                    {
                      id: 'equipment',
                      number: '06',
                      label: 'Equipment',
                      onClick: () => setActiveNav('equipment'),
                    },
                    {
                      id: 'beds',
                      number: '07',
                      label: 'Bed board',
                      onClick: () => setActiveNav('beds'),
                    },
                  ],
                },
              ]}
            />
          }
        >
          <div className="flex h-full flex-col gap-5 p-6">
            <Breadcrumbs
              items={[{ label: 'Patients' }, { label: '3-N' }, { label: 'Adebayo, Olumide' }]}
            />
            <Tabs
              activeId={tab}
              onChange={setTab}
              items={[
                { id: 'chart', label: 'Chart' },
                { id: 'orders', label: 'Orders', meta: '4' },
                { id: 'notes', label: 'Notes' },
                { id: 'labs', label: 'Labs', meta: '!' },
                { id: 'imaging', label: 'Imaging' },
              ]}
            />
            <SavedViewTabs
              activeId={view}
              onChange={setView}
              views={[
                { id: 'mine', label: 'My patients', count: 14 },
                { id: 'awaiting', label: 'Awaiting labs', count: 6 },
                { id: 'discharging', label: 'Discharging today', count: 3 },
                { id: 'admit', label: 'Admit queue', count: 2 },
              ]}
              trailing={
                <Button variant="quiet" size="sm">
                  + New view
                </Button>
              }
            />
            <div className="rounded-card border border-hair-soft bg-sheet p-6 font-serif italic text-ink-3">
              The active surface — patient chart, order entry, etc. — renders here.
            </div>
          </div>
        </AppShell>
      </div>

      <SectionBreak label="Command palette — ⌘K" />
      <Button onClick={() => setPaletteOpen(true)}>Open command palette</Button>
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        items={PALETTE_ITEMS}
      />
    </Page>
  );
}
