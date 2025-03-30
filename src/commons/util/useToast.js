import React, { useEffect, useRef, useState } from "react";
import T from "prop-types";
import Toast from "commons/components/Toast";
import Flexbox from "commons/components/Flexbox";
import styled from "styled-components/macro";
import { motion, AnimatePresence } from "framer-motion";
import { BREAKPOINTS } from "./breakpoints";

const Ctx = React.createContext();

const ToastContainer = styled(Flexbox)`
  position: fixed;
  bottom: 32px;
  right: 32px;
  left: 32px;
  z-index: var(--z-index-above);

  @media (max-width: ${BREAKPOINTS.small}) {
    bottom: 16px;
    right: 16px;
    left: 16px;
  }
`;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const hideToast = id => {
    setToasts(oldToasts => oldToasts.filter(el => el.id !== id));
  };

  // variant: "success" | "error" | "info"
  const showToast = (label, variant, autoHide = true) => {
    const id = Date.now() + Math.random();
    setToasts(oldToasts => [...oldToasts, { id, variant, label, autoHide }]);

    if (autoHide && variant !== "error") {
      timeoutRef.current = setTimeout(() => {
        hideToast(id);
      }, 5000);
    }
  };

  return (
    <Ctx.Provider value={{ showToast }}>
      {children}
      <ToastContainer flexDirection="column" alignItems="flex-end" gap={8}>
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              layout
              key={toast.id}
              initial={{ opacity: 0, x: 0, y: 80 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20, y: 0 }}
              transition={{
                duration: 0.2,
                layout: {
                  duration: 0.2,
                },
              }}
            >
              <Toast
                key={toast.id}
                id={toast.id}
                variant={toast.variant}
                label={toast.label}
                hideToast={hideToast}
                autoHide={toast.autoHide}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </ToastContainer>
    </Ctx.Provider>
  );
}

ToastProvider.propTypes = {
  children: T.oneOfType([T.object, T.string, T.node]),
};

export const useToast = () => React.useContext(Ctx);
