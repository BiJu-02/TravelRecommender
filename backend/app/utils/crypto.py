import secrets
import base64

def generate_key(length=32):
    # Generate random bytes
    random_bytes = secrets.token_bytes(length)
    # Encode the bytes to a URL-safe base64 string
    secret_key = base64.urlsafe_b64encode(random_bytes).decode('utf-8')
    return secret_key
