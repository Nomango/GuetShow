const defaultRoot = window;

type ScrollElement = HTMLElement | Window;

function isElement(node: Element) {
  const ELEMENT_NODE_TYPE = 1;
  return (
    node.tagName !== "HTML" &&
    node.tagName !== "BODY" &&
    node.nodeType === ELEMENT_NODE_TYPE
  );
}

const overflowScrollReg = /scroll|auto/i;

export function getScrollParent(
  el: Element,
  root: ScrollElement | undefined = defaultRoot
) {
  let node = el;

  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }

    node = node.parentNode as Element;
  }

  return root;
}
