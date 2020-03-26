import json
import requests
from pprint import pprint 
from jsonpath_ng import jsonpath, parse

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

# Grabbing all the start times in the segments and appending them to a list
segmentCount = -1
for segment in range(len(json_data['results']['segments'])):
    segmentCount = segmentCount +1
    
    itemCount = -1
    for items  in range(len(json_data['results']['segments'][segment]['alternatives'][0]['items'])):
        itemCount = itemCount + 1
        print (segmentCount,itemCount)
#print ('segmentCount: ', segmentCount,'start_time: ',json_data['results']['segments'][segment]['start_time'],'end_time: ',json_data['results']['segments'][segment]['end_time'],'items:', json_data['results']['segments'][segment]['alternatives'][0]['items']        )
    #print ('start_time: ',json_data['results']['segments'][segment]['start_time'])







