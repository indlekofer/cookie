# @indlekofer/cookie

## Usage

```js
import get, { set, unset, getAll } from '@indlekofer/cookie';

get('name'); //-> null
set('name', 'value', 1); //set 'name' with 'value' for 1 day
get('name'); //-> 'value'
set('name2', 'value2'); //set 'name2' with 'value2' for ever
unset('name');
getAll(); //-> {'name2': 'value2'}
```

## Function exports

### set

### get (DEFAULT)

### getAll

### unset
