import pandas as pd
import matplotlib.pyplot as plt

def visualize_data(file_path):
    # Read the data file
    data = pd.read_csv(file_path)
    
    # Create a plot
    data.plot(kind='bar')

    # Save the plot as image file
    plt.savefig('plot.png')