import { expect } from 'chai';
import parser from '../src/parser';
import createAttributeTag from '../src/createAttributeTag';

describe('parser', function() {
  it('returns an object', function() {
    const bbcode = 'Hello world!';
    const result = parser(bbcode);

    expect(result).instanceof(Object);
  });

  it('root as top level element', function() {
    const bbcode = 'Hello world!';
    const result = parser(bbcode);

    expect(result.type).equals('element');
    expect(result.name).equals('root');  
  });

  context('when no root element', function() {
    it('wraps in root element', function() {
      const bbcode = 'Hello world!';
      const result = parser(bbcode);

      expect(result.name).equals('root');      
    });
  });
  context('when root element is present', function() {
    it('does not wrap in root element', function() {
      const bbcode = '[root]Hello world![/root]';
      const result = parser(bbcode);

      expect(result.elements[0].type).equals('text');      
    });   
  });

  it('pre-loaded with standard tags', function() {
    const bbcode = '[b]Hello world![/b]';
    const result = parser(bbcode);

    expect(result.elements[0].name).equals('b');   
  });

  it('ignores unknown tags', function() {
    const bbcode = '[foo]Hello world![/foo]';
    const result = parser(bbcode);

    expect(result.elements[0].type).equals('text');
    expect(result.elements[0].text).equals(bbcode);
  });

  it('supports custom tags', function() {
    const bbcode = '[foo]Hello world![/foo]';
    const result = parser(bbcode, {
      foo: createAttributeTag('foo'),
    });

    expect(result.elements[0].type).equals('element');
    expect(result.elements[0].name).equals('foo');   
  });
});