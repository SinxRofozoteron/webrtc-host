import Box, { type BoxProps } from '@rtcapp/webrtc-ui/build/Box';
import { styled } from '@mui/material/styles';
import get from 'lodash/get';

type PageContainerProps = BoxProps & {
  bgColor?: string;
};

export const PageContainer = styled(Box, {
  shouldForwardProp: prop => prop !== 'bgColor'
})<PageContainerProps>(({ theme, ...props }) => ({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: props.bgColor
    ? get(theme.palette, props.bgColor)
    : theme.palette.background.default
}));
