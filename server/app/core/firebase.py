# app/core/firebase.py
import os
from pathlib import Path

import firebase_admin
from firebase_admin import credentials, auth as firebase_auth


def init_firebase():
    """
    Idempotent initialization of Firebase Admin SDK.
    Call this once at application startup (per process).
    """
    if not firebase_admin._apps:
        cred_path = os.getenv("FIREBASE_CREDENTIALS", "service-account.json")
        cred_file = Path(cred_path)
        if not cred_file.exists():
            raise RuntimeError(f"Firebase service account not found at: {cred_path}")

        cred = credentials.Certificate(str(cred_file))
        firebase_admin.initialize_app(cred)
        print("[FIREBASE] Admin SDK initialized successfully.")
    else:
        print("[FIREBASE] Admin SDK already initialized.")


firebase_auth = firebase_auth
