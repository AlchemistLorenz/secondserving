import pickle
import json as j 
import textblob as t
import requests as req
from dotenv import dotenv_values as dv, load_dotenv as lv

# Attempts to open saved Dictionary
with open(
    ''
    , 'rb') as file:  result_dict = pickle.load(file)
print(result_dict)

# Should be replaces with absolute path of the .env file
# pathToENV = 

# Spell checks each item in the list, if we don't get a hit, then we place it in a separate list that 
# will be feed to a ML model as a last hail mary
def itemToAPI(convert:list):
    for position in range(len(convert)):
        testStr = convert[position].lower()
        try:
            res = result_dict[testStr]
            convert[position] = ','.join(res)
        except KeyError:
            # Under Development but will be used to try and match to a key in the known dictionary
            testStr2 = str(t.TextBlob(testStr).correct())
            print(testStr2)
        except Exception as e:
            print(f"Other Error {e}")     
    return convert


# Turns items in the item JSON body to list for easier lookup of what they want
def handleItems(incomingData:j):
    categoryPortion = "places?categories="
    tempList = incomingData["item"] 
    r = [item.strip() for item in tempList.split(',')]
    if len(r) == 0: return 
    else:
        itemToAPI(r)
        for _ in r:
            categoryPortion += str(_)
            categoryPortion += ","
        categoryPortion = categoryPortion.rstrip(",")
        return categoryPortion

# Defaults to Lakewood, CO. Under development to get user's location
def handleLocation():
    return "&filter=circle:-105.101929,40.167206,5000"

# Actually constructs the url and makes a GET request to GEOAPIFY
def searchNearby(data:j):
    lv(pathToENV); g = dv(pathToENV); k = g.items()
    if len(k) == 0:
        print("Nothing found")
    else:
        reqUrl = g.get("geoAPI", "Nothing found")
        reqUrl += handleItems(data)
        reqUrl += handleLocation()
        reqUrl += "&apiKey="
        reqUrl += g.get("serverURLKey", "KEY NOT FOUND")
        # print(reqUrl)
        w = req.get(reqUrl); w.raise_for_status(); print(w.text)
        
    return  print(data["item"])
