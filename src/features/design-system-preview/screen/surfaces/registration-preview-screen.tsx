import { Button } from '@ui/button';
import { Page } from '@ui/page';
import { ProgressStepper } from '@ui/progress';
import { Radio } from '@ui/radio';
import { Sheet } from '@ui/sheet';
import { Select } from '@ui/select';
import { Stamp } from '@ui/stamp';
import { TextField } from '@ui/text-field';
import { Mark, Overline } from '@ui/typography';

export function RegistrationPreviewScreen() {
  return (
    <Page>
      <Stamp number="IV · 07" title="Patient registration" meta="a clipboard with carbon copies" />
      <ProgressStepper
        steps={['Identity', 'Demographics', 'Insurance', 'Consent', 'Done']}
        current={1}
      />

      <Sheet padding="lg" className="mt-6 max-w-[820px]">
        <div className="mb-5 flex items-baseline justify-between">
          <Overline>Step 02 · Demographics</Overline>
          <Mark>2 / 5</Mark>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <TextField label="Family name" defaultValue="Adebayo" />
          <TextField label="Given name" defaultValue="Olumide" />
          <TextField label="Preferred name" placeholder="optional" />
          <TextField label="Date of birth" mono defaultValue="1962-03-14" help="= 64 years" />
          <Select label="Sex assigned at birth" defaultValue="Male">
            <option>Male</option>
            <option>Female</option>
            <option>Intersex</option>
            <option>Prefer not to say</option>
          </Select>
          <Select label="Gender identity" defaultValue="Man">
            <option>Man</option>
            <option>Woman</option>
            <option>Non-binary</option>
            <option>Self-describe</option>
            <option>Prefer not to say</option>
          </Select>
          <TextField label="Mobile" mono defaultValue="+1 (312) 555-0148" />
          <TextField label="Email" defaultValue="m.adebayo@example.com" />
          <div className="col-span-2">
            <TextField label="Address" defaultValue="142 W Lakeside Dr · Chicago, IL 60615" />
          </div>
          <div className="col-span-2 grid grid-cols-3 gap-6">
            <Radio name="lang" value="en" checked>
              English
            </Radio>
            <Radio name="lang" value="es">
              Spanish
            </Radio>
            <Radio name="lang" value="other">
              Other / interpreter
            </Radio>
          </div>
          <div className="col-span-2">
            <TextField
              label="Emergency contact"
              defaultValue="Funmi Adebayo · spouse · +1 (312) 555-0193"
            />
          </div>
        </div>
        <div className="mt-7 flex items-center gap-2 border-t border-hair pt-4">
          <Button variant="quiet">Back</Button>
          <span className="flex-1" />
          <Button variant="secondary">Save draft</Button>
          <Button variant="primary">Continue</Button>
        </div>
      </Sheet>
    </Page>
  );
}
