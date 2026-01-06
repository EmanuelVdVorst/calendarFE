import styled from 'styled-components';
import { colors, fonts, margins } from '../../Styles';

export const StyledDayHeader = styled.div<{ $isToday: boolean }>((props) => ({
  padding: margins.medium,
  textAlign: 'center',
  borderRight: `1px solid ${colors.border}`,
  backgroundColor: props.$isToday ? colors.backgroundAccent : 'transparent',

  '&:last-child': {
    borderRight: 'none',
  },
}));

export const StyledDayName = styled.div<{ $isToday: boolean }>((props) => ({
  fontSize: fonts.size.xxsmall,
  fontWeight: fonts.weight.semibold,
  color: props.$isToday ? colors.primairy : colors.gray,
  marginBottom: margins.xxsmall,
  textTransform: 'uppercase',
  letterSpacing: fonts.spacing.medium,
}));

export const StyledDayNumber = styled.div<{ $isToday: boolean }>((props) => ({
  fontSize: fonts.size.XL,
  fontWeight: fonts.weight.semibold,
  color: props.$isToday ? colors.primairy : colors.black,
}));
