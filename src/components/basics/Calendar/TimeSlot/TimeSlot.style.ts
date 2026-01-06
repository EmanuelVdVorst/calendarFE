import styled from 'styled-components';
import { colors, weekGrid, transitions } from '../../Styles';

export const StyledTimeSlot = styled.div({
  height: weekGrid.slotHeight,
  borderRight: `1px solid ${colors.border}`,
  borderBottom: `1px solid ${colors.borderLight}`,
  cursor: 'pointer',
  transition: `background-color ${transitions.medium}`,

  '&:hover': {
    backgroundColor: colors.backgroundHover,
  },

  '&:last-child': {
    borderRight: 'none',
  },
});
