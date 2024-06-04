import pandas as pd
import numpy as np
import json

def process_data(file_path):
    # Read the data file
    data = pd.read_csv(file_path)

    # Perform necessary calculations
    processed_data = data.describe()

    # Write the processed data to a JSON file
    with open('processed_data.json', 'w') as f:
        f.write(processed_data.to_json())

    return processed_data