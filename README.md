# README

## Initial Project structure
```
.
├── node_modules
├── source
│   ├── config
│   │   ├── config.ts
│   │   └── logging.ts
│   ├── v1
│   │   ├── company
│   │   │   ├── company_controller.ts
│   │   │   ├── company_interface.ts
│   │   │   ├── company_model.ts
│   │   │   └── company_service.ts
│   │   ├── user
│   │   │   ├── user_controller.ts
│   │   │   ├── user_interface.ts
│   │   │   ├── user_model.ts
│   │   │   └── user_service.ts
│   │   ├── util
│   │   │   └── util_interfaces.ts
│   │   └── v1.ts
│   └── server.ts
├── package-lock.json
└── package.json
```

## Usage
1. Run ```npm install``` to install all dependencies.
2. Replace MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, and MONGO_DATABASE values in config.ts file inside ./source/config with your own MongoDB credentials.
3. Run ```nodemon```.
4. There are 2 example models in this project, i.e. company and user which can be found under ./source/v1. The general CRUD endpoint format is as follows:
    - POST: http://localhost:3003/api/v1/users
    - GET: http://localhost:3003/api/v1/users
    - GET: http://localhost:3003/api/v1/users/:id
    - PUT: http://localhost:3003/api/v1/users/:id
    - DELETE: http://localhost:3003/api/v1/users/:id
