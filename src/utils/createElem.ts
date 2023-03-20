export function createElem(
  tagName: string | HTMLElement = 'div',
  className: string | null = '',
  parent: string | HTMLElement | null,
  textContent = ''
): HTMLElement {
  const createdElem: HTMLElement = typeof tagName === 'string' ? document.createElement(tagName) : tagName;

  if (className) {
    createdElem.className = className;
  }

  if (parent) {
    if (typeof parent === 'string') {
      const parentEl: HTMLElement | null = document.querySelector(parent);
      if (parentEl) {
        parentEl.append(createdElem);
      }
    } else {
      parent.append(createdElem);
    }
  }

  if (textContent) {
    createdElem.textContent = textContent;
  }
  return createdElem;
}
