## Setup & Dependencies

install dependencies:
`brew install node`

setup:
  git clone https://github.com/sixgill/sense-docs
  cd sense-docs
  npm install
  npm start
  open http://localhost:8000

## Guides

All markdown files for guies are located `/guides`

Inside guides you will see a few folders which start with (001-,002, ...)
The reason for the prefix numbers is to ensure order you want guides, e.g 000 will be the first guide in the menu.
Thats all the number prefix is meant to do, the same for the files inside the folders.

Its just regular markdown, there is only a few additions

###FrontMatter
Which can be use to give a folder its name, or control where the page is located, also used to generate the menu.
```
---
title: Overview
date: "2015-05-01T22:12:03.284Z"
description: "Sub title"
---
```

see https://jekyllrb.com/docs/frontmatter/

###Code examples
For curl examples you can wrap it in ```\`\`\`curl request``` if you want interactive examples.
We can easy enable Copy/Execute btns. This is more for future usecases. So feel free to use or not.

```
\`\`\`curl request
curl -X POST https://sense-api.sixgill.com/v2/login -H 'content-type: application/json' -d '{
    "email":"lspears@sixgill.com",
    "password":"password1"
}'
\`\`\`
```


##Openapi

The Api documentation can be located in the `/openapi` folder.
There should be 2 json files that contain openapi definitions to describe the apis.
You can read more about the openapi here https://swagger.io/specification/
For editing you can use the https://editor.swagger.io/ copy paste the json file into it.