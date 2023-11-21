/* 
how 2 use lol
check("text") will generate a string with the length of the text you provided, until it matches.
check("text", 0.5) will generate the string with length, and will check for similarity above 0.5,
check("text", 0.5, 13) will generate a string with the length of 13 until ti contains "text", and will check for similarity above 0.5
check("text", 0.5, 13, true) will generate a string with the length of 13 until it contains "text", check for similarity above 0.5, and is case sensitive.

optional stuff you can do
node index.js texttogenerate                : will generate the text you provided in cmd
node index.js texttogenerate output2.txt    : will generate the text you provided in first arg and output to text file which is in second arg

all similarities will output to similarities.txt
*/

var textname = 'similarities.txt';

if (process.argv.length > 2) {
	const targetString = process.argv[2];
	if (process.argv[3]) {
		textname = process.argv[3];
	}
	check(targetString);
} else {
	console.log("No argument found.");
	check("hello")
}


function check(targetString, targetSimilarity = 0.68, stringLength = targetString.length, caseSensitive = false) {
	const fs = require('fs');

	function grs(length) {
		const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789!@#";
		let randomString = "";
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * charset.length);
			randomString += charset.charAt(randomIndex);
		}
		return randomString;
	}

	function calculateSimilarity(string1, string2) {
		let similarity = 0;
		for (let i = 0; i < string1.length; i++) {
			const char1 = caseSensitive ? string1.charAt(i) : string1.charAt(i).toLowerCase();
			const char2 = caseSensitive ? string2.charAt(i) : string2.charAt(i).toLowerCase();

			if (char1 === char2) {
				similarity++;
			}
		}
		return similarity / string1.length;
	}

	function checkSimilarity(targetString, generatedString) {
		const similarity = calculateSimilarity(targetString, generatedString);
		return similarity;
	}

	const startTime = new Date();
	let randomString;
	let iterations = 0;

	const outputFile = textname;
	fs.writeFileSync(outputFile, ''); // deletes everything in similarities.txt

	do {
		randomString = grs(stringLength);
		console.log(randomString);
		const similarity = checkSimilarity(targetString, randomString);
		if (similarity >= targetSimilarity) {
			const elapsedTime = new Date() - startTime;
			const hours = Math.floor(elapsedTime / 3600000);
			const minutes = Math.floor((elapsedTime % 3600000) / 60000);
			const seconds = Math.floor((elapsedTime % 60000) / 1000);

			const logMessage = `"${targetString}" similarity found: ${similarity.toFixed(2)}\n${randomString}\nafter ${hours} hours, ${minutes} minutes, ${seconds} seconds and ${(iterations + 1).toLocaleString()} iterations\n\n`;

			console.log(logMessage);
			fs.appendFileSync(outputFile, logMessage);
		}
		iterations++;
	} while (!(caseSensitive ? randomString : randomString.toLowerCase()).includes(caseSensitive ? targetString : targetString.toLowerCase()));

	const endTime = new Date();
	const elapsedTime = endTime - startTime;

	const hours = Math.floor(elapsedTime / 3600000);
	const minutes = Math.floor((elapsedTime % 3600000) / 60000);
	const seconds = Math.floor((elapsedTime % 60000) / 1000);

	console.log(`\nFound it! ${targetString}`);
	console.log(`Iterations: ${iterations.toLocaleString()}`);
	console.log(`Time taken: ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
}

