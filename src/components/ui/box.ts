import { createBox, BoxProps as SpBoxProps } from '@shopify/restyle';
import { Theme } from '../../theme';

export type BoxProps = SpBoxProps<Theme>;
export const Box = createBox<Theme>();
