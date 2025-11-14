// src/hooks/useActiveSection.js
import { useEffect, useState } from "react";

export default function useActiveSection(sectionIds = [], options = {}) {
    const { offset = 112 } = options; // default offset similar to scroll-mt-28

    const [active, setActive] = useState(sectionIds[0] || "");

    useEffect(() => {
        if (!sectionIds || sectionIds.length === 0) return undefined;

        let ticking = false;

        function updateActive() {
            ticking = false;

            const viewportTop = offset; // area below navbar
            const candidates = [];

            sectionIds.forEach((id) => {
                const el = document.getElementById(id);
                if (!el) return;
                const rect = el.getBoundingClientRect();
                // distance from element top to the viewport top area (offset)
                const distance = Math.abs(rect.top - viewportTop);
                // only consider sections that are somewhat visible (bottom > offset)
                const visible = rect.bottom > offset && rect.top < window.innerHeight;
                candidates.push({ id, distance, visible, top: rect.top });
            });

            if (candidates.length === 0) return;

            // Prefer visible sections; among visible choose the one with smallest positive top distance
            const visibleCandidates = candidates.filter((c) => c.visible);
            if (visibleCandidates.length > 0) {
                // choose the one with top closest to offset (smallest abs(top - offset))
                visibleCandidates.sort((a, b) => a.distance - b.distance);
                setActive((prev) => (prev === visibleCandidates[0].id ? prev : visibleCandidates[0].id));
                return;
            }

            // If none visible (e.g., scrolled past bottom), fallback to the section with smallest distance
            candidates.sort((a, b) => a.distance - b.distance);
            setActive((prev) => (prev === candidates[0].id ? prev : candidates[0].id));
        }

        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateActive();
                });
                ticking = true;
            }
        }

        // initial run
        updateActive();

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [sectionIds.join("|"), offset]); // re-run if sectionIds or offset change

    return active;
}
