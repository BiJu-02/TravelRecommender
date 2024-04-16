## Backend Flask App

It contains code for flask server with routes, db models and travel recommendation engine.

### Routes
- **Auth Routes:** It contains */login* and */register* routes for user.
- **Travel Routes:** It contains routes for updating (*/update-prefs*) and getting users travel destination preferences (*/get-prefs*) as well as getting travel recommendations (*/recommend*).
- **Destination Routes:** It contains routes for getting destination options for user to input based on what user has typed so far (*/get-dest-name*) while on the home page and also a route for getting the labels destination aspect and activities from the name of the destination (*/get-dest-tags*).

### Models
- **User:** It contains class User and methods for adding user, updating users destination preferences and updating users recommendations.
- **Destinaton:** It contains class Destination and methods for finding the travel destination by index, by name and also for searching destinations that contain the given string. It also has 2 methods for getting all the unique destination type and activities label in the dataset.

### Travel Recommendation Engine
The code for the core recommendation system consists of 2 parts.

1. **recom_engine.py:** It contains the initialization code where the data from the data.json file in /db_init_data directory is loaded, all the labels converted to 1 large binary vector and finally create the index file.
2. **utils/ann.py:** It contains the code for taking in the user's destination preferences, calculating weights for each of these labels, converting it to normalized vector and using it as query vector for searching similar travel destination indices in the index created in the initialization step.