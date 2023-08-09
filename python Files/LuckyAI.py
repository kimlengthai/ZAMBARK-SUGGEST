# 1. Import necessary libraries
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn import tree
from sklearn.metrics import accuracy_score
import pickle

# 2. Load the dataset
iris = datasets.load_iris()
X = iris.data
y = iris.target

# 4. Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5. Define the machine learning model
clf = tree.DecisionTreeClassifier()

# 6. Train the model
clf.fit(X_train, y_train)

# 7. Evaluate the model
predictions = clf.predict(X_test)
print(f"Model accuracy: {accuracy_score(y_test, predictions)*100}%")

# 8. Save the model for future use
with open('model.pkl', 'wb') as f:
    pickle.dump(clf, f)

# Load the model and accept user input
with open('model.pkl', 'rb') as f:
    clf = pickle.load(f)

# Take user input for the four features (sepal length, sepal width, petal length, petal width)
sepal_length = float(input("Enter sepal length: "))
sepal_width = float(input("Enter sepal width: "))
petal_length = float(input("Enter petal length: "))
petal_width = float(input("Enter petal width: "))

# The model expects a 2D array as input, so we need to wrap the input values in a list of lists
flower_features = [[sepal_length, sepal_width, petal_length, petal_width]]

# Use the model to make a prediction
prediction = clf.predict(flower_features)

# Map numerical labels to flower species names
label_to_name = {0: 'setosa', 1: 'versicolor', 2: 'virginica'}
# We can map these back to the original class names for a more understandable output
predicted_class = label_to_name[prediction[0]]

print(f"The model predicts that the flower is of the species {predicted_class}.")
