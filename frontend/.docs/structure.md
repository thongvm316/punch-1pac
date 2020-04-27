## Front-end structure

```
|- build/ __________________________ # setup bundler
|
|- config/ _________________________ # init setting support for bundler setup
|
|- src/ ____________________________ # source folder
|   |- assets/ _____________________ # static file
|   |- authorization/ ______________ # user's privilege
|   |- components/ _________________ # punch components
|   |- config/ _____________________ # punch config global
|   |- filters/ ____________________ # setup vue filters
|   |- layouts/ ____________________ # punch layouts
|   |- locale/ _____________________ # store all i18n locale
|   |- mixins/ _____________________ # vue mixins
|         |- global/ _______________ # global mixins
|         |- *.js __________________ # local mixins
|
|   |- moment/ _____________________ # setup moment js
|   |- pages/ ______________________ # punch screens
|   |- punch-ui/ ___________________ # punch UI
|   |- repository/ _________________ # handle all api caller
|   |- router/ _____________________ # setup punch router
|   |- scss/ _______________________ # scss files
|   |- store/ ______________________ # vuex store management
|   |- validations/ ________________ # handle all form validations
|   |- App.vue _____________________ # handle punch setup vue file
|   |- main.dev.js _________________ # bundler entry in mode: development
|   |- main.js _____________________ # bundler entry in mode: production
|
|- static/ _________________________ # static file
|
|- test/ ___________________________ # store unit + end-2-end test
```
