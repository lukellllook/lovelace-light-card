---
title: Entity Controller Card
description: A customizable entity controller card for Home Assistant Lovelace
featured: false
---
<!-- SHELL-CARD-PREVIEW -->
<div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; padding: 16px;">
  <div style="width: 350px; background: var(--primary-background-color, #fff); border-radius: 12px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="width: 48px; height: 48px; border-radius: 50%; background: #03a9f4; display: flex; align-items: center; justify-content: center; font-size: 24px;">💡</div>
      <div>
        <div style="font-size: 18px; font-weight: 600;">Living Room Light</div>
        <div style="font-size: 14px; color: #4caf50;">on</div>
      </div>
    </div>
    <div style="margin-top: 16px;">
      <button style="flex: 1; padding: 12px 16px; border: none; border-radius: 8px; background: #4caf50; color: white; font-size: 14px; width: 100%;">Turn Off</button>
    </div>
    <div style="margin-top: 16px;">
      <input type="range" min="0" max="100" value="70" style="width: 100%;">
      <div style="text-align: center; margin-top: 8px; font-size: 14px; color: #757575;">Brightness: 70%</div>
    </div>
  </div>
</div>
<!-- SHELL-CARD-PREVIEW-END -->

## Features

- **Entity Control**: Toggle entity on/off with a single tap
- **Brightness Slider**: Adjust brightness for light entities
- **Custom Icons**: Use any Material Design icon
- **Theme Support**: Automatically adapts to light/dark themes
- **Customizable Actions**: Configure tap, hold, and double-tap actions

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Click the three dots → **Custom repositories**
3. Add this repository URL
4. Search for "Entity Controller Card" and install

### Manual Installation

1. Download the `entity-controller.js` file from the [latest release](https://github.com/your-repo/ha-entity-controller/releases)
2. Copy to your Home Assistant config directory: `/config/www/`
3. Add resource in Home Assistant:
   - URL: `/local/entity-controller.js`
   - Resource type: **JavaScript Module**

## Configuration

```yaml
type: entity-controller-card
entity: light.living_room
name: Living Room
icon: mdi:ceiling-light
show_state: true
tap_action:
  action: toggle
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | Required | Entity ID (e.g., `light.living_room`) |
| `name` | string | auto | Custom name |
| `icon` | string | auto | Material Design icon |
| `show_state` | boolean | true | Show entity state |
| `tap_action` | object | toggle | Action on tap |
| `hold_action` | object | more-info | Action on hold |
| `double_tap_action` | object | none | Action on double tap |

### Action Types

- `toggle` - Toggle entity state
- `more-info` - Show entity info dialog
- `navigate` - Navigate to a dashboard
- `url` - Open external URL
- `call-service` - Call a Home Assistant service
- `none` - No action

## Supported Entities

- Lights (`light.*`)
- Switches (`switch.*`)
- Fans (`fan.*`)
- Climate (`climate.*`)
- Covers (`cover.*`)
- Locks (`lock.*`)
- Media Players (`media_player.*`)
