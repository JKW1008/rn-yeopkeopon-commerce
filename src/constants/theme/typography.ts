import { ms, vs } from "../../utils/responsive";

export const Typography = {
  fontFamily: {
    main: "TenorSans-Regular",
    hero: "BodoniModa-Italic",
    subHero: "BodoniModa-Regular",
    boldHero: "BodoniModa-Bold",
  },
  fontSize: {
    display: ms(40),
    h1:      ms(32),
    h2:      ms(24),
    h2_md:   ms(28),
    h3:      ms(20),
    h4:      ms(18),

    lg:      ms(16),
    md:      ms(15),
    base:    ms(14),
    sm:      ms(13),

    xs:      ms(12),
    tiny:    ms(11),
    pixel:   ms(10),
    nano:    ms(9),
  },

  letterSpacing: {
    tighter: -0.8,
    tight:   -0.5,
    normal:  0,
    fine:    0.5,
    wide:    1,
    wider:   2,
    semiWide: 3,
    extraWide: 4,
    luxury:  6,
    display: 8,
  },

  lineHeight: {
    none:    1,
    tight:   1.25,
    snug:    1.4,
    normal:  1.5,
    relaxed: 1.75,
    loose:   2,
    luxury:  2.2,
    // 절대값 — 수직 스케일 적용
    h1:      vs(38),
    h2_md:   vs(34),
    h2:      vs(30),
    h3:      vs(26),
    h4:      vs(22),
    base:    vs(20),
    tight18: vs(18),
    fixed28: vs(28),
    fixed26: vs(26),
    fixed24: vs(24),
  },
};
