# hash-formater
  Separates two inputs (1 for keys and 1 for values) into arrays, and formats them into ruby style hashes.
Aditional options allow for concatenating extra information before, between and after each hash, as well as adding quotes to either keys or values.

## inputs & limits:
  There are two input options, TextBoxes which can only take at max 5k entries each, and .xlsx. If uploading a .xlsx file, you must *mark which collumn contains what by the following header names: keys - values*. For local use, the xlsx input option can generate as many as 1KK (one million) hashes, but for the live version it's safer to keep that number to about 300k.

Live version can be accessed at:
https://hash-maker.herokuapp.com/
