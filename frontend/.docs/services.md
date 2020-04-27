## Repository pattern

### Inspiration
* Seperate Resful Api
* Easy for management
* Easey for mocking & testing

### Structure
```
|- repository
|   |- config/api-caller ___________________ # setup apiCaller method
|   |- activities.js _______________________ # activities repository
|   |- annoucements.js _____________________ # annoucements repository
|   |- ...
|
|   |- index.js ____________________________ # Repositories Factory

```

### Supporter
* [Immuatable js](https://immutable-js.github.io/immutable-js/)
