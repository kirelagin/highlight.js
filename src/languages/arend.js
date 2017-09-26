/*
Language: Arend
Author: JetBrains s.r.o
Website: http://arend.top/
Category: functional
*/

function(hljs) {
  var RE_LEXEMES = /\\?[a-zA-Z0-9-]+|[^\w\s]+/;

  var PARENS = {
    variants: [
      {begin: /\(/, end: /\)/},
      {begin: /\{/, end: /\}/},
    ],
    contains: ['self'],
  }

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

  var DEF_TELE = function(kw) {
    return {
      className: 'keyword',
      begin: '\\\\' + kw, end: /\s+/,
      excludeEnd: true,
      starts:
      {
        className: 'title',
        begin: /[\S]+/, end: /[\s]+/,
        excludeEnd: true,
        starts: {
          className: 'test',
          end: /\s*(=>|\|)/,
          returnEnd: true,
          contains:
          [
            {
              className: 'params',
              variants: [
                {begin: /\(/, end: /\)/},
                {begin: /\{/, end: /\}/},
              ],
              lexemes: RE_LEXEMES,
              contains: [PARENS],
            },
            {
              className: 'type',
              begin: /:\s*/,
              excludeBegin: true,
              endsWithParent: true,
              excludeEnd: true,
            }
          ]
        }
      }
    };
  };

  var DEF_NAMED = function(kw) {
    return {
      className: 'keyword',
      begin: '\\\\' + kw, end: /\s+/,
      excludeEnd: true,
      starts: {
        className: 'title',
        begin: /[\S]+/, end: /[\s]+/,
        excludeEnd: true,
      }
    };
  };

  return {
    aliases: ['vclang'],
    lexemes: RE_LEXEMES,
    keywords: {
      keyword:
        '=> -> : | ' +
        '\\lp \\lh \\levels \\suc \\max ' +
        //'\\Pi \\Sigma \\lam \\new ' +
        '\\let \\in \\case ' +
        '\\elim \\with ' +
        '\\infix \\infixl \\infixr ' +
        '\\default \\truncated ' +
        '\\open \\export \\hiding ' +
        '\\where',
     built_in:
        'Nat zero suc ' +
        'I left right ' +
        'Path path = @ coe iso ' +
        'TrP inP truncP ' +
        'TrS inS truncS ',
      symbol: '{?}'
    },
    contains:
    [
      DEF_TELE('function'),
      DEF_TELE('data'),
      DEF_TELE('instance'),
      DEF_NAMED('class'),
      DEF_NAMED('view'),

      hljs.NUMBER_MODE,

      COMMENT
    ]
  };
}
