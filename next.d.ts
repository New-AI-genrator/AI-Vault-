// next.d.ts
declare module 'next/image' {
    import { ImageProps } from 'next/dist/shared/lib/image-external';
    export default function Image(props: ImageProps): JSX.Element;
}
