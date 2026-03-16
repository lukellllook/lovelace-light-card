import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HassEntity, Hass } from '../types/hass';
import { getEntityIcon, formatState, getDomain, isEntityOn } from '../utils/entity';

export interface EntityStateCardConfig {
  entity?: string;
  name?: string;
  icon?: string;
  show_state?: boolean;
  tap_action?: {
    action: 'toggle' | 'more-info' | 'none';
    entity?: string;
  };
}

@customElement('entity-state-card')
export class EntityStateCard extends LitElement {
  @property({ type: Object }) hass?: Hass;
  @property({ type: Object }) config?: EntityStateCardConfig;

  @state() private _entity?: HassEntity;

  static getStubConfig(): EntityStateCardConfig {
    return {
      entity: 'light.living_room',
      show_state: true,
      tap_action: {
        action: 'more-info'
      }
    };
  }

  static getConfigElement() {
    return document.createElement('entity-state-card-editor');
  }

  setConfig(config: EntityStateCardConfig): void {
    this.config = config;
  }

  static styles = css`
    :host {
      display: block;
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      padding: 16px;
      cursor: pointer;
      transition: background 0.2s ease;
      box-sizing: border-box;
    }
    
    :host(:hover) {
      background: var(--card-hover-color, #f5f5f5);
    }
    
    .card-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .icon {
      font-size: 24px;
      line-height: 1;
      flex-shrink: 0;
    }
    
    .info {
      flex: 1;
      min-width: 0;
    }
    
    .name {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .state {
      font-size: 12px;
      color: var(--secondary-text-color, #757575);
      text-transform: capitalize;
    }
    
    .state.on {
      color: var(--state-on-color, #4caf50);
    }
  `;

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('config') || changedProperties.has('hass')) {
      this._entity = this.config?.entity ? this.hass?.states[this.config.entity] : undefined;
    }
  }

  private _handleTap() {
    const action = this.config?.tap_action?.action || 'more-info';
    const entityId = this.config?.tap_action?.entity || this.config?.entity;
    
    if (action === 'toggle' && entityId) {
      const entity = this.hass?.states[entityId];
      if (entity) {
        const domain = getDomain(entityId);
        this.hass?.callService(domain, 'toggle', { entity_id: entityId });
      }
    } else if (action === 'more-info' && entityId) {
      const event = new CustomEvent('hass-more-info', {
        detail: { entityId },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    }
  }

  private _getIcon(): string {
    if (this.config?.icon) {
      return this.config.icon;
    }
    if (this._entity) {
      const domain = getDomain(this._entity.entity_id);
      return getEntityIcon(domain, this._entity.state);
    }
    return '⚡';
  }

  private _getName(): string {
    if (this.config?.name) {
      return this.config.name;
    }
    const friendlyName = this._entity?.attributes.friendly_name;
    return (typeof friendlyName === 'string' ? friendlyName : this.config?.entity) || '';
  }

  private _getState(): string {
    return formatState(this._entity?.state || 'unavailable');
  }

  render() {
    const isOn = isEntityOn(this._entity?.state || '');
    const showState = this.config?.show_state !== false;

    return html`
      <div class="card-content" @click=${this._handleTap}>
        <span class="icon">${this._getIcon()}</span>
        <div class="info">
          <div class="name">${this._getName()}</div>
          ${showState ? html`
            <div class="state ${isOn ? 'on' : ''}">${this._getState()}</div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'entity-state-card': EntityStateCard;
  }
}
