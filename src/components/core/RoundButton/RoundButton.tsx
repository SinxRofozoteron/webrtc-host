import { type ReactNode, useState, type DOMAttributes, type ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

import { ICON_CONTAINER_CLASS } from './constants';
import { ButtonInside } from './ButtonInside';

const CustomButton = styled('button')(({ theme }) => ({
  display: 'inline-flex',
  position: 'relative',
  borderRadius: '4rem',
  border: `2px solid ${theme.palette.text.primary}`,
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.main,
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

  const { label } = props;

  const commonProps = {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    'aria-label': label
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
