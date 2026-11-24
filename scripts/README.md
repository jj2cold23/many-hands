# Assignment 12 stress data

Run `node scripts/seed-stress.mjs` to generate and validate a dry run. The fixture
uses fictional community profiles and covers 60 issues across six neighborhoods.
It assigns 11 tasks on 11 different issues to each of the 20 profiles.

To load the data, install the Admin SDK locally with
`npm install --no-save --package-lock=false firebase-admin`. Use Application Default
Credentials for your own class project and run
`node scripts/seed-stress.mjs YOUR_FIREBASE_PROJECT_ID`. A repeat run replaces
only the fixture documents with the same deterministic IDs. Use a separate class
or demo project so fixture profiles and data remain isolated.

The script verifies the documents by reading them back after writing. The seed
profiles are Firestore documents. Create a separate Firebase Auth account through
the app to sign in for testing.
