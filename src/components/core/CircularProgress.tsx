import CircularProgressMui, {
  type CircularProgressProps as CircularProgressPropsMui
} from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import get from 'lodash/get';
import { type ReactElement } from 'react';

import { type Modify } from '../../types';

type CircularProgressExtraProps = { color?: string };

type CircularProgressPropsMuiModified = Exclude<
  keyof CircularProgressPropsMui,
  'color'
>;

type CircularProgressProps = Modify<
  CircularProgressPropsMui,
  CircularProgressExtraProps
>;

export const CircularProgress = styled(CircularProgressMui, {
  shouldForwardProp: (prop): prop is CircularProgressPropsMuiModified =>
    prop !== 'color'
})<CircularProgressExtraProps>(({ theme, ...props }) => ({
  color: get(theme.palette, props.color || 'primary.main')
})) as (props: CircularProgressProps) => ReactElement;
