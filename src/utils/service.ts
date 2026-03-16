import { Hass } from '../types';

export interface ServiceCallOptions {
  domain: string;
  service: string;
  serviceData?: Record<string, unknown>;
  target?: { entity_id?: string | string[] };
}

export class HassService {
  constructor(private hass: Hass | undefined) {}

  setHass(hass: Hass): void {
    this.hass = hass;
  }

  async callService(options: ServiceCallOptions): Promise<void> {
    if (!this.hass) {
      throw new Error('Home Assistant connection not available');
    }

    const { domain, service, serviceData, target } = options;

    const data: Record<string, unknown> = { ...serviceData };

    if (target?.entity_id) {
      data.entity_id = target.entity_id;
    }

    return this.hass.callService(domain, service, data);
  }

  async toggleEntity(entityId: string): Promise<void> {
    const domain = entityId.split('.')[0];
    const entity = this.hass?.states[entityId];

    if (!entity) {
      throw new Error(`Entity ${entityId} not found`);
    }

    const isOn = entity.state === 'on' || entity.state === 'playing' || entity.state === 'unlocked';
    const service = isOn ? 'turn_off' : 'turn_on';

    return this.callService({
      domain,
      service,
      serviceData: { entity_id: entityId },
    });
  }

  async turnOn(entityId: string, data?: Record<string, unknown>): Promise<void> {
    const domain = entityId.split('.')[0];
    return this.callService({
      domain,
      service: 'turn_on',
      serviceData: { entity_id: entityId, ...data },
    });
  }

  async turnOff(entityId: string): Promise<void> {
    const domain = entityId.split('.')[0];
    return this.callService({
      domain,
      service: 'turn_off',
      serviceData: { entity_id: entityId },
    });
  }

  getEntity(entityId: string) {
    return this.hass?.states[entityId];
  }

  getEntitiesByDomain(domain: string) {
    if (!this.hass?.states) return [];
    return Object.values(this.hass.states).filter(
      (entity) => entity.entity_id.startsWith(`${domain}.`)
    );
  }
}

export function createHassService(hass?: Hass): HassService {
  return new HassService(hass);
}
