import convert from 'xml-js';
import * as r from'ramda';
import ShortcodeParser from 'meta-shortcodes';
import createSimpleTag from './createSimpleTag';

const defaultTags = {
  root: createSimpleTag('root'),
}

function hasRootTag(str) {
  return r.startsWith('[root]', str);
}

function wrapWithRootTag(str) {
  return `[root]${str}[/root]`;
}

function ensureRootTag(str) {
  return r.unless(
    hasRootTag,
    wrapWithRootTag,
  )(str);
}

function parser(str, customTags) {
  const shortCodeParser = ShortcodeParser();

  const tags = r.merge(
    defaultTags,
    customTags,
  );

  r.forEachObjIndexed((value, key) => {
    shortCodeParser.add(key, value);
  })(tags);

  const xml = shortCodeParser.parse(ensureRootTag(str));

  const json = convert.xml2js(xml, {
    compact: false,
    spaces: 2,
    captureSpacesBetweenElements: true,
  });

  return json.elements[0];
}

export default parser;
