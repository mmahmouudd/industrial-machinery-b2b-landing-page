import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function I({ size = 20, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    />
  );
}

export const IconSearch = (p: IconProps) => (
  <I {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3-3" />
  </I>
);
export const IconCart = (p: IconProps) => (
  <I {...p}>
    <path d="M6 8h15l-1.5 9h-12z" />
    <path d="M6 8 5 4H2" />
    <circle cx="9" cy="20" r="1" />
    <circle cx="18" cy="20" r="1" />
  </I>
);
export const IconMenu = (p: IconProps) => (
  <I {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </I>
);
export const IconClose = (p: IconProps) => (
  <I {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </I>
);
export const IconFilter = (p: IconProps) => (
  <I {...p}>
    <path d="M4 5h16l-6 8v5l-4 2v-7z" />
  </I>
);
export const IconCheck = (p: IconProps) => (
  <I {...p}>
    <path d="M5 12.5 9.5 17 19 7" />
  </I>
);
export const IconChevronDown = (p: IconProps) => (
  <I {...p}>
    <path d="m6 9 6 6 6-6" />
  </I>
);
export const IconChevronRight = (p: IconProps) => (
  <I {...p}>
    <path d="m9 6 6 6-6 6" />
  </I>
);
export const IconPhone = (p: IconProps) => (
  <I {...p}>
    <path d="M7 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6L17 13l4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3 7.2 2 2 0 0 1 5 5" />
  </I>
);
export const IconMail = (p: IconProps) => (
  <I {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </I>
);
export const IconShield = (p: IconProps) => (
  <I {...p}>
    <path d="M12 3 5 6v6c0 5 3.5 8 7 9 3.5-1 7-4 7-9V6z" />
  </I>
);
export const IconTruck = (p: IconProps) => (
  <I {...p}>
    <path d="M3 7h11v10H3zM14 11h4l3 3v3h-7" />
    <circle cx="7" cy="18" r="1.5" />
    <circle cx="17" cy="18" r="1.5" />
  </I>
);
export const IconClock = (p: IconProps) => (
  <I {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v5l3 2" />
  </I>
);
export const IconBuilding = (p: IconProps) => (
  <I {...p}>
    <path d="M4 20V6l8-3 8 3v14" />
    <path d="M9 20v-6h6v6M4 20h16" />
    <path d="M9 9h.01M12 9h.01M15 9h.01M9 12h.01M12 12h.01M15 12h.01" />
  </I>
);
export const IconPlus = (p: IconProps) => (
  <I {...p}>
    <path d="M12 5v14M5 12h14" />
  </I>
);
export const IconMinus = (p: IconProps) => (
  <I {...p}>
    <path d="M5 12h14" />
  </I>
);
export const IconArrowRight = (p: IconProps) => (
  <I {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </I>
);
export const IconArrowLeft = (p: IconProps) => (
  <I {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </I>
);
export const IconStar = (p: IconProps) => (
  <I {...p}>
    <path d="m12 3 2.6 5.4L20 9.3l-4 4 1 5.7L12 16.8 7 19l1-5.7-4-4 5.4-.9z" />
  </I>
);
export const IconGlobe = (p: IconProps) => (
  <I {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
  </I>
);
export const IconFile = (p: IconProps) => (
  <I {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
  </I>
);
export const IconPackage = (p: IconProps) => (
  <I {...p}>
    <path d="M3 8 12 3l9 5-9 5z" />
    <path d="M3 8v8l9 5 9-5V8M12 13v8" />
  </I>
);
export const IconZap = (p: IconProps) => (
  <I {...p}>
    <path d="M13 3 4 14h7l-1 7 9-11h-7z" />
  </I>
);
export const IconAward = (p: IconProps) => (
  <I {...p}>
    <circle cx="12" cy="9" r="5" />
    <path d="m8.5 13-1.5 8 5-3 5 3-1.5-8" />
  </I>
);
export const IconGrid = (p: IconProps) => (
  <I {...p}>
    <rect x="4" y="4" width="7" height="7" rx="1" />
    <rect x="13" y="4" width="7" height="7" rx="1" />
    <rect x="4" y="13" width="7" height="7" rx="1" />
    <rect x="13" y="13" width="7" height="7" rx="1" />
  </I>
);
export const IconList = (p: IconProps) => (
  <I {...p}>
    <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
  </I>
);
export const IconUser = (p: IconProps) => (
  <I {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 19c1.5-3 4-4.5 7-4.5S17.5 16 19 19" />
  </I>
);
export const IconCredit = (p: IconProps) => (
  <I {...p}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M3 10h18" />
  </I>
);
export const IconLock = (p: IconProps) => (
  <I {...p}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </I>
);
export const IconSliders = (p: IconProps) => (
  <I {...p}>
    <path d="M4 8h16M4 16h16M9 5v6M15 13v6" />
  </I>
);
export const IconHeadset = (p: IconProps) => (
  <I {...p}>
    <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
    <rect x="3" y="12" width="4" height="7" rx="1" />
    <rect x="17" y="12" width="4" height="7" rx="1" />
  </I>
);
export const IconFactory = (p: IconProps) => (
  <I {...p}>
    <path d="M3 21V10l6 4V10l6 4V8l6-3v16z" />
    <path d="M7 21v-3M12 21v-3M17 21v-3" />
  </I>
);
export const IconQuote = (p: IconProps) => (
  <I {...p}>
    <path d="M7 11c0-3 2-6 5-7-4 2-6 5-6 9v5H3v-5c0-1 .3-2 .8-3M17 11c0-3 2-6 5-7-4 2-6 5-6 9v5h-3v-5c0-1 .3-2 .8-3" />
  </I>
);
export const IconBox = (p: IconProps) => (
  <I {...p}>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
  </I>
);
