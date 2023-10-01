import {
  Pressable as NativePressable,
  PressableProps as NativePressableProps,
} from 'react-native';
import { createBox } from '@shopify/restyle';
import { type Theme } from '../../theme';

const Pressable = createBox<Theme, NativePressableProps>(NativePressable);
export type PressableProps = React.ComponentProps<typeof Pressable>;

export { Pressable };
