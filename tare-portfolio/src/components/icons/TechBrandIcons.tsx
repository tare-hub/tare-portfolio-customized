import React from 'react';

interface TechIconProps {
  size?: number;
  className?: string;
}

export const LaravelIcon: React.FC<TechIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M8.2 4.1L3.8 6.6c-.5.3-.8.8-.8 1.4v9.9c0 .6.3 1.1.8 1.4l4.4 2.5c.5.3 1.1.3 1.6 0l4.4-2.5c.5-.3.8-.8.8-1.4V7.5c0-.6-.3-1.1-.8-1.4L9.8 3.6c-.5-.3-1.1-.3-1.6.5z"
      fill="#FF2D20"
      opacity="0.9"
    />
    <path
      d="M15.8 8.1l-4.4 2.5c-.5.3-.8.8-.8 1.4v4.9c0 .6.3 1.1.8 1.4l4.4 2.5c.5.3 1.1.3 1.6 0l4.4-2.5c.5-.3.8-.8.8-1.4v-4.9c0-.6-.3-1.1-.8-1.4l-4.4-2.5c-.5-.3-1.1-.3-1.6 0z"
      fill="#E22418"
    />
    <path
      d="M15.8 2.1l-4.4 2.5c-.5.3-.8.8-.8 1.4v4.9c0 .6.3 1.1.8 1.4l4.4 2.5c.5.3 1.1.3 1.6 0l4.4-2.5c.5-.3.8-.8.8-1.4V6c0-.6-.3-1.1-.8-1.4l-4.4-2.5c-.5-.3-1.1-.3-1.6 0z"
      fill="#FF4F45"
    />
  </svg>
);

export const PhpIcon: React.FC<TechIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <ellipse cx="12" cy="12" rx="10" ry="6.5" fill="#777BB4" opacity="0.9" />
    <path
      d="M6.5 14.2l1.2-4.5h2.2c1.2 0 1.8.5 1.5 1.5-.3 1.1-1.1 1.6-2.2 1.6H7.9l-.4 1.4H6.5zm1.8-2.3h1c.5 0 .8-.2 1-.7.1-.4 0-.6-.4-.6h-.9l-.3 1.3zM11.5 14.2l1.2-4.5h1.4l-.4 1.5h.1c.4-.7 1-.9 1.6-.9 1.1 0 1.5.7 1.2 1.8l-.6 2.1h-1.4l.6-1.9c.2-.6 0-.9-.5-.9-.6 0-1 .5-1.2 1.2l-.4 1.6h-1.5zm6.8 0l1.2-4.5h2.2c1.2 0 1.8.5 1.5 1.5-.3 1.1-1.1 1.6-2.2 1.6h-1.3l-.4 1.4h-1zm1.8-2.3h1c.5 0 .8-.2 1-.7.1-.4 0-.6-.4-.6h-.9l-.3 1.3z"
      fill="#FFFFFF"
    />
  </svg>
);

export const VueIcon: React.FC<TechIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 3h4.2L12 13.2 17.8 3H22L12 20.5 2 3z" fill="#42B883" />
    <path d="M6.2 3h3.6L12 6.8 14.2 3h3.6L12 13.5 6.2 3z" fill="#35495E" />
  </svg>
);

export const ReactIcon: React.FC<TechIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.3" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.3" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.3" />
  </svg>
);

export const TypeScriptIcon: React.FC<TechIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="4" fill="#3178C6" />
    <path
      d="M10.8 10.5H5.8v2.2h1.8v6.5h2.5v-6.5h1.8v-2.2zm4.3 6.3c.7.4 1.5.6 2.3.6 1 0 1.6-.4 1.6-1 0-.6-.5-.9-1.6-1.3-1.6-.6-2.6-1.4-2.6-2.7 0-1.8 1.4-2.8 3.5-2.8.9 0 1.7.2 2.3.5l-.6 2c-.5-.3-1.1-.4-1.7-.4-.8 0-1.3.4-1.3.9 0 .5.5.8 1.5 1.2 1.8.7 2.7 1.5 2.7 2.8 0 1.9-1.4 2.9-3.7 2.9-1.1 0-2.1-.3-2.9-.7l.5-2z"
      fill="#FFFFFF"
    />
  </svg>
);

export const JavaScriptIcon: React.FC<TechIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="4" fill="#F7DF1E" />
    <path
      d="M13.2 16.8c.4.7.9 1.1 1.8 1.1.8 0 1.3-.3 1.3-.8 0-.6-.5-.8-1.4-1.2-1.3-.5-2.2-1.2-2.2-2.4 0-1.5 1.2-2.4 2.8-2.4 1.1 0 1.8.3 2.4 1l-.7 1.4c-.4-.4-.8-.6-1.5-.6-.6 0-1 .3-1 .6 0 .4.4.6 1.2.9 1.4.5 2.4 1.1 2.4 2.5 0 1.7-1.3 2.5-3.1 2.5-1.4 0-2.3-.5-2.9-1.6l1.2-1zM7.5 17.5c.3.5.7.8 1.3.8.7 0 1.1-.3 1.1-1.3v-5.8h1.7v5.8c0 1.9-1.1 2.7-2.7 2.7-1.2 0-2-.5-2.5-1.5l1.1-.7z"
      fill="#000000"
    />
  </svg>
);

