import localFont from 'next/font/local'
import { Damion } from "next/font/google";

export const overusedGrotesk = localFont({
    src: [{
        path: '../public/fonts/OverusedGrotesk-VF.woff2',
    }],
    display: 'swap',
    variable: '--font-overused-grotesk',
})


export const damion = Damion({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-damion',
})


export const cotham = localFont({
    src: [
        {
            path: '../public/fonts/CothamSans.otf',
            weight: '400'
        }
    ],
    display: 'swap',
    variable: '--font-cotham'
})