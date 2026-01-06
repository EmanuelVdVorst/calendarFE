import styled from 'styled-components';
import { colors, weekGrid, fonts, margins } from '../basics/Styles';

export const GridWrapper = styled.div({
  position: 'relative',
});

export const GridContainer = styled.div({
  display: 'grid',
  gridTemplateColumns: `${weekGrid.timeColumnWidth} repeat(7, 1fr)`,
  position: 'relative',
  backgroundColor: colors.white,
});

export const TimeLabel = styled.div({
  height: weekGrid.slotHeight,
  padding: margins.xsmall,
  fontSize: fonts.size.small,
  color: colors.gray,
  borderRight: `1px solid ${colors.border}`,
  borderBottom: `1px solid ${colors.borderLight}`,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
  backgroundColor: colors.backgroundLight,
});

export const HourRow = styled.div({
  display: 'contents',
});
