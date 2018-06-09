import { expect } from 'chai';
import parser from '../src/parser';
import createAttributeTag from '../src/createAttributeTag';

describe('createAttributeTag', function() {
  beforeEach(function() {
    const bbcode = '[custom id="foo" bar="baz" qux="true"]Hello World![/custom]';
    const result = parser(bbcode, {
      custom: createAttributeTag('custom'),
    });
    this.element = result.elements[0];
  });

  it('sets the node to the specified type', function() {
    expect(this.element.name).to.equal('custom');
  });

  it('sets the content', function() {
    expect(this.element.elements[0].type).to.equal('text');
  });

  it('creates a kvp of attributes', function() {
    expect(this.element.attributes).to.eql({
      id: 'foo',
      bar: 'baz',
      qux: 'true',
    });
  });

  it('treats all attributes as strings', function() {
    expect(this.element.attributes.qux).to.equal('true');
  });
});