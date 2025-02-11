"use client";

import { Callout, Theme } from "@radix-ui/themes";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type OpenToastParams = {
  message: string;
  duration?: number;
  type?: "success" | "error";
};

const ToastContext = React.createContext<{
  openToast: ({ message, type, duration }: OpenToastParams) => void;
}>({
  openToast: () => {},
});

const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastDuration, setToastDuration] = useState(0);
  const [color, setColor] = useState<"green" | "red">("green");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const defaultDuration = 5000;

  const openToast = useCallback(
    ({ message, duration, type }: OpenToastParams) => {
      if (!message) {
        return;
      }
      setToastMessage(message);
      if (type === "success") {
        setColor("green");
      } else if (type === "error") {
        setColor("red");
      }
      setToastDuration(duration || defaultDuration);
      setShowToast(true);
    },
    [],
  );

  const closeToastAndResetValues = useCallback(() => {
    setShowToast(false);
    setToastMessage("");
    setToastDuration(0);
    setColor("green");
    clearTimeout(timeoutId as NodeJS.Timeout);
    setTimeoutId(null);
  }, []);

  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => {
        closeToastAndResetValues();
      }, toastDuration);
      setTimeoutId(timeout);
    }
  }, [toastDuration]);

  const Toast = (props: React.ComponentProps<typeof Callout.Root>) => {
    return (
      <>
        {showToast
          ? createPortal(
              <Theme accentColor="purple" grayColor="gray">
                <div className="fixed bottom-8 w-full flex justify-center pointer-events-none">
                  <Callout.Root
                    color={color}
                    {...props}
                    size="1"
                    variant="surface"
                    className="w-fit m-auto z-10 pointer-events-auto"
                  >
                    <Callout.Text>{toastMessage}</Callout.Text>
                  </Callout.Root>
                </div>
              </Theme>,
              document.getElementById("rootElement") as Element,
            )
          : null}
      </>
    );
  };

  return (
    <ToastContext.Provider value={{ openToast }}>
      <Toast />
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContextProvider, ToastContext };
