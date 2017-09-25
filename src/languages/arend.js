/*
Language: Arend
Author: JetBrains s.r.o
Website: http://arend.top/
Category: functional
*/

function(hljs) {
  var KEYWORD = {
    className: 'keyword',
    begin: /\\[^\s]+/,
    relevance: 0
  };

  var COMMENT = {
    variants: [
      hljs.COMMENT('--', '$'),
      hljs.COMMENT(
        '{-',
        '-}',
        {
          contains: ['self']
        }
      )
    ]
  };

  return {
    aliases: ['vclang'],
    contains: [
      KEYWORD,
      hljs.NUMBER_MODE,

      COMMENT
    ]
  };
}
