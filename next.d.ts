// next.d.ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare module 'next/image' {
    import { ImageProps } from 'next/dist/shared/lib/image-external';
    export default function Image(props: ImageProps): JSX.Element;
}
