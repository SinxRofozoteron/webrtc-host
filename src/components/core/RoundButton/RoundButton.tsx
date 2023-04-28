import { type ReactNode, useState, type DOMAttributes, type ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

import { ICON_CONTAINER_CLASS } from './constants';
import { ButtonInside } from './ButtonInside';

const CustomButton = styled('button')(({ theme }) => ({
  display: 'inline-flex',
  position: 'relative',
  borderRadius: '4rem',
  cursor: 'pointer',
  zIndex: '2',
  border: 'none',
  backgroundColor: theme.palette.primary.main,
  boxShadow:
    '0px 3px 5px -1px rgba(0,0,0,0.2),\
    0px 6px 10px 0px rgba(0,0,0,0.14),\
    0px 1px 18px 0px rgba(0,0,0,0.12)',
  '&:hover': {
    [`& .${ICON_CONTAINER_CLASS}`]: {
      backgroundColor: theme.palette.primary.light
    }
  },
  '&:disabled': {
    [`& .${ICON_CONTAINER_CLASS}`]: {
      backgroundColor: theme.palette.primary.dark
    }
  }
}));

const CustomLink = CustomButton.withComponent(Link);

type BaseProps = {
  children: ReactNode;
  label: string;
  id?: string;
};

type RoundButtonProps = {
  onClick: DOMAttributes<HTMLButtonElement>['onClick'];
  disabled?: boolean;
} & BaseProps;

type RoundLinkProps = {
  route: string;
} & BaseProps;

type RoundButtonComponent = {
  (props: RoundButtonProps): ReactElement;
  (props: RoundLinkProps): ReactElement;
};

export const RoundButton: RoundButtonComponent = props => {
  const [open, setOpen] = useState<boolean>(false);

  const { label, id } = props;

  const commonProps = {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    'aria-label': label,
    id
  };

  if ((props as RoundButtonProps).onClick) {
    const { disabled, onClick, children } = props as RoundButtonProps;
    return (
      <CustomButton disabled={disabled} onClick={onClick} {...commonProps}>
        <ButtonInside open={open} label={label}>
          {children}
        </ButtonInside>
      </CustomButton>
    );
  } else {
    const { route, children } = props as RoundLinkProps;
    return (
      <CustomLink href={route} {...commonProps}>
        <ButtonInside open={open} label={label}>
          {children}
        </ButtonInside>
      </CustomLink>
    );
  }
};
