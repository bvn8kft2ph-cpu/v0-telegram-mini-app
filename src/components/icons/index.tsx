// ═══════════════════════════════════════════════
// FREGER COSMETICS — PREMIUM LUXURY ICONS
// Thin strokes, elegant curves, refined details
// ═══════════════════════════════════════════════

import React from "react";

interface IconProps {
  size?: number;
  color?: string;
  filled?: boolean;
}

// Shopping bag - elegant tote silhouette
export const CartIcon = ({ size = 24, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 7.5C5 6.67 5.67 6 6.5 6h11c.83 0 1.5.67 1.5 1.5V19c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V7.5z" stroke={color} strokeWidth="1.2"/>
    <path d="M8 6V5a4 4 0 1 1 8 0v1" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// Sun - refined rays
export const SunIcon = ({ size = 24, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
);

// Moon - elegant crescent
export const MoonIcon = ({ size = 24, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M20.5 12.5c0 4.7-3.8 8.5-8.5 8.5-3.4 0-6.4-2-7.8-5 .6.1 1.2.2 1.8.2 4.7 0 8.5-3.8 8.5-8.5 0-.6-.1-1.2-.2-1.8 3 1.4 5 4.4 5 7.8v-.2z" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Catalog - elegant grid with offset
export const CatalogIcon = ({ size = 22, color = "currentColor", filled = false }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="8" height="8" rx="2" fill={filled ? color : "none"} stroke={color} strokeWidth="1.2"/>
    <rect x="13" y="3" width="8" height="8" rx="2" fill={filled ? color : "none"} stroke={color} strokeWidth="1.2"/>
    <rect x="3" y="13" width="8" height="8" rx="2" fill={filled ? color : "none"} stroke={color} strokeWidth="1.2"/>
    <rect x="13" y="13" width="8" height="8" rx="2" fill={filled ? color : "none"} stroke={color} strokeWidth="1.2"/>
  </svg>
);

// Services - spa lotus flower
export const ServicesIcon = ({ size = 22, color = "currentColor", filled = false }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 21c-4-3-7-6.5-7-10.5C5 6.5 8 4 12 4s7 2.5 7 6.5c0 4-3 7.5-7 10.5z" fill={filled ? color : "none"} stroke={color} strokeWidth="1.2"/>
    <path d="M12 4c0 3.5-2 6-4.5 7.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M12 4c0 3.5 2 6 4.5 7.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M12 12v5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="12" cy="9" r="1.5" fill={filled ? "#FFF" : color}/>
  </svg>
);

// Brand - elegant diamond
export const BrandIcon = ({ size = 22, color = "currentColor", filled = false }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 9l9 13 9-13-9-7z" fill={filled ? color : "none"} stroke={color} strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M3 9h18" stroke={color} strokeWidth="1.2"/>
    <path d="M7.5 9L12 22l4.5-13" stroke={color} strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M7.5 9L12 2l4.5 7" stroke={color} strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
);

// Profile - refined silhouette
export const ProfileIcon = ({ size = 22, color = "currentColor", filled = false }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.5" fill={filled ? color : "none"} stroke={color} strokeWidth="1.2"/>
    <path d="M19 20c0-3.5-3.1-6-7-6s-7 2.5-7 6" fill={filled ? color : "none"} stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// Close - elegant X
export const CloseIcon = ({ size = 24, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
    <path d="M6 6l12 12M18 6L6 18"/>
  </svg>
);

// Arrow right - refined
export const ArrowRightIcon = ({ size = 20, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7"/>
  </svg>
);

// Arrow left - refined
export const ArrowLeftIcon = ({ size = 20, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M11 19l-7-7 7-7"/>
  </svg>
);

// Check - elegant curve
export const CheckIcon = ({ size = 16, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12l6 6L20 6"/>
  </svg>
);

// Heart - refined curves
export const HeartIcon = ({ size = 20, color = "currentColor", filled = false }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"}>
    <path d="M12 21C12 21 4 14.5 4 9c0-2.5 2-4.5 4.5-4.5 1.5 0 2.9.8 3.5 2 .6-1.2 2-2 3.5-2C18 4.5 20 6.5 20 9c0 5.5-8 12-8 12z" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Chevrons - refined angles
export const ChevronDownIcon = ({ size = 20, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

export const ChevronRightIcon = ({ size = 20, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6l6 6-6 6"/>
  </svg>
);

// Package - elegant box
export const PackageIcon = ({ size = 20, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l8 4v8l-8 4-8-4V6l8-4z"/>
    <path d="M12 10v8M4 6l8 4 8-4"/>
  </svg>
);

// Truck - refined delivery
export const TruckIcon = ({ size = 20, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 5h12v11H2zM14 9h4l3 3v4h-7V9z"/>
    <circle cx="6" cy="18" r="2"/>
    <circle cx="18" cy="18" r="2"/>
  </svg>
);

// FileText - elegant document
export const FileTextIcon = ({ size = 20, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
    <path d="M14 2v6h6M8 13h8M8 17h5"/>
  </svg>
);

// Copy - refined layers
export const CopyIcon = ({ size = 16, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="12" height="12" rx="2"/>
    <path d="M5 15V5a2 2 0 0 1 2-2h10"/>
  </svg>
);

// Download - elegant
export const DownloadIcon = ({ size = 20, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v12M7 10l5 5 5-5M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"/>
  </svg>
);

// Clock - refined circle
export const ClockIcon = ({ size = 16, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

// MapPin - elegant drop
export const MapPinIcon = ({ size = 16, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 1 1 14 0c0 3.5-3 7-7 11z"/>
    <circle cx="12" cy="10" r="2.5"/>
  </svg>
);

// Send - refined paper plane
export const SendIcon = ({ size = 20, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
  </svg>
);

// Sparkle - elegant 4-point star
export const SparkleIcon = ({ size = 16, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2l2 7h7l-5.5 4.5 2 7L12 16l-5.5 4.5 2-7L3 9h7l2-7z" fill={color}/>
  </svg>
);

// Product bottle silhouette placeholder
export const ProductBottleIcon = ({ size = 64, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" opacity="0.3">
    <path d="M24 8h16v4c4 0 6 2 6 6v36c0 4-4 6-8 6H26c-4 0-8-2-8-6V18c0-4 2-6 6-6V8z" fill={color}/>
    <rect x="26" y="4" width="12" height="6" rx="2" fill={color}/>
    <rect x="22" y="20" width="20" height="2" rx="1" fill={color} opacity="0.5"/>
  </svg>
);

// Product jar silhouette placeholder
export const ProductJarIcon = ({ size = 64, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" opacity="0.3">
    <ellipse cx="32" cy="50" rx="20" ry="8" fill={color}/>
    <path d="M12 30c0-8 9-14 20-14s20 6 20 14v20c0 2-9 8-20 8s-20-6-20-8V30z" fill={color}/>
    <rect x="20" y="10" width="24" height="6" rx="3" fill={color}/>
  </svg>
);

// Star icon for loyalty levels
export const StarIcon = ({ size = 16, color = "currentColor", filled = true }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="1.2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

// Diamond icon for Gold level
export const DiamondIcon = ({ size = 16, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2L3 9l9 13 9-13-9-7z"/>
  </svg>
);

// Minus - for quantity
export const MinusIcon = ({ size = 20, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14"/>
  </svg>
);

// Plus - for quantity
export const PlusIcon = ({ size = 20, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

// Trash - for remove item
export const TrashIcon = ({ size = 20, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
  </svg>
);

// Radio - circle for delivery options
export const RadioIcon = ({ size = 20, color = "currentColor", filled = false }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.2"/>
    {filled && <circle cx="12" cy="12" r="5" fill={color}/>}
  </svg>
);

// Select chevrons
export const SelectChevronsIcon = ({ size = 16, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
    <path d="M7 10l5-5 5 5M7 14l5 5 5-5"/>
  </svg>
);

// WhatsApp icon
export const WhatsAppIcon = ({ size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.66 0-3.203-.506-4.485-1.371l-.256-.152-2.65.695.707-2.579-.168-.266A7.955 7.955 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" fill="#25D366"/>
  </svg>
);

// Waze icon (official style)
export const WazeIcon = ({ size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C7.031 2 3 6.031 3 11c0 2.124.756 4.076 2 5.594V21l3.4-2.267A8.938 8.938 0 0012 20c4.969 0 9-4.031 9-9s-4.031-9-9-9z" fill="#33CCFF"/>
    <circle cx="8.5" cy="10" r="1.5" fill="#000"/>
    <circle cx="15.5" cy="10" r="1.5" fill="#000"/>
    <path d="M8 14c0 0 1.5 2 4 2s4-2 4-2" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Google Maps icon
export const GoogleMapsIcon = ({ size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
    <circle cx="12" cy="9" r="2.5" fill="#fff"/>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84L12 22l5.59-8.16C18.5 12.37 19 10.74 19 9c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
    <path d="M12 6.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" fill="#fff"/>
  </svg>
);

// Apple Maps icon (authentic style)
export const AppleMapsIcon = ({ size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="appleMapsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#52D367"/>
        <stop offset="50%" stopColor="#3AC653"/>
        <stop offset="100%" stopColor="#5AC770"/>
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="4.5" fill="url(#appleMapsGrad)"/>
    <path d="M7 8.5L12 6l5 2.5v7L12 18l-5-2.5v-7z" fill="#F5F5DC" fillOpacity="0.9"/>
    <path d="M7 8.5L12 11l5-2.5" stroke="#E8C547" strokeWidth="0.5" fill="none"/>
    <path d="M12 11v7" stroke="#E8C547" strokeWidth="0.5"/>
    <path d="M9 9.5l2-1 2 1v4l-2 1-2-1v-4z" fill="#FFD93D" fillOpacity="0.6"/>
    <circle cx="12" cy="10" r="1.5" fill="#FF3B30"/>
    <path d="M12 10l1.5 3" stroke="#FF3B30" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// Calendar icon for bookings
export const CalendarIcon = ({ size = 20, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
    <rect x="7" y="14" width="3" height="3" rx="0.5"/>
  </svg>
);

// Legacy Icons object for backward compatibility
export const Icons = {
  Cart: CartIcon,
  Sun: SunIcon,
  Moon: MoonIcon,
  Catalog: CatalogIcon,
  Services: ServicesIcon,
  Brand: BrandIcon,
  Profile: ProfileIcon,
  Close: CloseIcon,
  ArrowRight: ArrowRightIcon,
  ArrowLeft: ArrowLeftIcon,
  Check: CheckIcon,
  Heart: HeartIcon,
  ChevronDown: ChevronDownIcon,
  ChevronRight: ChevronRightIcon,
  Package: PackageIcon,
  Truck: TruckIcon,
  FileText: FileTextIcon,
  Copy: CopyIcon,
  Download: DownloadIcon,
  Clock: ClockIcon,
  MapPin: MapPinIcon,
  Send: SendIcon,
  Sparkle: SparkleIcon,
  ProductBottle: ProductBottleIcon,
  ProductJar: ProductJarIcon,
  Star: StarIcon,
  Diamond: DiamondIcon,
  Minus: MinusIcon,
  Plus: PlusIcon,
  Trash: TrashIcon,
  Radio: RadioIcon,
  SelectChevrons: SelectChevronsIcon,
  WhatsApp: WhatsAppIcon,
  Waze: WazeIcon,
  GoogleMaps: GoogleMapsIcon,
  AppleMaps: AppleMapsIcon,
  Calendar: CalendarIcon,
};

export default Icons;
