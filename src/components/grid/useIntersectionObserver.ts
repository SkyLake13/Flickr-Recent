import { useState, useRef, useEffect, MutableRefObject } from "react";

export function useIntersectionObserver(bottomRef: MutableRefObject<Element | null>,
                                        intersectionOptions: { root?: any, rootMargin?: string, threshold?: number } = {}) {

    const [intersectingElement, setIntersectingElement] = useState<Element | null>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useRef<IntersectionObserver>(
        new IntersectionObserver((entries) => {
            const firstEntry = entries[0]; // we have only one intersection element therefore only one entry
            const isIntersecting = firstEntry.isIntersecting;
            setIsIntersecting(isIntersecting);
        },
        { ...intersectionOptions })
    );

    // set intersecting element on ref change
    useEffect(() => {
        setIntersectingElement(bottomRef.current);
    }, [bottomRef]);

    useEffect(() => {
        if (intersectingElement) {
            const currentObserver = observer.current;

            // observe intersecting element
            currentObserver.observe(intersectingElement);

            return () => currentObserver.disconnect();
        }
    }, [intersectingElement]);

    return isIntersecting;
}
