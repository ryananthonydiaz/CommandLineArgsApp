const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
	return 'Your Notes....';
};

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNote = notes.find(note => note.title === title);

	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body,
		});
		saveNotes(notes);
		console.log('New note added!');
	} else {
		console.log('Note title taken!');
	}
};

const saveNotes = notes => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (e) {
		return [];
	}
};

const removeNote = title => {
	const notes = loadNotes();
	const notesToKeep = notes.filter(note => {
		return note.title !== title;
	});

	if (notes.length > notesToKeep.length) {
		console.log(chalk.white.bgGreen(`NOTE REMOVED!`));
		saveNotes(notesToKeep);
	} else {
		console.log(chalk.white.bgRed('No Note FOUND!'));
	}
};

const listNotes = () => {
	const notes = loadNotes();
	console.log(chalk.inverse('Your notes'));

	notes.forEach(note => {
		console.log(note.title);
	});
};

module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
};
