
export default function createSimpleTag(nodeType) {
  return function(opts, content) {
    return `<${nodeType}>${content}</${nodeType}>`;
  }
}