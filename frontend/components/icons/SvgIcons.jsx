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
    {outline ? (
      <Path
        d="M7 3V9C7 10.66 8.34 12 10 12H11V13.5C8.58 13.86 7 14.94 7 16.24V18H17V16.24C17 14.94 15.42 13.86 13 13.5V12H14C15.66 12 17 10.66 17 9V3H7ZM9 5H15V9C15 9.55 14.55 10 14 10H10C9.45 10 9 9.55 9 9V5Z"
        fill={color}
      />
    ) : (
      <Path
        d="M7 3V9C7 10.66 8.34 12 10 12H11V13.5C8.58 13.86 7 14.94 7 16.24V18H17V16.24C17 14.94 15.42 13.86 13 13.5V12H14C15.66 12 17 10.66 17 9V3H7Z"
        fill={color}
      />
    )}
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