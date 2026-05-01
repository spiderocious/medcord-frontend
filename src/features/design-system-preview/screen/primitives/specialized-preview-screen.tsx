import { useState } from 'react';

import { BodyDiagram, type BodyDiagramPin } from '@ui/body-diagram';
import { DicomThumb } from '@ui/dicom-thumb';
import { DropZone } from '@ui/drop-zone';
import { FilesList } from '@ui/files-list';
import { Page } from '@ui/page';
import { PinInput } from '@ui/pin-input';
import { SectionBreak } from '@ui/section-break';
import { Signature } from '@ui/signature';
import { Stamp } from '@ui/stamp';

/**
 * Primitives · Specialized inputs
 * Reference: 14-specialized.html.
 */
export function SpecializedPreviewScreen() {
  return (
    <Page>
      <Stamp number="II · 05" title="Specialized inputs" meta="drop · sign · diagram · PIN · DICOM" />

      <SectionBreak label="Drop zone & files" />
      <DropZoneDemo />

      <SectionBreak label="Signature" />
      <Signature />

      <SectionBreak label="Body diagram — annotation pins" />
      <BodyDiagramDemo />

      <SectionBreak label="DICOM — imaging tile" />
      <DicomRow />

      <SectionBreak label="PIN — override entry" />
      <PinDemo />
    </Page>
  );
}

function DropZoneDemo() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <DropZone title="Drop ID and insurance card" meta="JPG, PNG, PDF · max 8 MB" />
      <div>
        <FilesList
          files={[
            { id: '1', name: 'IL-DL-front.jpg', meta: '124 KB', state: 'ok', progress: 100 },
            { id: '2', name: 'BCBS-card.pdf', meta: '218 KB', state: 'uploading', progress: 64 },
          ]}
        />
      </div>
    </div>
  );
}

function BodyDiagramDemo() {
  const [pins, setPins] = useState<BodyDiagramPin[]>([
    { id: 'a', x: 0.5, y: 0.32, label: 'cp', tone: 'crit' },
    { id: 'b', x: 0.36, y: 0.55, label: 'br', tone: 'warn' },
  ]);
  return (
    <BodyDiagram
      pins={pins}
      onPinAdd={(pin) =>
        setPins((prev) => [
          ...prev,
          { id: String(Date.now()), x: pin.x, y: pin.y, tone: 'ink', label: '' },
        ])
      }
    />
  );
}

function DicomRow() {
  return (
    <div className="grid grid-cols-4 gap-3">
      <DicomThumb modality="CT" series="1/24" acquired="04/29 14:02" ww="W400 L40" />
      <DicomThumb modality="MR" series="3/56" acquired="04/29 16:11" ww="W1500 L600" />
      <DicomThumb modality="XR" series="1/2" acquired="04/30 08:30" ww="W2000 L100" />
      <DicomThumb modality="US" series="1/12" acquired="05/01 09:14" />
    </div>
  );
}

function PinDemo() {
  const [pin, setPin] = useState('');
  return (
    <div className="flex flex-col gap-3">
      <PinInput length={4} value={pin} onChange={setPin} ariaLabel="Override PIN" />
      <p className="m-0 font-mono text-[11px] tracking-mono text-ink-3">
        Override actions are logged to the audit record with name, time, and workstation.
      </p>
    </div>
  );
}
