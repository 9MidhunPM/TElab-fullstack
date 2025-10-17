import Svg, { Path } from 'react-native-svg';

export const ArrowBackIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 11H7.414l4.293-4.293L10.293 5.293 4 11.586 4 12.414 10.293 18.707 11.707 17.293 7.414 13H20V11Z"
      fill={color}
    />
  </Svg>
);

export const SendIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2.01 21L23 12 2.01 3 2 10L17 12 2 14L2.01 21Z"
      fill={color}
    />
  </Svg>
);

export const CalendarIcon = ({ size = 24, color = '#000', outline = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {outline ? (
      <Path
        d="M19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM19 6H5V5H19V6Z"
        fill={color}
      />
    ) : (
      <Path
        d="M19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z"
        fill={color}
      />
    )}
  </Svg>
);

export const TrophyIcon = ({ size = 24, color = '#000', outline = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 5H17V3H7V5H5C3.9 5 3 5.9 3 7V9C3 10.66 4.34 12 6 12H6.97C7.56 13.19 8.5 14.12 9.68 14.71C9.25 15.19 9 15.82 9 16.5V19H8C7.45 19 7 19.45 7 20C7 20.55 7.45 21 8 21H16C16.55 21 17 20.55 17 20C17 19.45 16.55 19 16 19H15V16.5C15 15.82 14.75 15.19 14.32 14.71C15.5 14.12 16.44 13.19 17.03 12H18C19.66 12 21 10.66 21 9V7C21 5.9 20.1 5 19 5ZM6 10C5.45 10 5 9.55 5 9V7H7V10.82C6.84 10.4 6.42 10 6 10ZM19 9C19 9.55 18.55 10 18 10C17.58 10 17.16 10.4 17 10.82V7H19V9Z"
      fill={color}
    />
  </Svg>
);

export const TimeIcon = ({ size = 24, color = '#000', outline = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {outline ? (
      <Path
        d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"
        fill={color}
      />
    ) : (
      <Path
        d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"
        fill={color}
      />
    )}
  </Svg>
);

export const HomeIcon = ({ size = 24, color = '#000', outline = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {outline ? (
      <Path
        d="M12 3L2 12H5V20H19V12H22L12 3ZM12 5.69L18 10.72V18H15V13H9V18H6V10.72L12 5.69Z"
        fill={color}
      />
    ) : (
      <Path
        d="M12 3L2 12H5V20H19V12H22L12 3Z"
        fill={color}
      />
    )}
  </Svg>
);

export const SchoolIcon = ({ size = 24, color = '#000', outline = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {outline ? (
      <Path
        d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 16L12 13.5L7 16V19L12 21.5L17 19V16Z"
        fill={color}
      />
    ) : (
      <Path
        d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM17 16L12 13.5L7 16V19L12 21.5L17 19V16Z"
        fill={color}
      />
    )}
  </Svg>
);

export const ChatIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM6 9H18V11H6V9ZM14 14H6V12H14V14ZM18 8H6V6H18V8Z"
      fill={color}
    />
  </Svg>
);

export const SunIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM2 13H4C4.55 13 5 12.55 5 12C5 11.45 4.55 11 4 11H2C1.45 11 1 11.45 1 12C1 12.55 1.45 13 2 13ZM20 13H22C22.55 13 23 12.55 23 12C23 11.45 22.55 11 22 11H20C19.45 11 19 11.45 19 12C19 12.55 19.45 13 20 13ZM11 2V4C11 4.55 11.45 5 12 5C12.55 5 13 4.55 13 4V2C13 1.45 12.55 1 12 1C11.45 1 11 1.45 11 2ZM11 20V22C11 22.55 11.45 23 12 23C12.55 23 13 22.55 13 22V20C13 19.45 12.55 19 12 19C11.45 19 11 19.45 11 20ZM5.99 4.58C5.6 4.19 4.96 4.19 4.58 4.58C4.19 4.97 4.19 5.61 4.58 5.99L5.64 7.05C6.03 7.44 6.67 7.44 7.05 7.05C7.43 6.66 7.44 6.02 7.05 5.64L5.99 4.58ZM18.36 16.95C17.97 16.56 17.33 16.56 16.95 16.95C16.56 17.34 16.56 17.98 16.95 18.36L18.01 19.42C18.4 19.81 19.04 19.81 19.42 19.42C19.81 19.03 19.81 18.39 19.42 18.01L18.36 16.95ZM19.42 5.99C19.81 5.6 19.81 4.96 19.42 4.58C19.03 4.19 18.39 4.19 18.01 4.58L16.95 5.64C16.56 6.03 16.56 6.67 16.95 7.05C17.34 7.43 17.98 7.44 18.36 7.05L19.42 5.99ZM7.05 18.36C7.44 17.97 7.44 17.33 7.05 16.95C6.66 16.56 6.02 16.56 5.64 16.95L4.58 18.01C4.19 18.4 4.19 19.04 4.58 19.42C4.97 19.81 5.61 19.81 5.99 19.42L7.05 18.36Z"
      fill={color}
    />
  </Svg>
);

export const MoonIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C13.89 21 15.63 20.37 17.03 19.31C15.83 19.75 14.55 20 13.2 20C8.35 20 4.4 16.05 4.4 11.2C4.4 7.37 6.89 4.15 10.33 3.13C10.89 3.05 11.45 3 12 3Z"
      fill={color}
    />
  </Svg>
);

// NEW ICONS BELOW

export const UserIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
      fill={color}
    />
  </Svg>
);

export const PhoneIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z"
      fill={color}
    />
  </Svg>
);

