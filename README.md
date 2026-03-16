# Entity Controller Card

A customizable entity controller card for Home Assistant Lovelace UI.

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Go to **Integrations**
3. Click the **+** button
4. Search for "Entity Controller Card"
5. Click **Install**

### Manual

1. Download the latest release
2. Copy `entity-controller.js` to `/config/www/`
3. Add resource in Home Assistant:
   - URL: `/local/entity-controller.js`
   - Type: **JavaScript Module**

## Usage

```yaml
type: entity-controller-card
entity: light.living_room
name: Living Room
```

## Documentation

See [info.md](info.md) for full configuration options.

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode with hot reload
npm run watch
```
# lovelace-light-card
