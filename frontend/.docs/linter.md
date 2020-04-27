## Linter

### VsCode config
```
eslint
stylelint
prettier
```

### Stylelint
#### Extends
extends: [
  'stylelint-config-sass-guidelines'
]
[guideline](https://github.com/bjankord/stylelint-config-sass-guidelines)

#### Usage
``` bash
# Check stylelint
yarn run stylelint-check

# Autofix stylelint
yarn run stylelint-fix
```

#### Rules config
Check here: .stylelintrc.json

### Eslint
#### Extends
extends: [
  'standard',
  'plugin:vue/recommended'
]
[guidelines](https://vuejs.github.io/eslint-plugin-vue/rules/)

#### Usage
``` bash
# Check eslint
yarn run eslint:check

# Autofix eslint
yarn run eslint:fix
```

#### Rules
Check here: .eslintrc.js
