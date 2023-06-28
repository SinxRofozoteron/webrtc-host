import { memo as memoRaw } from 'react';

export const memo: <C>(c: C) => C = memoRaw;
