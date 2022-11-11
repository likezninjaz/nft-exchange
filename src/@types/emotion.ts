import { CSSObject, Theme, css } from '@emotion/react';

type TCssProps = CSSObject | ReturnType<typeof css>;

type TCssPropsFn = ({ theme }: { theme: Theme }) => TCssProps;

export type TEmotionProps = TCssPropsFn | TCssProps;
