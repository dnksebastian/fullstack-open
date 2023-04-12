sequenceDiagram
    participant browser
    participant server

    browser->>server POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: POST request with new note as JSON data, content type i application/json
    deactivate server

    Note right of server: Server responds with status code 201 created. Server doesn't ask for redirect so browser stays on the same page and doesn't send additional HTTP requests.