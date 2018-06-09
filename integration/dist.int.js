import { expect } from 'chai';
import { parser, createAttributeTag } from '../dist/es/shortcode-to-tree';

describe('dist', function() {
  describe('#parser', function() {
    it('is a function', function() {
      expect(parser).instanceof(Function);
    });

    it('returns an object', function() {
      const result = parser('[b]Hello World![/b]');
      expect(result).instanceof(Object);
    });
  });

  describe('#createAttributeTag', function() {
    it('is a function', function() {
      expect(createAttributeTag).instanceof(Function);
    });
  });
});
