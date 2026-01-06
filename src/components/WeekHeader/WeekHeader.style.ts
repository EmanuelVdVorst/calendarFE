import styled from 'styled-components';
import { colors, weekGrid, fonts, margins } from '../basics/Styles';

export const HeaderContainer = styled.div({
  display: 'grid',
  gridTemplateColumns: `${weekGrid.timeColumnWidth} repeat(7, 1fr)`,
  borderBottom: `1px solid ${colors.border}`,
  backgroundColor: colors.backgroundLight,
});

export const TimeColumn = styled.div({
  padding: `${margins.medium} ${margins.xsmall}`,
  fontSize: fonts.size.small,
  color: colors.gray,
  borderRight: `1px solid ${colors.border}`,
});
