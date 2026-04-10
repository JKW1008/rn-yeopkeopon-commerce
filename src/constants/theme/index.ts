import { scale, vs } from "../../utils/responsive";
import { Colors } from './colors';
import { Typography } from './typography';

export const Theme = {
  colors: Colors,
  typography: Typography,

  spacing: {
    xs:     scale(4),
    sm:     scale(8),
    md:     scale(16),
    lg:     scale(24),
    xl:     scale(32),
    gutter: scale(20),
  },

  borderRadius: {
    none: 0,
    sm:   scale(4),
    md:   scale(8),
    lg:   scale(16),
  },
};

export { scale, vs };
export default Theme;
