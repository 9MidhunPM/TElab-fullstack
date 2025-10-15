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