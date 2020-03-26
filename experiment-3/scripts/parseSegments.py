import json

from jsonpath_ng import jsonpath, parse

#json_string = '{"palette":[{"color": "red", "value": "#f00"}]}'
json_string = '[{"color": "red", "value": "#f00"}]'
json_data = json.loads(json_string)
json_array = json.loads(json_string)
items_list = []

for item in json_array:
    counter = 0
    item_details = {"color":None, "value":None}#intializing item_details
    print (counter)
    item_details['counter'] = counter
    item_details['color'] = item['color']
    item_details['value'] = item['value']
    items_list.append(item_details)
print (items_list)
#jsonpath_expression = parse('$.id')

#match = jsonpath_expression.find(json_data)

#print(match)
#print("id value is", match[0].value)