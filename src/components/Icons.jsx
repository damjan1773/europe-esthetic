// SVG ikonice iz dizajna. Sve su dekorativne (aria-hidden); tekst ili aria-label nosi dugme/link.

function Svg({ size = 18, strokeWidth = 1.8, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const ArrowUpRight = (p) => <Svg {...p}><path d="M7 17L17 7M9 7h8v8" /></Svg>
export const ArrowRight = (p) => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
export const Calendar = (p) => <Svg {...p}><rect x="4" y="5" width="16" height="15" rx="3" /><path d="M8 3v4M16 3v4M4 10h16" /></Svg>
export const Phone = (p) => <Svg {...p}><path d="M5 4h3.5l1.5 4-2 1.3a11 11 0 0 0 6.7 6.7L16 14l4 1.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z" /></Svg>
export const Pin = (p) => <Svg {...p}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></Svg>
export const Chevron = (p) => <Svg {...p}><path d="M6 9l6 6 6-6" /></Svg>
export const ChevronLeft = (p) => <Svg {...p}><path d="M15 6l-6 6 6 6" /></Svg>
export const ChevronRight = (p) => <Svg {...p}><path d="M9 6l6 6-6 6" /></Svg>
export const Clock = (p) => <Svg {...p}><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></Svg>
export const Drag = (p) => <Svg {...p}><path d="M9 8l-4 4 4 4M15 8l4 4-4 4" /></Svg>
export const Chat = (p) => <Svg {...p}><path d="M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.2-4.1A8 8 0 1 1 20 11.5z" /></Svg>
export const Star = (p) => (
  <Svg strokeWidth={1.2} {...p}>
    <path fill="currentColor" d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
  </Svg>
)
export const Instagram = (p) => (
  <Svg {...p}>
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
  </Svg>
)
