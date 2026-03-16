export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
  context: HassContext;
}

export interface HassContext {
  id: string;
  parent_id?: string;
  user_id?: string;
}

export interface HassEntities {
  [entityId: string]: HassEntity;
}

export interface HassServices {
  [domain: string]: {
    [service: string]: {
      description: string;
      fields: Record<string, unknown>;
    };
  };
}

export interface HassConfig {
  latitude: number;
  longitude: number;
  elevation: number;
  unit_system: string;
  time_zone: string;
  components: string[];
  version: string;
}

export interface Hass {
  states: HassEntities;
  services: HassServices;
  config: HassConfig;
  themes: Record<string, unknown>;
  theme: string;
  language: string;
  localize: (key: string, ...args: unknown[]) => string;
  callService: (domain: string, service: string, serviceData?: Record<string, unknown>) => Promise<void>;
  callApi: <T>(method: string, path: string, ...args: unknown[]) => Promise<T>;
  subscribeEvents: (eventType: string, callback: (event: unknown) => void) => () => void;
  connection: unknown;
  auth: unknown;
}