export const MySqlIcon: React.FC<TechIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="4" fill="#00758F" />
    <path
      d="M17.8 9.5c-.2-.6-.5-1.1-1-1.5-.7-.6-1.6-.9-2.6-.9-1.5 0-2.8.6-3.7 1.7-.5-.7-1.3-1.2-2.3-1.4-.4-.1-.8-.1-1.2 0-.9.2-1.6.7-2.1 1.4-.6.8-.9 1.8-.8 2.8.1 1.4.8 2.6 1.8 3.4 1 .8 2.3 1.1 3.6.9.5-.1 1-.3 1.5-.6.5.6 1.2 1 2 1.2.8.2 1.6.1 2.4-.2.8-.3 1.4-.9 1.8-1.6.4-.8.5-1.7.4-2.6-.1-.9-.5-1.8-1.2-2.4l-.5-.2zm-4.3 3.6c-.3.4-.7.6-1.2.7-.4.1-.9 0-1.3-.2-.4-.2-.7-.5-.9-.9-.2-.4-.2-.8-.1-1.2.1-.4.3-.8.7-1 .3-.3.8-.4 1.2-.4.5 0 .9.2 1.2.5.4.3.6.7.6 1.2-.1.5-.2.9-.2 1.3z"
      fill="#F29111"
    />
  </svg>
);

export const RedisIcon: React.FC<TechIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2l8 4.2v6.8L12 17l-8-4V6.2L12 2z" fill="#DC382D" />
    <path d="M12 17l8-4v3l-8 4-8-4v-3l8 4z" fill="#A82820" />
    <path d="M12 19l8-4v2l-8 4-8-4v-2l8 4z" fill="#751C17" />
    <circle cx="12" cy="7.5" r="1.8" fill="#FFFFFF" />
  </svg>
);

export const DockerIcon: React.FC<TechIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M21.8 11.2c-.4-.3-1.1-.3-1.7-.1-.2-.8-.7-1.5-1.5-1.9l-.7-.3-.4.6c-.4.7-.6 1.4-.5 2.2-.8.5-2.1.6-3.3.4l-.2-.1v-4h-2.1v2.1h-1.9V8H7.6v2.1H5.7v2.1H3.8V10H1.9v4.2c0 2.2 1.8 4 4 4 3.7 0 7-1.8 9.5-3.8 2.2-.3 3.9-1.2 4.9-2.7.2-.3.2-.5.1-.7l-1.6.2z"
      fill="#2496ED"
    />
    <rect x="7.6" y="8" width="1.9" height="1.9" rx="0.3" fill="#2496ED" />
    <rect x="9.8" y="8" width="1.9" height="1.9" rx="0.3" fill="#2496ED" />
    <rect x="12" y="8" width="1.9" height="1.9" rx="0.3" fill="#2496ED" />
    <rect x="9.8" y="5.8" width="1.9" height="1.9" rx="0.3" fill="#2496ED" />
  </svg>
);

export const TailwindIcon: React.FC<TechIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 6c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2.2-1.3 3.5-1.1 1.1.2 1.9 1 2.8 1.9 1.4 1.4 3 3.1 6.2 3.1 2.4 0 3.9-1.2 4.5-3.6-1 .9-2.2 1.3-3.5 1.1-1.1-.2-1.9-1-2.8-1.9-1.4-1.4-3-3.1-6.2-3.1zM6.5 12.5C4.1 12.5 2.6 13.7 2 16.1c1-.9 2.2-1.3 3.5-1.1 1.1.2 1.9 1 2.8 1.9 1.4 1.4 3 3.1 6.2 3.1 2.4 0 3.9-1.2 4.5-3.6-1 .9-2.2 1.3-3.5 1.1-1.1-.2-1.9-1-2.8-1.9-1.4-1.4-3-3.1-6.2-3.1z"
      fill="#38BDF8"
    />
  </svg>
);

export const GitIcon: React.FC<TechIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L9.1 4.3l2.7 2.7c.6-.2 1.3-.1 1.8.4.5.5.7 1.3.4 1.9l2.6 2.6c.7-.2 1.4 0 1.9.5.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.6-.6-.7-1.4-.4-2.1l-2.4-2.4v5.3c.2.2.4.4.4.7 0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8c0-.7.4-1.3 1-1.6V8.6c-.6-.3-1-.9-1-1.6 0-.5.2-1 .5-1.3L8.5 3.7 2.4 9.8c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.6-8.5c.6-.6.6-1.5 0-2l0-1z"
      fill="#F05032"
    />
  </svg>
);

export const RestApiIcon: React.FC<TechIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="4" fill="#181824" stroke="#4ade80" strokeWidth="1.2" />
    <path
      d="M5 12h14m-5-4l4 4-4 4M9 8l-4 4 4 4"
      stroke="#4ade80"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

