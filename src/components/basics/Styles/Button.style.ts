import styled from 'styled-components';

import { paddings, borderRadius, colors, fonts, margins } from '../../basics/Styles';

const Button = styled.button({
  padding: `${paddings.medium} ${paddings.small}`,
  fontSize: fonts.size.medium,
  fontWeight: fonts.weight.small,
  borderRadius: borderRadius.medium,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  border: 'none',
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

const StyledPrimairyButton = styled(Button)({
  backgroundColor: colors.primairy,
  color: colors.white,

  '&:hover': {
    backgroundColor: colors.primairyHover,
  },
  '&:active': {
    backgroundColor: colors.primairyActive,
  },
});

const StyledSecondaryButton = styled(Button)({
  backgroundColor: colors.secondary,
  color: colors.black,

  '&:hover': {
    backgroundColor: colors.secondaryHover,
  },

  '&:active': {
    backgroundColor: colors.secondaryActive,
  },
});


const StyledDeletionButton = styled(Button)({
  backgroundColor: colors.deltion,
  color: colors.white,

  '&:hover': {
    backgroundColor: colors.deletionHover,
  },
});

const HorizontalButtonGroup = styled.div({
  display: 'flex',
  gap: '12px',
  justifyContent: 'flex-end',
  marginTop: margins.xsmall
});

export {
    StyledSecondaryButton,
    StyledPrimairyButton,
    StyledDeletionButton,
    HorizontalButtonGroup
}