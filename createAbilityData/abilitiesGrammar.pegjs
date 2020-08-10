// DOTA2 NPC Abilities Grammar
// ==========================
//
// For parsing npc_abilities.txt data file to extract hero abilities and metadata

Result
  = (S N)* result:(Line)+ EOF {
    return result.reduce((acc, cur) => { acc[cur.key] = cur.value; return acc; }, {});
  }

Object
  = "{" End lines:(Line*) (S N)* S "}" {
    return lines.filter(a => a.type != 'Comment').reduce(
    	(acc, cur) => { acc[cur.key] = cur.value; return acc; }, {}
    );
  }

Line
  = S key:String S value:String End { return { type: 'Property', key, value }; }
  / S key:String End S value:Object End { return { type: 'Object', key, value }; }
  / comment:Comment {  return { type: 'Comment', comment: comment }; }


End
  = comment:Comment { return comment; }
  / (S N)* { return null; }

Comment
  = S "//" comment:([^\n\r]*) (S N)+ {
    return comment.join('')
  }

String
  = "\"" string:([^"\\] / Escape)* "\"" {
  	return string.join('')
  }
  
Escape
  = "\\" character:["\\/bfnrt] {
    switch (character) {
      case '"':
      case '\\':
      case '/':
        return character;
      case 'b': return '\b';
      case 'f': return '\f';
      case 'n': return '\n';
      case 'r': return '\r';
      case 't': return '\t';
    }
  }
  / "\\u" codePoint:([0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]) {
    return String.fromCodePoint(parseInt(codePoint.join(''), 16));
  }

_ "any whitespace" = [ \t\n\r]*

S "inline whitespace" = [ \t]*

N "newline" = [\n\r]

EOF = !.
