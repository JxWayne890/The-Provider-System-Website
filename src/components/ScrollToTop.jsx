import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Disable smooth scrolling to avoid jumping animations when changing routes
        document.documentElement.style.scrollBehavior = 'auto';

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto'
        });

        // Restore smooth scroll for anchor links
        setTimeout(() => {
            document.documentElement.style.scrollBehavior = 'smooth';
        }, 0);
    }, [pathname]);

    return null;
}