export const EmailIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
      fill={color}
    />
  </Svg>
);

export const BookIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM18 20H6V4H7V13L10 10.5L13 13V4H18V20Z"
      fill={color}
    />
  </Svg>
);

export const ClockIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"
      fill={color}
    />
  </Svg>
);

export const CheckCircleIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
      fill={color}
    />
  </Svg>
);

export const WarningIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z"
      fill={color}
    />
  </Svg>
);

export const StarIcon = ({ size = 24, color = '#000', filled = true }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {filled ? (
      <Path
        d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
        fill={color}
      />
    ) : (
      <Path
        d="M22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24ZM12 15.4L8.24 17.67L9.24 13.39L5.92 10.51L10.3 10.13L12 6.1L13.71 10.14L18.09 10.52L14.77 13.4L15.77 17.68L12 15.4Z"
        fill={color}
      />
    )}
  </Svg>
);

export const PercentIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7.5 11C9.43 11 11 9.43 11 7.5C11 5.57 9.43 4 7.5 4C5.57 4 4 5.57 4 7.5C4 9.43 5.57 11 7.5 11ZM7.5 6C8.33 6 9 6.67 9 7.5C9 8.33 8.33 9 7.5 9C6.67 9 6 8.33 6 7.5C6 6.67 6.67 6 7.5 6ZM16.5 13C14.57 13 13 14.57 13 16.5C13 18.43 14.57 20 16.5 20C18.43 20 20 18.43 20 16.5C20 14.57 18.43 13 16.5 13ZM16.5 18C15.67 18 15 17.33 15 16.5C15 15.67 15.67 15 16.5 15C17.33 15 18 15.67 18 16.5C18 17.33 17.33 18 16.5 18ZM5.41 20L20 5.41L18.59 4L4 18.59L5.41 20Z"
      fill={color}
    />
  </Svg>
);

export const CardIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z"
      fill={color}
    />
  </Svg>
);

export const TeacherIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 11C13.66 11 15 9.66 15 8C15 6.34 13.66 5 12 5C10.34 5 9 6.34 9 8C9 9.66 10.34 11 12 11ZM12 13C9.67 13 5 14.17 5 16.5V19H19V16.5C19 14.17 14.33 13 12 13ZM20 7H22V9H24V11H22V13H20V11H18V9H20V7Z"
      fill={color}
    />
  </Svg>
);

export const ChartIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"
      fill={color}
    />
  </Svg>
);

export const PinIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
      fill={color}
    />
  </Svg>
);

export const RefreshIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"
      fill={color}
    />
  </Svg>
);

export const InfoIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"
      fill={color}
    />
  </Svg>
);

export const TrendingUpIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"
      fill={color}
    />
  </Svg>
);

export const TrendingDownIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 18L18.29 15.71L13.41 10.83L9.41 14.83L2 7.41L3.41 6L9.41 12L13.41 8L19.71 14.29L22 12V18H16Z"
      fill={color}
    />
  </Svg>
);

export const SparklesIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11.5 9.5L9 4L6.5 9.5L1 12L6.5 14.5L9 20L11.5 14.5L17 12L11.5 9.5ZM19.5 3.5L18.5 5.5L16.5 6.5L18.5 7.5L19.5 9.5L20.5 7.5L22.5 6.5L20.5 5.5L19.5 3.5Z"
      fill={color}
    />
  </Svg>
);

export const PlayIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M8 5V19L19 12L8 5Z"
      fill={color}
    />
  </Svg>
);