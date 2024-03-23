export type TProps = {
  name: string;
} & (
  | {
  size: string | number;
  width?: never;
  height?: never;
}
  | {
  size?: never;
  width: string | number;
  height: string | number;
}
  );

export const defaultProps = {
    size: '16'
}
