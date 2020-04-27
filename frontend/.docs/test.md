## Styleguide for unit-testing && snapshot testing

## Requirement
* [vue-test-utils](https://vue-test-utils.vuejs.org/)
* [jest](https://jestjs.io/docs/en/getting-started)

## Store
``` bash
# config jest
test/unit/jest.{conf|init|setup}.js

# support fixtures data + local vue instance
test/unit/specs/supports

# unit testing for each modules
test/unit/specs/{authorization|components|layouts|pages|stores}
```

## Run test
``` bash
# Running single file
yarn run test:unit <path to file or folder>

# Watching file or folder
yarn run test:unit <path to file or folder> -w

# Running all test
yarn run test:unit
```

## Snapshot testing
### Why
```
Using snapshot testing for make sure:
* Render correct vue instance when mouted
* Watching data / prop / computed changed all the times
* Reduce time for testing on real-DOM
```

### When
```
Using snapshot testing on vue-instance when:
* Mouted
* Props data / computed / methods impact to DOM change
```

### Supporter
```
jest-serializer-vue
```

## Unit testing
### Why
```
Make sure all methods running correctly
```

### Supporter
```
jest
```
