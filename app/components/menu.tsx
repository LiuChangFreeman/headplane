import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { ComponentProps, JSX, ReactNode } from "react";
import { useEffect, useState } from "react";

import cn from "~/utils/cn";

const SIDE_OFFSET = 8;

function getViewportBoundary(): ComponentProps<typeof BaseMenu.Positioner>["collisionBoundary"] {
  if (typeof window === "undefined") return undefined;
  const viewport = window.visualViewport;
  return {
    x: viewport?.offsetLeft ?? 0,
    y: viewport?.offsetTop ?? 0,
    width: viewport?.width ?? document.documentElement.clientWidth,
    height: viewport?.height ?? document.documentElement.clientHeight,
  };
}

function useViewportBoundary() {
  const [boundary, setBoundary] =
    useState<ComponentProps<typeof BaseMenu.Positioner>["collisionBoundary"]>();

  useEffect(() => {
    const update = () => setBoundary(getViewportBoundary());
    update();

    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
    };
  }, []);

  return boundary;
}

export const Menu = ({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled?: boolean;
}): JSX.Element => <BaseMenu.Root disabled={disabled}>{children}</BaseMenu.Root>;

export const MenuTrigger = ({
  className,
  children,
  disabled,
  onClick,
}: Pick<
  ComponentProps<typeof BaseMenu.Trigger>,
  "className" | "children" | "disabled" | "onClick"
>): JSX.Element => (
  <BaseMenu.Trigger
    className={cn(
      "inline-flex items-center justify-center",
      "focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-1",
      "dark:focus:ring-indigo-400/40 dark:focus:ring-offset-mist-900",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      className,
    )}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </BaseMenu.Trigger>
);

export const MenuContent = ({
  children,
  className,
  side = "bottom",
  sideOffset = SIDE_OFFSET,
  align = "start",
  collisionPadding = 12,
  collisionAvoidance,
  collisionBoundary,
  positionMethod = "fixed",
}: {
  children: ReactNode;
  className?: string;
  side?: ComponentProps<typeof BaseMenu.Positioner>["side"];
  sideOffset?: ComponentProps<typeof BaseMenu.Positioner>["sideOffset"];
  align?: ComponentProps<typeof BaseMenu.Positioner>["align"];
  collisionAvoidance?: ComponentProps<typeof BaseMenu.Positioner>["collisionAvoidance"];
  collisionBoundary?: ComponentProps<typeof BaseMenu.Positioner>["collisionBoundary"];
  collisionPadding?: ComponentProps<typeof BaseMenu.Positioner>["collisionPadding"];
  positionMethod?: ComponentProps<typeof BaseMenu.Positioner>["positionMethod"];
}): JSX.Element => {
  const viewportBoundary = useViewportBoundary();

  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        align={align}
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary ?? viewportBoundary}
        collisionPadding={collisionPadding}
        positionMethod={positionMethod}
        side={side}
        sideOffset={sideOffset}
      >
        <BaseMenu.Popup
          className={cn(
            "z-50 min-w-50 max-h-[var(--available-height)] overflow-y-auto rounded-lg py-1",
            "bg-white dark:bg-mist-900",
            "shadow-lg dark:shadow-none",
            "border border-mist-200 dark:border-mist-700",
            "focus:outline-hidden",
            className,
          )}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
};

export const MenuItem = ({
  className,
  variant,
  children,
  disabled,
  onClick,
}: Pick<ComponentProps<typeof BaseMenu.Item>, "className" | "children" | "disabled" | "onClick"> & {
  variant?: "danger";
}): JSX.Element => (
  <BaseMenu.Item
    className={cn(
      "py-2 px-3 mx-1 rounded-md",
      "select-none cursor-pointer",
      "focus:outline-hidden",
      "text-mist-700 dark:text-mist-300",
      "data-highlighted:bg-mist-100/50 dark:data-highlighted:bg-mist-800",
      "data-disabled:text-mist-400 dark:data-disabled:text-mist-600 data-disabled:cursor-default",
      variant === "danger" && "text-red-500 dark:text-red-400",
      className,
    )}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </BaseMenu.Item>
);

export const MenuSeparator = ({ className }: { className?: string }): JSX.Element => (
  <BaseMenu.Separator
    className={cn("mx-2 my-1 border-t border-mist-200 dark:border-mist-800", className)}
  />
);
