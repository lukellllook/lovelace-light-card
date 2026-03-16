export const STATE_ICONS: Record<string, string> = {
  light: '💡',
  switch: '🔘',
  fan: '🌀',
  climate: '🌡️',
  cover: '🪟',
  lock: '🔒',
  'lock-unlocked': '🔓',
  media_player: '▶️',
  sensor: '📊',
  binary_sensor: '📡',
  input_boolean: '☑️',
  automation: '🤖',
  scene: '🎬',
  script: '📜',
  group: '👥',
};

export const ICON_MAP: Record<string, string> = {
  'lightbulb': '💡',
  'lightbulb-outline': '💡',
  'toggle-switch': '🔘',
  'toggle-switch-off': '🔘',
  'fan': '🌀',
  'thermostat': '🌡️',
  'blinds': '🪟',
  'lock': '🔒',
  'lock-open': '🔓',
  'unlock': '🔓',
  'play-circle': '▶️',
  'sensor': '📊',
  'access-point': '📡',
  'help-circle': '❓',
  'garage': '🚗',
  'home': '🏠',
  'power': '⚡',
  'cog': '⚙️',
  'weather-sunny': '☀️',
  'weather-night': '🌙',
};

export function getEntityIcon(domain: string, state?: string): string {
  if (domain === 'lock' && state === 'unlocked') {
    return ICON_MAP['lock-open'] || STATE_ICONS['lock-unlocked'];
  }
  return ICON_MAP[domain] || STATE_ICONS[domain] || '⚡';
}

export function parseIcon(iconName: string): string {
  if (!iconName) return '';
  const icon = iconName.replace('mdi:', '');
  return ICON_MAP[icon] || iconName;
}

export function formatState(state: string): string {
  return state?.replace(/_/g, ' ') || '';
}

export function getDomain(entityId: string): string {
  return entityId?.split('.')[0] || '';
}

export function isEntityOn(state: string): boolean {
  return state === 'on' || state === 'playing' || state === 'unlocked' || state === 'open';
}
