
  service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      disallow read, write: if request.auth != null;
    }
  }
}
  