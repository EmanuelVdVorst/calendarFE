import styled from 'styled-components';
import { colors, weekGrid, fonts, margins, borderRadius, transitions, shadows, opacity } from '../basics/Styles';

interface BlockContainerProps {
  $top: number;
  $height: number;
  $column: number;
  $color: string;
  $borderColor: string;
}

export const BlockContainer = styled.div<BlockContainerProps>((props) => ({
  position: 'absolute',
  top: `${props.$top}px`,
  height: `${Math.max(props.$height, parseInt(weekGrid.minEventHeight))}px`,
  left: `calc((100% - ${weekGrid.timeColumnWidth}) / 7 * ${props.$column} + ${weekGrid.timeColumnWidth} + ${weekGrid.eventColumnPadding})`,
  width: `calc((100% - ${weekGrid.timeColumnWidth}) / 7 - ${weekGrid.eventWidthPadding})`,
  backgroundColor: props.$color,
  borderLeft: `${weekGrid.borderLeftWidth} solid ${props.$borderColor}`,
  borderRadius: borderRadius.small,
  padding: `${margins.xxsmall} ${margins.xsmall}`,
  overflow: 'hidden',
  cursor: 'pointer',
  zIndex: 10,
  transition: `transform ${transitions.fast}, box-shadow ${transitions.fast}`,

  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: shadows.medium,
    zIndex: 20,
  },
}));

export const EventTitle = styled.div({
  fontSize: fonts.size.small,
  fontWeight: fonts.weight.semibold,
  color: colors.white,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: margins.xxxsmall,
  textShadow: shadows.light,
});

export const EventTime = styled.div({
  fontSize: fonts.size.xsmall,
  color: `rgba(255, 255, 255, ${opacity.text})`,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textShadow: shadows.light,
});
