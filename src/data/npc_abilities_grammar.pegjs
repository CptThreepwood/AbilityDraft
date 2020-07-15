// DOTA2 NPC Abilities Grammar
// ==========================
//
// For parsing npc_abilities.txt data file to extract hero abilities and metadata

Result
  = result:(Line)+ EOF {
    return result.reduce((acc, cur) => {
      acc[cur.key] = cur.value;
      return acc;
    }, {});
  }
  / result:(Object) EOF {
    return { default: result };
  }

Object
  = _ "{" _ lines:(Line*) _ "}" _ {
    return lines.filter(a => a.type == 'Property').reduce(
      (acc, cur) => {
        acc[cur.key] = cur.value;
        return acc;
      }, {}
    );
  }


Line
  = _ key:(String) _ value:(String / Object) _ {
    return {
      type: 'Property',
      key, value
    };
  }
  / comment:Comment {
    return {
      type: 'Comment',
      comment: comment
    };
  }
  
Comment
  = _ "//" comment:([^\n\r]*) [\n\r] {
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

_ "whitespace" = [ \t\n\r]*

EOF = !.