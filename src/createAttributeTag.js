import * as r from 'ramda';

function formatAttributes(attributes) {
  return r.pipe(
    r.toPairs,
    r.map(r.pipe(
      (attr) => [
        attr[0],
        `"${attr[1]}"`,
      ],
      r.join('='),
    )),
    r.join(' '),
  )(attributes);
}

export default function createAttributeTag(nodeType) {
  return function(opts, content) {
    const element = `<${nodeType} ${formatAttributes(opts)}>${content}</${nodeType}>`;
    return element;
  }
}