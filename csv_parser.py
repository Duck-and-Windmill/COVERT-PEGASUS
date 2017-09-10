import csv
from collections import defaultdict

columns = defaultdict(list) # each value in each column is appended to a list

with open('companylist.csv') as f:
    reader = csv.DictReader(f) # read rows into a dictionary format
    for row in reader: # read a row as {column1: value1, column2: value2,...}
        for (k,v) in row.items(): # go over each column name and value 
            columns[k].append(v) # append the value into the appropriate list
                                 # based on column name k

with open('securities.txt', 'r+') as final_f:
	for i in range(0, len(columns['Symbol'])):
		a_line = '"' + columns['Symbol'][i] + '","' + columns['Name'][i] + '"'

		if(columns['Name'][i][-7:] == ", Inc. " or columns['Name'][i][-7:] == ", Ltd. "): # forgive me father for i have sinned
			a_line += ',"' + columns['Name'][i][0:-7] + '"'								  # i just don't want to learn regex tonight
		elif(columns['Name'][i][-6:] == ", Inc." or columns['Name'][i][-6:] == ", Ltd." or columns['Name'][i][-6:] == " Corp."):
			a_line += ',"' + columns['Name'][i][0:-6] + '"' 
		elif(columns['Name'][i][-5:] == " Inc." or columns['Name'][i][-5:] == " Ltd." or columns['Name'][i][-5:] == " Corp"):
			a_line += ',"' + columns['Name'][i][0:-5] + '"'
		elif(columns['Name'][i][-4:] == " Inc" or columns['Name'][i][-4:] == " Ltd"):
			a_line += ',"' + columns['Name'][i][0:-4]

		print(a_line)
		final_f.write(a_line + '\n')