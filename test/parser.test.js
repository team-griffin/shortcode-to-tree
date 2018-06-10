import { expect } from 'chai';
import parser from '../src/parser';
import createAttributeTag from '../src/createAttributeTag';

describe('parser', function() {
  it('returns an object', function() {
    const shortcode = 'Hello world!';
    const result = parser(shortcode);

    expect(result).instanceof(Object);
  });

  it('root as top level element', function() {
    const shortcode = 'Hello world!';
    const result = parser(shortcode);

    expect(result.type).equals('element');
    expect(result.name).equals('root');  
  });

  context('when no root element', function() {
    it('wraps in root element', function() {
      const shortcode = 'Hello world!';
      const result = parser(shortcode);

      expect(result.name).equals('root');      
    });
  });
  context('when root element is present', function() {
    it('does not wrap in root element', function() {
      const shortcode = '[root]Hello world![/root]';
      const result = parser(shortcode);

      expect(result.elements[0].type).equals('text');      
    });   
  });

  it('supports custom tags', function() {
    const shortcode = '[foo]Hello world![/foo]';
    const result = parser(shortcode, {
      foo: createAttributeTag('foo'),
    });

    expect(result.elements[0].type).equals('element');
    expect(result.elements[0].name).equals('foo');   
  });

  it('supports self-closing', function() {
    const shortcode = 'Hello [foo id="1"/] World!';
    const result = parser(shortcode, {
      foo: createAttributeTag('foo'),
    });

    expect(result.elements[0].type).equals('text');
    expect(result.elements[1].name).equals('foo');
    expect(result.elements[2].type).equals('text');
  });
});