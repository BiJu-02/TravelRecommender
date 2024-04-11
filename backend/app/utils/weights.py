import numpy as np

def preferences_to_weighted_scores(preferences, labels):
    label_indices = {label: i for i, label in enumerate(labels)}
    weights = np.zeros(len(labels))
    for pref in preferences:
        if pref in label_indices:  # validate pref in flask app
            weights[label_indices[pref]] += 1  # Increment weight for each occurrence
    return weights