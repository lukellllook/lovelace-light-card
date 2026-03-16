import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EntityStateCardConfig } from './entity-state-card';

@customElement('entity-state-card-editor')
export class EntityStateCardEditor extends LitElement {
  @property({ type: Object }) config?: EntityStateCardConfig;
  @property({ type: Object }) hass?: Record<string, unknown>;

  @state() private _entity: string = '';
  @state() private _name: string = '';
  @state() private _icon: string = '';
  @state() private _showState: boolean = true;
  @state() private _tapAction: 'toggle' | 'more-info' | 'none' = 'more-info';

  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }

    .form-field {
      margin-bottom: 16px;
    }

    label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color, #757575);
      margin-bottom: 4px;
    }

    input, select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--input-border-color, #e0e0e0);
      border-radius: 6px;
      font-size: 14px;
      background: var(--input-background-color, #fff);
      color: var(--primary-text-color, #212121);
      box-sizing: border-box;
    }

    input:focus, select:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    input[type="checkbox"] {
      width: auto;
    }

    .checkbox-wrapper label {
      margin-bottom: 0;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.config) {
      this._entity = this.config.entity || '';
      this._name = this.config.name || '';
      this._icon = this.config.icon || '';
      this._showState = this.config.show_state !== false;
      this._tapAction = this.config.tap_action?.action || 'more-info';
    }
  }

  setConfig(config: EntityStateCardConfig) {
    this.config = config;
    this._entity = config.entity || '';
    this._name = config.name || '';
    this._icon = config.icon || '';
    this._showState = config.show_state !== false;
    this._tapAction = config.tap_action?.action || 'more-info';
  }

  private _handleChange(field: string, event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' 
      ? target.checked 
      : target.value;

    if (field === 'entity') this._entity = value as string;
    if (field === 'name') this._name = value as string;
    if (field === 'icon') this._icon = value as string;
    if (field === 'showState') this._showState = value as boolean;
    if (field === 'tapAction') this._tapAction = value as 'toggle' | 'more-info' | 'none';

    this._dispatchConfigChange();
  }

  private _dispatchConfigChange() {
    const newConfig: EntityStateCardConfig = {
      entity: this._entity || undefined,
      name: this._name || undefined,
      icon: this._icon || undefined,
      show_state: this._showState,
      tap_action: {
        action: this._tapAction,
        entity: this._entity || undefined
      }
    };

    const event = new CustomEvent('config-changed', {
      bubbles: true,
      composed: true,
      detail: { config: newConfig }
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="form-field">
        <label>Entity ID</label>
        <input 
          type="text" 
          .value=${this._entity}
          @input=${(e: Event) => this._handleChange('entity', e)}
          placeholder="light.living_room"
        >
      </div>

      <div class="form-field">
        <label>Name</label>
        <input 
          type="text" 
          .value=${this._name}
          @input=${(e: Event) => this._handleChange('name', e)}
          placeholder="Custom Name"
        >
      </div>

      <div class="form-field">
        <label>Icon (emoji)</label>
        <input 
          type="text" 
          .value=${this._icon}
          @input=${(e: Event) => this._handleChange('icon', e)}
          placeholder="💡"
        >
      </div>

      <div class="form-field">
        <label>Tap Action</label>
        <select 
          .value=${this._tapAction}
          @change=${(e: Event) => this._handleChange('tapAction', e)}
        >
          <option value="more-info">More Info</option>
          <option value="toggle">Toggle</option>
          <option value="none">None</option>
        </select>
      </div>

      <div class="form-field checkbox-wrapper">
        <input 
          type="checkbox" 
          id="showState"
          .checked=${this._showState}
          @change=${(e: Event) => this._handleChange('showState', e)}
        >
        <label for="showState">Show State</label>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'entity-state-card-editor': EntityStateCardEditor;
  }
}
