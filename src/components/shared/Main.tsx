import { styled } from '@rtcapp/webrtc-ui/build/styles';

export const Main = styled('main')(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.paper,
  borderStyle: 'solid',
  borderColor: theme.palette.background.default,
  borderWidth: `5px`,
  borderRadius: '2rem',
  '&:before': {
    position: 'absolute',
    content: '""',
    top: '0px',
    right: '0px',
    left: '0px',
    bottom: '0px',
    backgroundColor: theme.palette.background.default,
    zIndex: '-1'
  },
  [theme.breakpoints.up('sm')]: {
    borderWidth: '10px'
  }
}));
