import styled from 'styled-components';

import { margins, colors, fonts } from '../../basics/Styles';

const StyledH1 = styled.h1({
  fontSize: fonts.size.XL,
  fontWeight: fonts.weight.medium,
  color: colors.black,
});

const StyledH3 = styled.h3({
  fontSize: fonts.size.medium,
  fontWeight: fonts.weight.medium,
  color: colors.black,
  marginBottom: fonts.size.small,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

const StyledH4 = styled.h4({
  fontSize: fonts.size.small,
  fontWeight: fonts.weight.medium,
  color: colors.black,
  marginBottom: margins.xxxsmall,
});

export { 
    StyledH1,
    StyledH3, 
    StyledH4 
};