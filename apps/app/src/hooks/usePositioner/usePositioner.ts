import { createPopper } from "@popperjs/core";
import { useRef, useEffect, useCallback, useState } from "react";

export const usePositioner = () => {
  const popperJSRef = useRef(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (popperJSRef.current) {
      popperJSRef.current.destroy();
      popperJSRef.current = null;
    }
  }, []);

  const updateTarget = useCallback(targetEl => {
    if (popperJSRef.current) {
      popperJSRef.current.state.elements.reference = targetEl;
      popperJSRef.current.update();
    }
  }, []);

  const positionPopover = useCallback(
    ({
      popoverRef,
      targetEl,
      placement = "bottom",
      offset,
      applyStyles,
      gpuAcceleration = true,
    }) => {
      if (popperJSRef.current) {
        popperJSRef.current.destroy();
        popperJSRef.current = null;
      }

      const modifiers = [
        {
          name: "offset",
          options: { offset },
        },
        {
          name: "eventListeners",
          options: {
            resize: true,
            scroll: false,
          },
        },
        {
          name: "computeStyles",
          options: {
            gpuAcceleration,
          },
        },
        {
          name: "preventOverflow",
          options: {
            padding: 8,
          },
        },
        {
          name: "arrow",
        },
        {
          name: "updateState",
          enabled: true,
          phase: "write",
          fn: ({ state }) => {
            setPosition(state.placement);
          },
          requires: ["computeStyles"],
        },
      ];

      if (applyStyles) {
        modifiers.push({
          name: "applyStyles",
          enabled: true,
          requires: [],
          phase: "write",
          fn: ({ state }) => {
            applyStyles({ ...state });
          },
        });
      }

      popperJSRef.current = createPopper(targetEl, popoverRef.current, {
        placement,
        //@ts-ignore
        modifiers,
      });
    },
    [],
  );

  return {
    popperJSRef,
    positionPopover,
    placement: position,
    updateTarget,
  };
};
