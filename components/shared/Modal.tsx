import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  DialogProps,
} from "@headlessui/react";
import { ReactNode, useState } from "react";

type TModal = {
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
};

export function Modal({
  className,
  children,
  title,
  description,
  isOpen,
  setIsOpen,
}: TModal) {
  //   let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="max-h-[600px] max-w-lg space-y-4 overflow-y-scroll bg-white p-12">
            {title && <DialogTitle className="font-bold">{title}</DialogTitle>}
            {description && <Description>{description}</Description>}
            {children}
            {/* <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div> */}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
