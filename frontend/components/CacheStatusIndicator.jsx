import { Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

/**
 * CacheStatusIndicator - Shows whether data is fresh, cached, or stale
 * 
 * Props:
 * - isCached: boolean - Whether data is from cache
 * - isFresh: boolean - Whether cached data is still fresh (within TTL)
 * - lastUpdated: Date - When data was last updated
 * - compact: boolean - Show compact version (just icon)
 */
export default function CacheStatusIndicator({ isCached, isFresh, lastUpdated, compact = false }) {
  const { Colors } = useTheme();

  // Determine status
  let status = 'loading';
  let statusColor = Colors.textSecondary;
  let statusIcon = '⏳';
  let statusText = 'Loading...';

  if (isCached) {
    if (isFresh) {
      status = 'fresh';
      statusColor = '#10b981'; // green
      statusIcon = '🟢';
      statusText = 'Up to date';
    } else {
      status = 'stale';
      statusColor = '#f59e0b'; // orange
      statusIcon = '🟡';
      statusText = 'Cached data';
    }
  } else if (lastUpdated) {
    status = 'fresh';
    statusColor = '#10b981'; // green
    statusIcon = '🟢';
    statusText = 'Live data';
  }

  // Format last updated time
  const getTimeAgo = () => {
    if (!lastUpdated) return '';
    
    const now = new Date();
    const updated = new Date(lastUpdated);
    const diffMs = now - updated;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (compact) {
    return (
      <Text style={{ fontSize: 12 }}>
        {statusIcon}
      </Text>
    );
  }

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      backgroundColor: Colors.surface + '40', // 25% opacity
    }}>
      <Text style={{ fontSize: 10 }}>
        {statusIcon}
      </Text>
      <View>
        <Text style={{
          fontSize: 11,
          fontWeight: '600',
          color: statusColor,
        }}>
          {statusText}
        </Text>
        {lastUpdated && (
          <Text style={{
            fontSize: 9,
            color: Colors.textSecondary,
            marginTop: 1,
          }}>
            {getTimeAgo()}
          </Text>
        )}
      </View>
    </View>
  );
}
