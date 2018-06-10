# shortcode-to-tree

Shortcodes are a nice compromise for human editors between the simplicity of markup languages like markdown 
and the complexities of html.

However, all shortcode parsers I have found focus purely on the "how to render this as html" aspect of it, but wouldn't it be nice 
if you could have it in a tree data structure before rendering so that it can be walked to allow operations like mapping or side-loading data.

## Usage

```sh
npm install shortcode-to-tree
yarn add shortcode-to-tree
```

### parser
This function is the main powerhouse of this library. You just need to call it with the text that you'd like converted.

```js
import { parser, createSimpleTag } from 'shortcode-to-tree';

const input = 'Hello [b]World![/b]';

const tree = parser(input, {
  b: createSimpleTag('b'),
});

console.log(JSON.stringify(tree, null, 2));

/*
{
  "type": "element",
  "name": "root",
  "elements": [
    {
      "type": "text",
      "text": "Hello "
    },
    {
      "type": "element",
      "name": "b",
      "elements": [
        {
          "type": "text",
          "text": "World!"
        }
      ]
    }
  ]
}
*/
```

You will notice in the output above that there is this magic `root` element. All trees need roots; and the parser automatically wraps your input shortcode for you (unless you provide one).

Custom shortcodes can also be provided. The two helper functions `createSimpleTag` & `createAttributeTag` will aid you in this.
To utlise these in the parser you can provide as hashmap of them to the parser:

```js
import { parser, createAttributeTag } from 'shortcode-to-tree';

const input = 'Hello [foo bar="baz"]World![/foo]';

const tree = parser(input, {
  foo: createAttributeTag('foo'),
});

console.log(JSON.stringify(tree, null, 2));

/*
{
  "type": "element",
  "name": "root",
  "elements": [
    {
      "type": "text",
      "text": "Hello "
    },
    {
      "type": "element",
      "name": "foo",
      "attributes": {
        "bar": "baz"
      },
      "elements": [
        {
          "type": "text",
          "text": "World!"
        }
      ]
    }
  ]
}
*/
```

Above you will now notice that the attributes for that shortcode have been supplied via the `attributes` key on a given element.

### createSimpleTag

This shortcode handler is for tags which do not support attributes, such as `[b]` or `[i]`.

```js
import { parser, createSimpleTag } from 'shortcode-to-tree';

const tags = {
  foo: createSimpleTag('foo'),
};

const input = 'Hello [foo bar="baz"]World![/foo]';

const tree = parser(input, {
  foo: createAttributeTag('foo'),
});

console.log(JSON.stringify(tree, null, 2));

/*
{
  "type": "element",
  "name": "root",
  "elements": [
    {
      "type": "text",
      "text": "Hello "
    },
    {
      "type": "element",
      "name": "foo",
      "elements": [
        {
          "type": "text",
          "text": "World!"
        }
      ]
    }
  ]
}
*/
```

### createAttributeTag

As shown above this is for shortcodes which require attribute support. All attributes are treated as strings.

```js
import { parser, createAttributeTag } from 'shortcode-to-tree';

const tags = {
  foo: createAttributeTag('foo'),
};

const input = 'Hello [foo bar="baz"]World![/foo]';

const tree = parser(input, {
  foo: createAttributeTag('foo'),
});


console.log(JSON.stringify(tree, null, 2));

/*
{
  "type": "element",
  "name": "root",
  "elements": [
    {
      "type": "text",
      "text": "Hello "
    },
    {
      "type": "element",
      "name": "foo",
      "attributes": {
        "bar": "baz"
      },
      "elements": [
        {
          "type": "text",
          "text": "World!"
        }
      ]
    }
  ]
}
*/
```

## Default tags

This package exposes several pre-configured tags. These can be imported and used like so:

```js
import { defaultTags, parser } from 'shortcode-to-tree';

const tree = parser(input, defaultTags);

```

If you want to add more tags on top of this you can just merge the default tags into your custom tags:

```js
import { defaultTags, createSimpleTag, parser } from 'shortcode-to-tree';

const tags = {
  ...defaultTags,
  foo: createSimpleTag('foo'),
}

const tree = parser(input, tags);

```

The default tags are:

* `b` (simple tag)
* `i` (simple tag)
