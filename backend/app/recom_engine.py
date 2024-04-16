from sklearn.preprocessing import MultiLabelBinarizer
import numpy as np
import pandas as pd
import faiss
import os
import logging

from models.destination import Destination

logger = logging.getLogger(__name__)

def to_list(comma_separated_string):
    return [item.strip() for item in comma_separated_string.split(',')]

def init_recom_index(data):
    index_file_path = 'faiss_index.bin'

    df = pd.DataFrame(data)

    # Convert the string of labels into lists
    df['destination_type'] = df['destination_type'].apply(to_list)
    df['activities'] = df['activities'].apply(to_list)

    # Initialize and fit MultiLabelBinarizers
    mlb_place_type = MultiLabelBinarizer()
    mlb_activities = MultiLabelBinarizer()

    # Transform labels into one-hot encoded arrays
    place_type_encoded = mlb_place_type.fit_transform(df['destination_type'])
    activities_encoded = mlb_activities.fit_transform(df['activities'])

    output_data = {}
    output_data["unique_destination_types"] = list(mlb_place_type.classes_)
    output_data["unique_activities"] = list(mlb_activities.classes_)

    # place_type_labels = list(mlb_place_type.classes_)
    # activity_labels = list(mlb_activities.classes_)

    if Destination.get_unique_labels() is None:
        Destination.add_unique_labels(output_data)
        
    if os.path.exists(index_file_path):
        return

    combined_features = np.hstack((place_type_encoded, activities_encoded))

    # Number of bits for LSH
    nbits = 64

    # Dimension of the combined feature vectors
    d = combined_features.shape[1]

    # Create an LSH index
    index = faiss.IndexLSH(d, nbits)

    # Add vectors to the index
    index.add(combined_features)


    # Store the index
    faiss.write_index(index, index_file_path)
