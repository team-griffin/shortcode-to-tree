import BBCodeParser from 'bbcode-parser';
import BBTag from 'bbcode-parser/bbTag';
import convert from 'xml-js';
import * as r from'ramda';

const bbTags = r.merge(
  {
    root: BBTag.createSimpleTag('root')
  },
  BBCodeParser.defaultTags()
);

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
  const bbParser = new BBCodeParser(r.merge(
    bbTags,
    customTags,
  ));
  
  const html = bbParser.parseString(ensureRootTag(str));

  const json = convert.xml2js(html, {
    compact: false,
    spaces: 2,
  });

  return json.elements[0];
}

export default parser;
