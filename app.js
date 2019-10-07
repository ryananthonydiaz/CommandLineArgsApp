const validator = require('validator');
const yargs = require('yargs');
const chalk = require('chalk');
const notes = require('./notes.js');

//Customize yargs version
yargs.version('1.1.0');

//Create add command
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string',
		},
		body: {
			describe: 'Body of Note',
			demandOption: true,
			type: 'string',
		},
	},
	handler(argv) {
		notes.addNote(argv.title, argv.body);
	},
});

yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string',
		},
	},
	handler(argv) {
		notes.removeNote(argv.title);
	},
});

yargs.command({
	command: 'list',
	describe: 'adding a list',
	handler: function() {
		notes.listNotes();
	},
});

yargs.command({
	command: 'read',
	describe: 'This is to read',
	handler() {
		console.log('Reading a note');
	},
});

yargs.parse();
