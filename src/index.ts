import './components';

export function createEntityControllerCard(config: unknown): HTMLElement {
  const card = document.createElement('entity-controller-card') as HTMLElement & { setConfig: (config: unknown) => void };
  card.setConfig(config);
  return card;
}

export function createEntityStateCard(config: unknown): HTMLElement {
  const card = document.createElement('entity-state-card') as HTMLElement & { setConfig: (config: unknown) => void };
  card.setConfig(config);
  return card;
}
