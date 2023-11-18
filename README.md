# How to mess up with JWT's - a practitioner's guide

JSON Web Tokens are everywhere - you are using a bunch of them right now. It's such a common technology, yet, it's very easy to get them wrong. In this session, we get to the nitty gritty of JWT's - what they are, how they work, and how to make sure that we haven't made an app that just waits to be hacked. The session's goal is to make developers aware of the pitfalls accompanying JWT's by telling some personal stories of cases where JWT's were used improperly. In my experience, such improper usage is extremely commonplace and JWT's are associated with magical thinking, i.e. "I'm using JWT's and I'm secure" The key take-away of the talk should be that JWT's are a great tool that should be used carefully, with full understanding of what it can and cannot do.

## Slides

[Slides](https://speakerdeck.com/sweko/how-to-mess-up-with-jwts-a-practitioners-guide)

## What is a JWT?

JWT or JSON Web Tokens (nobody knows how to pronounce the abreviation) are a somewhat-standard way for representing claims securely between two parties. This means that they are often used as a way to authenticate users between a client and a server - we don't really need to send a username and password with every request, we can just send a token that says "I'm logged in as user X" and the server can trust that token.

Let's see a typical scenario where a JWT is used:

```
title Generating and Using a JWT

actor Client
materialdesignicons F048B Server

Client->Server:<align:center>Here are my username and password,\nplease log me in
note over Server:<align:center>Everything looks good,\nlogging you in,\ndoing server things
Server->Client:Here is a JWT, you are now logged in
note over Client: <align:center>I'll keep and \ncherish this JWT

Client->Server:<align:center>Hey, I need this thing you serve\nhere's that JWT you gave me
note over Server: JWT checks out, I know you
Server->Client: Here's the data you requested, sir
```

![Generating and Using a JWT](./docs/generating-using-jwt.png)

The JWT is a string that is generated by the server and sent to the client. The client then sends the JWT with every request to the server. The server can then check the JWT and see if it's valid. If it is, the server can trust that the client is who they say they are.

## What's in a JWT?

A JWT is a string that is made up of three parts, separated by a dot (`.`). The three parts are:

1. Header
2. Payload
3. Signature

The header and payload are JSON objects that are base64 encoded. The signature is a hash of the header and payload, signed with a secret key. The secret key is only known to the server, so the server can verify that the signature is correct.

Let's see an example of a JWT:

```
eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJzaG91bGQtYmUtYW4tdXJsIiwic3ViIjoiVXNlcklELTEyMyIsImF1ZCI6ImF1ZGllbmNlIiwiZXhwIjoxNjk4NzYxNDY1LCJpYXQiOjE2OTcyMDYyNjUsImFkbWluIjp0cnVlLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIn0.
```

This is an unsigned JWT. It's missing the signature, so only somewhat valid. Let's see what's inside the header:

```json
{
  "alg": "none",
  "typ": "JWT"
}
```

The header is a JSON object that contains two fields:

- `alg` - the algorithm used to sign the JWT. In this case, it's `none`, which means that the JWT is not signed.
- `typ` - the type of the token. In this case, it's `JWT`.

The payload is a JSON object that contains the claims. Claims are statements about the user. There are basically two types of claims:

- Registered claims - these are claims that are defined in the JWT standard. They are not required, but they are recommended. They are:

  - `iss` - the issuer of the token. This is usually the URL of the server that generated the token.
  - `sub` - the subject of the token. This is usually the ID of the user that the token represents.
  - `aud` - the audience of the token. This is usually the URL of the server that the token is intended for.
  - `exp` - the expiration time of the token. This is usually a timestamp that says when the token expires.
  - `nbf` - the not before time of the token. This is usually a timestamp that says when the token becomes valid.
  - `iat` - the issued at time of the token. This is usually a timestamp that says when the token was issued.
  - `jti` - the JWT ID of the token. This is usually a unique identifier for the token.

- Public claims - these are claims that are defined by the application. They are not required, but they are recommended. They can be anything, but it's recommended to use namespaced names, like `app:username` or `app:role`. That said, as long as the names don't clash with the registered claims, they can be anything.

Let's see what's inside our payload:

```json
{
  "iss": "should-be-an-url",
  "sub": "UserID-123",
  "aud": "audience",
  "exp": 1698761465,
  "iat": 1697206265,
  "admin": true,
  "username": "johndoe",
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

Now, let's see a fully signed JWT:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzaG91bGQtYmUtYW4tdXJsIiwic3ViIjoiVXNlcklELTEyMyIsImF1ZCI6ImF1ZGllbmNlIiwiZXhwIjoxNjk4NzYxNDY1LCJpYXQiOjE2OTcyMDYyNjUsImFkbWluIjp0cnVlLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIn0.Uy8xTGhQSUVzektobXBGenlTOFpIeWZBeldVdC9mRGMrRVhXanR4WSthWT0
```

The signature is the last part of the JWT. It's a hash of the header and payload, signed with a secret key. The secret key is only known to the server, so the server can verify that the signature is correct. However, the signature is not encrypted, so anyone can read the header and payload. This is why it's important to not put any sensitive information in the JWT. If we try to decode the header, we get:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

The algorithm is `HS256`, which means that the signature is a hash of the header and payload, signed with a secret key using the SHA256 algorithm. The payload is the same as before.

## Putting sensitive data inside the JWT

As we've seen, the JWT is not encrypted, so anyone can read the header and payload. This means that we should not put any sensitive data inside the JWT. However, it's very tempting to put some sensitive data inside the JWT. For example, we might want to put the user's email address inside the JWT. This way, we don't need to make an extra request to the database to get the user's email address. We can just read it from the JWT. This is a bad idea, because anyone can read the JWT and get the user's email address. This is a violation of the user's privacy.

Remember, JWT's are NOT magic. They are just a way to send data between two parties. They are not a way to magically make data secure. If you put sensitive data inside the JWT, anyone can read it. The following token:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzaG91bGQtYmUtYW4tdXJsIiwic3ViIjoiVXNlcklELTEyMyIsImF1ZCI6ImF1ZGllbmNlIiwiZXhwIjoxNjk4NzYxNDY1LCJpYXQiOjE2OTcyMDYyNjUsImFkbWluIjp0cnVlLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOiJteS1wYXNzd29yZCIsImNyZWRpdENhcmQiOiIxMjM0IDU2NzggOTAxMiAzNDU2Iiwic3NuIjoiMTIzLTQ1LTY3ODkiLCJwaG9uZSI6IisxIDIzNCA1NjcgODkwMSIsImFkZHJlc3MiOiIxMjMgTWFpbiBTdCwgQW55dG93biwgVVNBIiwiZG9iIjoiMTk3MC0wMS0wMSIsImVtYmFycmFzc2luZyI6IkkgbGlrZSB0byB3YXRjaCBUaGUgQmFjaGVsb3IifQ.TktjSnhSODhmOU1zVkJnY3NBQ2dnTW5SSjZ4UkpNUnR5UVdOZkdxcWxtUT0
```

is signed, but the payload can be decoded to

```json
{
  "iss": "should-be-an-url",
  "sub": "UserID-123",
  "aud": "audience",
  "exp": 1698761465,
  "iat": 1697206265,
  "admin": true,
  "username": "johndoe",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "my-password",
  "creditCard": "1234 5678 9012 3456",
  "ssn": "123-45-6789",
  "phone": "+1 234 567 8901",
  "address": "123 Main St, Anytown, USA",
  "dob": "1970-01-01",
  "embarrassing": "I like to watch The Bachelor"
}
```

It's plain that the user's privacy is violated here. Anyone can read the user's email address, password, credit card number, social security number, phone number, address, date of birth, and even their embarrassing secret. This is a bad idea. Don't do this. Don't put sensitive data inside the JWT. Don't do it. JWT's are not magic.

## Failing to verify the signature

JWT's are signed with a secret key. This means that the server can verify that the JWT is valid. However, this means that the server needs to have the secret key and actually use it to verify the JWT. This can be cryptographically expensive, so many times, the server just assumes that the JWT is valid. This is a bad idea. Don't do this. Don't do it. JWT's are not magic.

There's also the possibility that there actually is code that will verify the JWT, but because of some bad code practicess, the code is just never called. This has been encountered in large and complicated code bases, where it's not immediately obvious and straightforward how the code works. Oftentimes, this section is also using unit testing, but the specific scenarios where the JWT is invalid are not tested. This is a bad idea. Don't do this. Don't do it. JWT's are not magic.

## Validating the signature badly

// TODO

