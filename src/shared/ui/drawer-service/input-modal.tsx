import { useState } from 'react';

import { MedcordIcon, X } from '@icons';

import { Button } from '../button';
import { Hair } from '../hair';
import { TextField } from '../text-field';
import { Textarea } from '../textarea';
import { Mark } from '../typography';

import type { InputModalOptions } from './types';

interface InputModalProps {
  title: string;
  message: string;
  options: InputModalOptions;
  onDismiss: () => void;
  isFullscreen: boolean;
}

export function InputModal({ title, message, options, onDismiss, isFullscreen }: InputModalProps) {
  const [value, setValue] = useState(options.defaultValue ?? '');
  const [error, setError] = useState<string | undefined>(undefined);

  const showClose = options.showCloseButton ?? true;
  const showCancel = options.showCancelButton ?? true;
  const confirmText = options.confirmButtonText ?? 'Save and proceed';
  const cancelText = options.cancelButtonText ?? 'Cancel';
  const stepLabel = options.stepLabel;
  const obscure = options.inputType === 'password';

  function handleConfirm() {
    if (options.pattern && !options.pattern.test(value)) {
      setError(options.errorMessage ?? 'Invalid input. Please try again.');
      return;
    }
    options.onConfirm?.(value);
    onDismiss();
  }

  function handleCancel() {
    options.onCancel?.();
    onDismiss();
  }

  const inputType =
    options.inputType === 'number'
      ? 'number'
      : options.inputType === 'email'
        ? 'email'
        : options.inputType === 'password'
          ? 'password'
          : 'text';

  const inputField = options.multiline ? (
    <Textarea
      value={value}
      placeholder={options.placeholder ?? ''}
      maxLength={options.maxLength}
      help={error}
      onChange={(event) => {
        setValue(event.target.value);
        setError(undefined);
      }}
    />
  ) : (
    <TextField
      autoFocus
      value={value}
      placeholder={options.placeholder ?? ''}
      maxLength={options.maxLength}
      type={obscure ? 'password' : inputType}
      mono={inputType === 'number'}
      status={error ? 'error' : 'default'}
      help={error}
      onChange={(event) => {
        setValue(event.target.value);
        setError(undefined);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') handleConfirm();
      }}
    />
  );

  if (isFullscreen) {
    return (
      <div className="relative flex h-full w-full flex-col bg-paper">
        {showClose ? <CloseCorner onClick={handleCancel} /> : null}
        <div className="flex flex-1 flex-col items-center justify-center px-8">
          <div className="w-full max-w-[480px] text-center">
            {stepLabel ? <Mark className="mb-3">{stepLabel}</Mark> : null}
            <h2 className="font-serif text-[28px] font-medium tracking-display text-ink">
              {title}
            </h2>
            <p className="mt-3 text-[14px] leading-[1.6] text-ink-2">{message}</p>
            <div className="mt-7 text-left">{inputField}</div>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 px-8 pb-8">
          <Button
            variant="primary"
            size="lg"
            disabled={value.length === 0}
            onClick={handleConfirm}
            className="w-full justify-center"
          >
            {confirmText}
          </Button>
          {showCancel ? (
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCancel}
              className="w-full justify-center"
            >
              {cancelText}
            </Button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-card border border-ink bg-sheet">
      <div className="flex items-baseline gap-3 px-5 pt-5">
        {stepLabel ? <Mark>{stepLabel}</Mark> : <span />}
        <span className="flex-1" />
        {showClose ? <CloseCorner onClick={handleCancel} inline /> : null}
      </div>
      <div className="px-5 pt-3">
        <h2 className="font-serif text-[20px] font-medium tracking-h text-ink">{title}</h2>
        <p className="mt-1.5 text-[13px] leading-[1.55] text-ink-2">{message}</p>
        <div className="mt-5">{inputField}</div>
      </div>
      <Hair className="mt-6" />
      <div className="flex flex-col gap-2 px-5 py-4">
        <Button
          variant="primary"
          disabled={value.length === 0}
          onClick={handleConfirm}
          className="w-full justify-center"
        >
          {confirmText}
        </Button>
        {showCancel ? (
          <Button variant="secondary" onClick={handleCancel} className="w-full justify-center">
            {cancelText}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function CloseCorner({ onClick, inline = false }: { onClick: () => void; inline?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className={
        inline
          ? 'inline-flex h-8 w-8 items-center justify-center rounded-paper text-ink-3 transition-colors hover:bg-paper-deep hover:text-ink'
          : 'absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-paper text-ink-3 transition-colors hover:bg-paper-deep hover:text-ink'
      }
    >
      <MedcordIcon as={X} size="md" />
    </button>
  );
}
