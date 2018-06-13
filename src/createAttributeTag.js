import * as r from 'ramda';

function formatAttributes(attributes) {
  return r.pipe(
    r.toPairs,
    r.map(r.converge(
      r.unapply(r.join('=')),
      [ r.nth(0), ([, x]) => `"${x}"` ],
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
