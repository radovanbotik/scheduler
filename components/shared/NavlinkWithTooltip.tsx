"use client";
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { Navlink, TNavlink } from "./Navlink";
import { AnimatePresence, motion } from "framer-motion";

type TNavlinkWithTooltip = TNavlink & {
  tooltip: string;
};

export function NavlinkWithTooltip({
  href,
  className,
  icon,
  tooltip,
}: TNavlinkWithTooltip) {
  const [isHovered, setIsHovered] = useState(true);

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Popover>
        <PopoverButton
          as={Navlink}
          href={href}
          className={className}
          icon={icon}
        >
          <Link href="#">content</Link>
        </PopoverButton>
        <AnimatePresence>
          {isHovered && (
            <>
              <PopoverPanel
                anchor={{ to: "right", gap: "16px", offset: "0px" }}
                className="z-50 bg-vodafone-900 p-3 text-sm/6 font-semibold text-white"
                static
                as={motion.div}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                {tooltip}
              </PopoverPanel>
            </>
          )}
        </AnimatePresence>
      </Popover>
    </div>
  );
}
