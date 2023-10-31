# HotelHaven MERN Stack Website.

## [Frontend](https://github.com/sheik-mostafizur/hotel-haven-frontend.git)

## [Backend](https://github.com/sheik-mostafizur/hotel-haven-backend.git)

## Our directory structure

```
.
├── 📁config
│   └── 📜db.js
├── 📁constants
│   ├── 📜gender.js
│   ├── 📜role.js
│   └── 📜status.js
├── 📁controllers
│   ├── 📁admin
│   │   ├── 📜hotel-controller.js
│   │   └── 📜user-controller.js
│   ├── 📁auth
│   │   ├── 📜login-controller.js
│   │   └── 📜register-controller.js
│   └── 📁manager
│       ├── 📜hotel-controller.js
│       └── 📜room-controller.js
├── 📁middlewares
│   ├── 📜authenticate.js
│   ├── 📜isAdmin.js
│   └── 📜isManager.js
├── 📁models
│   ├── 📜Hotel.js
│   ├── 📜Room.js
│   └── 📜User.js
├── 📁routes
│   ├── 📁admin
│   │   ├── 📜hotel.js
│   │   ├── 📜index.js
│   │   └── 📜user.js
│   ├── 📁auth
│   │   └── 📜index.js
│   ├── 📜index.js
│   ├── 📁manager
│   │   ├── 📜hotel.js
│   │   ├── 📜index.js
│   │   └── 📜room.js
│   └── 📜user.js
├── 📁utils
│   ├── 📜isArrayEmpty.js
│   ├── 📜isFieldsRequired.js
│   ├── 📜isObjectEmpty.js
│   └── 📜throwError.js
├── 📜.env
├── 📜index.js
├── 📜package.json
├── 📜package-lock.json
├── 📜README.md
└── 📜vercel.json

```
