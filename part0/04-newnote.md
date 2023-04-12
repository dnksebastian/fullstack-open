sequenceDiagram
    participant browser
    participant server


    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate browser
    browser-->server: New note HTML document
    deactivate browser

    Note right of browser: Browser submits input value to the server by sending HTTP POST request to /new_note URL. Server responds with status code 302 (redirect).

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: Browser receives HTML document (content and structure)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: Browser receives css styles
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: Browser receives JS file
    deactivate server

    Note right of browser: Browser executes the script which makes an HTTP GET request to receive JSON file with notes


    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON file with array of 100 note objects (content and date) is receives.
    deactivate server

    Note right of browser: Browser executes function which renders elements populated with JSON data

    browser->>server: GET https://studies.cs.helsinki.fi/favicon.ico
    activate server
    server-->>browser: Favicon received
    deactivate server