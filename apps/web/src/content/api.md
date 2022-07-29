# Using the API
---

## Authentication

To authenticate include the API key in  the Authorization header
```
    Authorization: APIKey eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

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
| | If left empty password won't be required to request paste.
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
| | One of supported syntaxes (<a href="https://prismjs.com/#supported-languages" target="_blank">check here</a>).
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

