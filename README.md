# Sophos university 

## Technologies
    1. Nextjs13
    2. Material UI
    3. Tailwind CSS

## Requisites
You need to have the [sophos university API](https://github.com/luisFelipeEvilla/sophos-university-api) running before start this project

## Installation

`npm i`

## Setup

### Enviroment variables
create .env file in the project root directory. Within this file we will setup the API URL. This file should look like this

```
API_BASE_URL=http://127.0.0.1:3000
```

*NOTE:* nodejs don't recognize localhost as a valid url, you should use 127.0.0.1 instead 

# Run
to start the app in development mode, you can run, and it will listen on PORT 3000 for default or the nearest if it its bussy
`npm run start:dev`



