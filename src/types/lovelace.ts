export type ActionType = 'toggle' | 'more-info' | 'navigate' | 'url' | 'call-service' | 'none';

export interface CardAction {
  action: ActionType;
  entity?: string;
  navigation_path?: string;
  url_path?: string;
  service?: string;
  service_data?: Record<string, unknown>;
}

export interface EntityControllerConfig {
  type?: string;
  entity?: string;
  entities?: string[];
  name?: string;
  icon?: string;
  show_state?: boolean;
  primary_info?: string[];
  secondary_info?: string[];
  tap_action?: CardAction;
  hold_action?: CardAction;
  double_tap_action?: CardAction;
}

export interface LovelaceCard {
  hass?: import('./hass').Hass;
  getConfigElement(): HTMLElement;
  setConfig(config: EntityControllerConfig): void;
}

export interface LovelaceCardEditor {
  hass?: import('./hass').Hass;
  setConfig(config: EntityControllerConfig): void;
  hassControlShown?: boolean;
}

export interface CardEditorConfig extends EntityControllerConfig {
  haFormRequired?: boolean;
}
