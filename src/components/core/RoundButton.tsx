import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { type ReactNode, useState, type DOMAttributes } from 'react';
import { styled } from '@mui/material/styles';

const iconContainerClass = 'icon-container';

const LabelContainer = styled('div')<{ open: boolean }>(({ theme, ...props }) => ({
  width: props.open ? 'auto' : '0px',
  height: '4rem',
  paddingLeft: props.open ? '2.5rem' : '0px',
  flexWrap: 'nowrap',
  position: 'relative',
  borderRadius: '0 4rem 4rem 0',
  left: '-2rem',
  display: 'inline-flex',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  transition: theme.transitions.create(['all'], {
    duration: theme.transitions.duration.standard
  }),
  [theme.breakpoints.up('sm')]: {
    height: '5rem',
    paddingLeft: props.open ? '3rem' : '0px',
    borderRadius: '0 5rem 5rem 0',
    left: '-2.5rem'
  }
}));

const IconContainer = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  height: '4rem',
  width: '4rem',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  zIndex: 1,
  [theme.breakpoints.up('sm')]: {
    height: '5rem',
    width: '5rem'
  }
}));

const CustomButton = styled('button')(({ theme }) => ({
  display: 'inline-flex',
  position: 'relative',
  borderRadius: '4rem',
  border: `2px solid ${theme.palette.text.primary}`,
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    [`& .${iconContainerClass}`]: {
      backgroundColor: theme.palette.primary.light
    }
  }
}));

type RoundButtonProps = {
  children: ReactNode;
  label: string;
  onClick: DOMAttributes<HTMLButtonElement>['onClick'];
};

export const RoundButton = ({ children, label, onClick }: RoundButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleBtnExtend = () => setOpen(true);
  const handleBtnCollapse = () => setOpen(false);

  return (
    <CustomButton
      onClick={onClick}
      onMouseEnter={handleBtnExtend}
      onMouseLeave={handleBtnCollapse}
      aria-label={label}>
      <IconContainer className={iconContainerClass}>{children}</IconContainer>
      <LabelContainer open={open}>
        <Collapse in={open} orientation="horizontal">
          <Typography color="text.primary" noWrap>
            {label}
          </Typography>
        </Collapse>
      </LabelContainer>
    </CustomButton>
  );
};
