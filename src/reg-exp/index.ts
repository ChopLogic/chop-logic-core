const onlyLatinLetters = /^[a-zA-Z]+$/;

const fileName = /^[\w\-. ]+$/;

const xmlDeclaration = /<\?xml.*?\?>/;

export const regularExpressions = Object.freeze({
  onlyLatinLetters,
  fileName,
  xmlDeclaration,
});
