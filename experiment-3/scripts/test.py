# Importing necessary libraries
import csv
import json
import pandas as pd 
from pandas.io.json import json_normalize 

#Segment number, 

#Open and read JSON file
with open('experiment-3/input/asrOutputTest.json') as f:
  data = json.load(f)

# Initializing empty lists
start_time, end_time = [], []

# Grabbing all the start times in the segments and appending them to a list
for i in range(len(data['results']['segments'])):
    # print(data['results']['segments'][i]['start_time'])
    start_time.append(data['results']['segments'][i]['start_time'])


# Grabbing all the end times in the segments and appending them to a list
for i in range(len(data['results']['segments'])):
    # print(data['results']['segments'][i]['end_time'])
     end_time.append(data['results']['segments'][i]['end_time'])

json_output = [{"start_time": t, "end_time": s} for t, s in zip(start_time, end_time)]

output=json_normalize(json_output)
print (output)

output.to_csv(r'experiment-3/output/asrOutputTest.csv', index = False, header=True)
#with open('experiment-3/output/input/asrOutputTest.csv') as csv_file:
    #csv_reader = csv.reader(output, delimiter=',')
    #print (csv_reader)
    #line_count = 0
    #for row in csv_reader:
    #    if line_count == 0:
    #        print(f'Column names are {", ".join(row)}')
    #        line_count += 1
    #    else:
    #        print(f'\t{row[0]} works in the {row[1]} department, and was born in {row[2]}.')
    #        line_count += 1
    #print(f'Processed {line_count} lines.')