import firebase_admin
from firebase_admin import credentials

# Initialize only once
if not firebase_admin._apps:
    cred = credentials.Certificate("service-account.json")
    firebase_admin.initialize_app(cred)
