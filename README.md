# gulp-potomo

A Gulp plugin to compile .po files into binary .mo files written in JavaScript only.

---

## Requirements
* This plugin requires Gulp


## Install

```shell
npm install --save-dev gulp-potomo-js
```


## Usage

```js
const gulp = require('gulp');
const poToMo = require('gulp-potomo-js');

gulp.task('default', () =>
	gulp.src('src/languages/*.po')
		.pipe(poToMo())
		.pipe(gulp.dest('dist/languages'))
);
```


### Options

#### options.verbose
Type: `Boolean`  
Default: `true`

Console message to be shown


## License

MIT © [wunderfarm](https://www.wunderfarm.com)
