import clsx from 'clsx';
import { forwardRef, PropsWithChildren } from 'react';

type BaseViewProps = PropsWithChildren<{
  id?: string;
  isUnlocked?: boolean;
}>;

/**
 * BaseView: The main container for individual dashboard modules.
 * Refined to match shadcn/ui Card component styling.
 */
const BaseView = forwardRef<
  HTMLDivElement,
  BaseViewProps & JSX.IntrinsicElements['div']
>(({ className, isUnlocked, children, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      // Standard shadcn Card styling: background, border, and subtle shadow
      'flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all',
      // If unlocked (editing layout), show a primary colored ring to indicate active state
      isUnlocked ? 'ring-2 ring-primary/50 border-primary/20 shadow-lg' : 'border-border',
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
BaseView.displayName = 'BaseView';

type BaseViewHeadingProps = {
  isDraggable?: boolean;
};

/**
 * BaseViewHeading: Replaces the old large header with a muted, uppercase title
 * consistent with modern dashboard Card headers.
 */
const BaseViewHeading = ({
  className,
  children,
  isDraggable,
  ...props
}: BaseViewHeadingProps & JSX.IntrinsicElements['h2']) => (
  <h2
    className={clsx(
      'w-full px-4 py-3 text-xs font-bold tracking-widest text-muted-foreground uppercase bg-muted/30 border-b',
      isDraggable && 'grab-handle cursor-grab active:cursor-grabbing',
      className,
    )}
    {...props}
  >
    {children}
  </h2>
);

const BaseViewBody = ({
  children,
  className,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div className={clsx('flex-1 overflow-auto p-4 text-foreground', className)} {...props}>
    {children}
  </div>
);

const BaseViewIcons = ({
  className,
  children,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div className={clsx('mr-3 flex items-center space-x-1 text-muted-foreground', className)} {...props}>
    {children}
  </div>
);

const BaseViewIcon = ({
  className,
  children,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div className={clsx('flex items-center justify-center h-8 w-8', className)} {...props}>
    {children}
  </div>
);

/**
 * BaseViewIconButton: Styled to match shadcn/ui Ghost Button variants.
 */
const BaseViewIconButton = ({
  className,
  children,
  size = 8,
  ...props
}: JSX.IntrinsicElements['button'] & { size?: number }) => (
  <button
    className={clsx(
      'flex items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground',
      `h-${size} w-${size}`,
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export {
  BaseView as default,
  BaseViewHeading,
  BaseViewBody,
  BaseViewIcons,
  BaseViewIcon,
  BaseViewIconButton,
};
export type { BaseViewProps, BaseViewHeadingProps };
