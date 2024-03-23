import { MaskaDetail, MaskTokens, MaskType } from 'maska'


export type TInputmode = 'numeric' | 'email' | 'search' | 'tel' | 'text' | 'url' | 'decimal';
export type TType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
export type TColor = 'main' | 'default';
export type TModifiersValues = 'masked' | 'unmasked';
export type TModifiers = Record<TModifiersValues, boolean>;

// https://beholdr.github.io/maska/
export interface IMask {
  mask: MaskType;
  tokens?: MaskTokens;
  // if custom tokens should replace default tokens (if not set, they will merge)
  tokensReplace?: boolean;
  // eager mode will show static characters before you type them, e.g. when you type 1, eager mask #-# will show 1- and non-eager will show 1
  eager?: boolean;
  // in reversed mode mask will grow backwards, e.g. for numbers
  reversed?: boolean;
  preProcess?: (value: string) => string;
  postProcess?: (value: string) => string;
  onMaska?: (event: MaskaDetail) => string;
}

export const isIMask = (v: string | undefined | object | IMask): v is IMask =>
    v !== undefined && typeof v !== 'string'

