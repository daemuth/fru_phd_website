export default function sticky(node, {stickToTop}) {
  const sentinelStyle = 'position: absolute; height: 1px;';
  const stickySentinelTop = document.createElement('div');
  stickySentinelTop.classList.add('stickySentinelTop');
  stickySentinelTop.style = sentinelStyle;
  node.parentNode.prepend(stickySentinelTop);

  const stickySentinelBottom = document.createElement('div');
  stickySentinelBottom.classList.add('stickySentinelBottom');
  stickySentinelBottom.style = sentinelStyle;
  node.parentNode.append(stickySentinelBottom);

  const intersectionCallback = function(entries) {
    const entry = entries[0];
    let isStuck = !entry.isIntersecting && isValidYPosition(entry);
    node.dispatchEvent(
      new CustomEvent('stuck', {
        detail: {isStuck}
      })
    );
  };

  const isValidYPosition = function({target, boundingClientRect}) {
    if (target === stickySentinelTop) {
      return boundingClientRect.y < 0;
    } else {
      return boundingClientRect.y > 0;
    }
  };

  const intersectionObserver = new IntersectionObserver(intersectionCallback, {});

  if (stickToTop) {
    intersectionObserver.observe(stickySentinelTop);
  } else {
    intersectionObserver.observe(stickySentinelBottom);
  }
}
