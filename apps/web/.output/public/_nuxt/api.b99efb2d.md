# Using the API
---

## Authentication and authorization

To get a permanent Api key  log into your Quickpaste account, then go to `Settings > Generate Api Key` and click `Genereate Api Key`.

<br>

To authenticate when using the API include the API key in the `Authorization` header
```text
    Authorization: ApiKey eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

<br>

For password protected pastes use `Paste-Authorization` header to send the required password:
```text
    Paste-Authorization: sOme PaSSword1
```

<br>

## Limits

Guest users are limited to **3 daily pastes** and only **5 paste fragments** per paste.
Logged in users have **30 daily pastes** with a limit of **500 paste fragments**.

Each paste will be deleted after **1 month** on no activity (will not be viewed/modified).

<br>

## Paste format

Paste format used when **sending** paste to API
| | |
|-|-|
|`title`|Type: `string`|
| | Length: 1-50 characters
| | *Required*
|`fragments`|Type: `array`|
| | Array of [paste fragments](#paste-fragment).
| | Min. length: 1
| | *Required*
|`isPrivate`|Type: `boolean`|
| | Default: `false`|
| | *Optional*
|`password`|Type: `string`|
| | Content of password protected pastes is encrypted with AES-256. If empty string provided no passowrd is applied
| | *Optional*

```json
    {
        "title": "Test",
        "fragments": [
            {

            }
        ],
        "isPrivate": false,
        "password": ""
    }
```

### Paste fragment

Format for paste fragments.
| | |
|-|-|
|`name`|Type: `string`|
| | Length: 1-50 characters
| | *Required*
|`content`|Type: `string`|
| | Content of paste fragment.
| | *Required*
|`syntax`|Type: `string`|
| | Default: `text`
| | `text` or one of supported syntaxes (<a href="https://prismjs.com/#supported-languages" target="_blank">see here</a>).
| | *Optional*

#### Sample upload ready paste

```json
    {
        "title": "A new post",
        "isPrivate": true,
        "password": "",
        "fragments": [
            {
                "name": "Sample text",
                "syntax": "text",
                "content": "Some sample text like Lorem Ipsum Dolores."
            }
        ]
    }
```

<br>

## Creating a paste

```http 
    POST /api/paste
```
---  

**Request body schema**: [Paste](#paste-format)

**Sample responses:**
- 200
```json
    {
        "ok": true,
        "result": {
            "pasteId": "AabBcCX0"
        }
    }
```

- 403
```json
    {
        "ok": false,
        "result": string
    }
```

<br>

## Getting a paste    

```http 
    GET /api/paste/{id}
```

---

**Path parameters**
- ***id*** - 8 character length alphanumerical string

**Sample responses:**
- 200
```json
    {
        "title": "Sample",
        "fragments": [
            {
                "name": "Sample",
                "syntax": "text",
                "content": "Congratulations!"
            }
        ],
        "isPrivate": false,
        "created": "2022-07-28T11:30:08.572Z",
        "password": false,
        "owner": {
            "id": 0,
            "username": "anonymus"
        }
    }
```

- 403
```json
    {
        "ok": false,
        "result": string
    }
```

- 404
```json
    {
        "ok": false,
        "result": "Resource not found"
    }
```

<br>

## Deleting a paste    

```http 
    DELETE /api/paste/{id}
```

---

**Path parameters**
- ***id*** - 8 character length alphanumerical string

**Sample responses:**
- 200
```json
    {
    "ok": true,
    "result": "Paste deleted"
}
```

- 403
```json
    {
        "ok": false,
        "result": string
    }
```

- 404
```json
    {
        "ok": false,
        "result": "Resource not found"
    }
```

## Editing a paste    

```http 
    PUT /api/paste/{id}
```

---

**Request body schema**: [Paste](#paste-format)

**Path parameters**
- ***id*** - 8 character length alphanumerical string

**Sample responses:**
- 200
```json
    {
        "ok": true,
        "result": {
            "pasteId": "faQSOcNP",
            "message": "Updated paste"
        }
    }
```

- 403
```json
    {
        "ok": false,
        "result": string
    }
```

- 404
```json
    {
        "ok": false,
        "result": "Resource not found"
    }
```

## Getting authenticated users info    

```http 
    GET /api/user
```

---

**Sample responses:**
- 200
```json
    {
        "id": 2,
        "username": "jade",
        "joined": "2022-07-02T21:29:17.045Z"
    }
```

- 403
```json
    {
        "ok": false,
        "result": string
    }
```

## Getting authenticated users pastes

```http 
    GET /api/user/pastes
```

---

**Query parameters**
- ***amount*** - number of pastes to return per page | *Default is 20*, *Optional*
- ***pageId*** - id of page to display (returned from request) | *Optional*

**Sample responses:**
- 200
```json
    {
    "ok": true,
    "result": {
        pastes: [
            {
                "title": "A new post",
                "isPrivate": true,
                "password": false,
                "created": "2022-07-28T11:27:47.580Z",
                "owner": {
                    "username": "reKOmo",
                    "id": 2
                },
                "uuid": "faQSOcNP"
            },
            {
                "title": "e",
                "isPrivate": false,
                "password": false,
                "created": "2022-07-28T11:25:02.333Z",
                "owner": {
                    "username": "reKOmo",
                    "id": 2
                },
                "uuid": "sHFeCQmD"
            }
        ]
    },
    nextPage: 24
}
```

- 403
```json
    {
        "ok": false,
        "result": string
    }
```