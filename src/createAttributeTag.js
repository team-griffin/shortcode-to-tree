import BBTag from 'bbcode-parser/bbTag';
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

function createAttributeTag(tagType) {
  return BBTag.createTag(tagType, function(tag, content, attr) {
    const element = `<${tagType} ${formatAttributes(attr)}>${content}</${tagType}>`;
    return element;
  });
}

export default createAttributeTag;
