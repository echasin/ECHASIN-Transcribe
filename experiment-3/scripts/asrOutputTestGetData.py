import json
import requests
import pandas
from pprint import pprint 
from jsonpath_ng import jsonpath, parse
from pandas.io.json import json_normalize
# from pandas import json_normalize 

#Read in data file
with open('../input/asrOutputTest.json', 'r') as data_file:
    json_data = json.loads(data_file.read())

#Get  Json Data by element
jobName  = json_data['jobName']
accountId =json_data['accountId']
segments = json_data['results']['segments']
segmentStartTime = json_data['results']['segments'][0]['start_time']
segmentEndTime = json_data['results']['segments'][0]['end_time']
segmentsAlternatives = json_data['results']['segments'][0]['alternatives'][0]#Segment0.Alternative[0]
segmentsAlternativesItems = json_data['results']['segments'][0]['alternatives'][0]['items']#Segment0.Alternative[0].items
segmentsAlternativesItemsCount = len(json_data['results']['segments'][0]['alternatives'][0]['items'])
#print (jobName)
#print (accountId)
#print (segmentStartTime)
#print (print (segments))
#print (segmentsAlternatives)
#print (segmentsAlternativesItems)
#print (segmentsAlternativesItemsCount)

# Initialize array
output_array  = []

# Grabbing all the start times in the segments and appending them to a list
segmentCount = -1
for segment in range(len(json_data['results']['segments'])):
    segmentCount = segmentCount +1
    
    itemCount = -1
    for item  in range(len(json_data['results']['segments'][segment]['alternatives'][0]['items'])):
        itemCount = itemCount + 1
        print (
        segmentCount,
        json_data['results']['segments'][segment]['start_time'],
        json_data['results']['segments'][segment]['end_time'],
        json_data['results']['segments'][segment]['alternatives'][0]['transcript'],
        itemCount,
        json_data['results']['segments'][segment]['alternatives'][0]['items'][item]['confidence'] )

        output_array.append(segmentCount)
        output_array.append(json_data['results']['segments'][segment]['start_time'])
        output_array.append(json_data['results']['segments'][segment]['end_time'])
        output_array.append(itemCount)
        output_array.append( json_data['results']['segments'][segment]['alternatives'][0]['transcript'])
        output_array.append( json_data['results']['segments'][segment]['alternatives'][0]['items'][item]['confidence'])


json_output = [{"Segment": z, "Start": z, "End": z, "Content": z, "item": z, "?": z} for z in zip(output_array)]


output=json_normalize(json_output)
print(output)

#Print output_array
# pprint (output_array)

#Populate Dataframe
#df_output_array = pandas.DataFrame(output_array)
#pprint (df_output_array)

#Populate Dataframe
#df_output_array.to_csv(r'../output/asrOutputTest.csv', index = False)

#Normalize output_array
#output_array_normalized = json_normalize(output_array)
## print(output_array_normalized)

#print ('segmentCount: ', segmentCount,'start_time: ',json_data['results']['segments'][segment]['start_time'],'end_time: ',json_data['results']['segments'][segment]['end_time'],'items:', json_data['results']['segments'][segment]['alternatives'][0]['items']        )
    #print ('start_time: ',json_data['results']['segments'][segment]['start_time'])







