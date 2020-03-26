import json
from pprint import pprint 
from jsonpath_ng import jsonpath, parse

#Read in data file
with open('../input/colorArray.json', 'r') as data_file:
    json_data = json.loads(data_file.read())
#Create Array for items in json_date
items_list = []

#Set Counter - for loop should be updated
counter = -1
itemcount = len(json_data)

for item in json_data:
    counter = counter + 1
    item_details = {"color":None, "value":None}#intializing item_details
    item_details['counter'] = counter
    item_details['color'] = item['color']
    item_details['value'] = item['value']
    items_list.append(item_details)
pprint (items_list)
#jsonpath_expression = parse('$.id')

#match = jsonpath_expression.find(json_data)

#print(match)
#print("id value is", match[0].value)