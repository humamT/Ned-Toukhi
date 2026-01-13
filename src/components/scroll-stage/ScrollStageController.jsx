import { useEffect, useMemo, useRef, useState } from "react";
import "./ScrollStageController.scss";

/**
 * ScrollStageController
 * - Locks native scroll
 * - Uses wheel/touch to move through discrete "stages"
 * - Calls onStageChange(stageIndex) so Home/App can react (header, etc.)
 */
export default function ScrollStageController({
    enabled = true,          // when true, this controller hijacks scroll
    onStageChange,           // callback(stageIndex)
    onDone,                  // callback() when user reaches end and scrolls down again (optional)
}) {
    // Define your staged timeline here (names are just for debugging / readability)
    const stages = useMemo(
        () => [
            "landing",          // 0
            "boutiqueIntro",    // 1
            "galleryIntro",     // 2
            "galleryTab1",      // 3
            "galleryTab2",      // 4
            "galleryTab3",      // 5
            "quotations",       // 6
            "contact",          // 7
            "about",            // 8
            "featuredClients",  // 9
        ],
        []
    );



    const [stageIndex, setStageIndex] = useState(0);

    // Prevent rapid wheel spam from skipping stages
    const lockRef = useRef(false);
    const lockTimeoutRef = useRef(null);

    // Touch support (optional but easy): track touch start Y
    const touchStartYRef = useRef(null);

    // Helper: change stage safely
    const goToStage = (next) => {
        const clamped = Math.max(0, Math.min(stages.length - 1, next));
        setStageIndex(clamped);
    };

    // Tell parent whenever stage changes
    useEffect(() => {
        onStageChange?.(stageIndex, stages[stageIndex]);
        // For you: see it working immediately
        // eslint-disable-next-line no-console
        console.log("Stage:", stageIndex, stages[stageIndex]);
    }, [stageIndex, stages, onStageChange]);

    // Lock native scrolling while controller is enabled
    useEffect(() => {
        if (!enabled) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = prevOverflow || "auto";
        };
    }, [enabled]);

    // Wheel handler (main input for desktop)
    useEffect(() => {
        if (!enabled) return;

        const WHEEL_COOLDOWN_MS = 650; // tweak later to match your fade durations

        const onWheel = (e) => {
            // Stop native scrolling
            e.preventDefault();

            // If we're "cooling down", ignore wheel events
            if (lockRef.current) return;

            const dy = e.deltaY;

            // Ignore tiny trackpad noise
            if (Math.abs(dy) < 12) return;

            // Activate cooldown lock
            lockRef.current = true;
            lockTimeoutRef.current = setTimeout(() => {
                lockRef.current = false;
            }, WHEEL_COOLDOWN_MS);

            // Decide direction
            if (dy > 0) {
                // Scroll DOWN → next stage
                if (stageIndex === stages.length - 1) {
                    // already at last stage, user keeps scrolling down:
                    // this is where we can "release" to normal scrolling later
                    onDone?.();
                    return;
                }
                goToStage(stageIndex + 1);
            } else {
                // Scroll UP → previous stage
                goToStage(stageIndex - 1);
            }
        };

        // IMPORTANT: must be { passive:false } or preventDefault won't work
        window.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", onWheel);
            if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
            lockRef.current = false;
        };
    }, [enabled, stageIndex, stages.length, onDone]);

    // Touch support (mobile)
    useEffect(() => {
        if (!enabled) return;

        const TOUCH_COOLDOWN_MS = 650;

        const onTouchStart = (e) => {
            touchStartYRef.current = e.touches?.[0]?.clientY ?? null;
        };

        const onTouchMove = (e) => {
            // Stop native scrolling
            e.preventDefault();

            if (lockRef.current) return;
            if (touchStartYRef.current == null) return;

            const currentY = e.touches?.[0]?.clientY ?? null;
            if (currentY == null) return;

            const dy = touchStartYRef.current - currentY; // positive = swipe up = scroll down
            if (Math.abs(dy) < 24) return;

            lockRef.current = true;
            lockTimeoutRef.current = setTimeout(() => {
                lockRef.current = false;
            }, TOUCH_COOLDOWN_MS);

            if (dy > 0) {
                if (stageIndex === stages.length - 1) {
                    onDone?.();
                    return;
                }
                goToStage(stageIndex + 1);
            } else {
                goToStage(stageIndex - 1);
            }

            // reset start so one swipe doesn't trigger multiple changes
            touchStartYRef.current = currentY;
        };

        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: false });

        return () => {
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
            lockRef.current = false;
            touchStartYRef.current = null;
        };
    }, [enabled, stageIndex, stages.length, onDone]);

    return (
        <div className="scroll-stage">
            {/* This is just a debug overlay for now */}
            <div className="scroll-stage__debug">
                <div>Stage: {stageIndex}</div>
                <div>{stages[stageIndex]}</div>
                <div className="hint">Scroll to change stages</div>
            </div>

            {/* Later: we will render Orb + stage content here */}
            <div className="scroll-stage__viewport">
                {/* Placeholder */}
            </div>
        </div>
    );
}
