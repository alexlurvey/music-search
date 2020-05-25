import { useMemo, useEffect, useState } from 'react';

export type IUseClientWidth = [ number, { isExtraSmall: boolean, isPhone: boolean, isTablet: boolean } ]

export const useClientWidth = (): IUseClientWidth => {
    const [ width, setWidth ] = useState<number>(() => {
        return document.body.clientWidth;
    })

    const isExtraSmall = useMemo(() => width < 360, [width])
    const isPhone = useMemo(() => width < 769, [width])
    const isTablet = useMemo(() => width < 1024, [width])

    useEffect(() => {
        const listener = () => {
            setWidth(document.body.clientWidth);
        }
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [setWidth])

    return [ width, { isExtraSmall, isPhone, isTablet }];
}