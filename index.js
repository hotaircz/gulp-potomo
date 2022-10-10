const path = require('path')
const log = require('fancy-log')
const PluginError = require('plugin-error')
const through = require('through2-concurrent')
const chalk = require('chalk')
const plur = require('plur')
const gettextParser = require('gettext-parser')

const PLUGIN_NAME = 'gulp-compile-translation-files'

module.exports = (opts) => {

  const validExts = ['.po']

	opts = Object.assign({
		verbose: process.argv.indexOf('--verbose') !== -1
	}, opts)

  let totalFiles = 0;

	return through.obj({
		maxConcurrency: 8
	}, (file, enc, cb) => {

		if (file.isNull()) {
			cb(null, file)
			return
		}

		if (file.isStream()) {
			return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'))
		}

		if (validExts.indexOf(path.extname(file.path).toLowerCase()) === -1) {

      if (opts.verbose) {
				log(`${PLUGIN_NAME}: Skipping unsupported file ${chalk.blue(file.relative)}`)
			}

			return cb(null, file)
		}

    if (opts.verbose) {
      log(`${PLUGIN_NAME}: Compiling file ${file.relative}`)
    }

		const data = gettextParser.po.parse(file.contents)
    const output = gettextParser.mo.compile(data)

    file.contents = output
    file.path = file.path.replace(/\.[^/.]+$/, '.mo')

    totalFiles++

    if (opts.verbose) {
    	log(PLUGIN_NAME + ':', chalk.green('✔ ') + file.relative + chalk.gray(` successfully compiled`));
    }
    cb(null, file)

	}, cb => {

    		if (opts.verbose) {
			let msg = `Compiled ${totalFiles} translation ${plur('file', totalFiles)}`

			log(PLUGIN_NAME + ':', msg)
		}
		cb()

	})

}
