# hello-worst
The worst implementation ever, inspired by https://github.com/Zerthox/hello-worst

# how 2 use lol
`check("text")` : will generate a string with the length of the text you provided, until it matches.

`check("text", 0.5)` : will generate the string with length, and will check for similarity above 0.5,

`check("text", 0.5, 13)` : will generate a string with the length of 13 until ti contains "text", and will check for similarity above 0.5

`check("text", 0.5, 13, true)` : will generate a string with the length of 13 until it contains "text", check for similarity above 0.5, and is case sensitive.


# optional stuff you can do
`node index.js texttogenerate` : will generate the text you provided in cmd

`node index.js texttogenerate output2.txt` : will generate the text you provided in first arg and output to text file which is in second arg


all similarities will output to similarities.txt
