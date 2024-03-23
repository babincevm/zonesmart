import { CSSProperties } from 'vue'

export interface IProps {
  is?: keyof HTMLElementTagNameMap | string;
  column?: boolean;
  row?: boolean;
  gap?: CSSProperties['gap'] | string | number;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  width?: CSSProperties['width'] | string | number;
  height?: CSSProperties['height'] | string | number;
  wrap?: boolean;
  inline?: boolean;
  shrink?: CSSProperties['flexShrink'];
  grow?: CSSProperties['flexGrow'];
}

export const defaultProps = {
    is: 'div' as keyof HTMLElementTagNameMap
}
