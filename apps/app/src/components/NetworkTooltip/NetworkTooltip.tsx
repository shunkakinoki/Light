import clsx from "clsx";
import { motion } from "framer-motion";
import type { FC, ReactNode } from "react";
import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";

import { usePositioner } from "@lightdotso/app/hooks/usePositioner";

const EASING = [0.4, 0, 0, 1];
const DEFAULT_POSITIONS = { popper: null };

export type NetworkToolTipComponentProps = {
  id?: string;
  target: any;
  activeId: any;
  children: ReactNode;
};

const NetworkTooltipComponent: FC<NetworkToolTipComponentProps> = ({
  id = 0,
  target,
  activeId,
  children,
}) => {
  const { popperJSRef, positionPopover, updateTarget } = usePositioner();
  const [{ popper }, setStyles] = useState(DEFAULT_POSITIONS);
  const popoverRef = useRef();
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!target) {
      return;
    }

    if (popperJSRef.current) {
      updateTarget(target);
      return;
    }

    positionPopover({
      popoverRef,
      targetEl: target,
      offset: [0, 8],
      gpuAcceleration: false,
      applyStyles: state => {
        setStyles({
          popper: state.styles.popper,
        });
      },
    });
  }, [target, popperJSRef, updateTarget, positionPopover]);

  const onAnimationComplete = useCallback(() => {
    isMountedRef.current = !!activeId;
  }, [activeId]);

  const isShowing = activeId && popper;

  return useMemo(() => {
    const isMounted = isMountedRef.current;

    return (
      <motion.div
        className={clsx(
          "absolute z-10 shadow-md",
          isShowing ? "pointer-events-auto" : "pointer-events-none",
        )}
        transition={{ duration: 0.3, ease: EASING }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isShowing ? 1 : 0 }}
        onAnimationComplete={onAnimationComplete}
      >
        <motion.div
          ref={popoverRef}
          className="inline-block absolute py-1 px-3 text-sm font-semibold text-left text-contrast-lower bg-contrast-higher rounded-md shadow-md"
          layoutId={`NetworkTooltip-${id}`}
          transition={!isMounted ? { duration: 0 } : { duration: 0.3 }}
          style={{
            ...popper,
          }}
        >
          <motion.div>{children}</motion.div>
        </motion.div>
      </motion.div>
    );
  }, [isShowing, onAnimationComplete, popper, children, id]);
};

export const NetworkTooltip = memo(NetworkTooltipComponent);
