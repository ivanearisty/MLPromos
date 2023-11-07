import os

class Parameters:
    mongodb_user = "main-user"
    mongodb_password = "e4yX8152tnKg"
    mongodb_host = "localhost" 
    mongodb_port = 27017
    mongodb_database = "mydatabase"
    modelLocation = os.path.abspath("backend/mlmodel/model-best") ##made absolute path so docker can access model

parameters = Parameters()
