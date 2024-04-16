from models.destination import Destination

from sklearn.preprocessing import normalize
import numpy as np
import faiss

import logging


logger = logging.getLogger(__name__)

index_file_path = 'faiss_index.bin'
index = faiss.read_index(index_file_path)

def preferences_to_weighted_scores(preferences, labels):
    label_indices = {label: i for i, label in enumerate(labels)}
    weights = np.zeros(len(labels))
    for pref in preferences:
        if pref in label_indices:  # validate pref in flask app
            weights[label_indices[pref]] += 1  # Increment weight for each occurrence
    return weights


def get_recommendations(prefs):
    num_prefs = len(prefs)
    prefs_names = [pref["destination_name"] for pref in prefs]
    logger.info(f"pref names of user {prefs_names}")

    user_preferences = {
        'destination_type': [],
        'activities': []
    }
    for pref in prefs:
        for destination_type in pref["destination_type"]:
            user_preferences["destination_type"].append(destination_type)
        for activity in pref["activities"]:
            user_preferences["activities"].append(activity)
    
    unique_labels = Destination.get_unique_labels()

    place_type_weights = preferences_to_weighted_scores(user_preferences['destination_type'], unique_labels["unique_destination_types"])
    activities_weights = preferences_to_weighted_scores(user_preferences['activities'], unique_labels["unique_activities"])

    combined_weights = np.hstack((place_type_weights, activities_weights))
    combined_weights_normalized = normalize(combined_weights.reshape(1, -1), norm='l1')

    k = 6 + num_prefs # Number of nearest neighbors to find
    D, I = index.search(combined_weights_normalized.astype(np.float32), k)  # returns distances(sorted ascending) and indices of the destinations
    logger.info(f"indices found: {I}")
    data = []
    for i in I[0]:
        result = Destination.find_by_index(int(i))
        logger.info(result["destination_name"])
        if result["destination_name"][0] in prefs_names:
            continue
        data.append({
            "destination_name": result["destination_name"],
            "destination_type": result["destination_type"],
            "activities": result["activities"]
        })
    data = data[:5]
    return data