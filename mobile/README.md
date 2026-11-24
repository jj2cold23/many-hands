# Many Hands Mobile • Assignment 12

This Flutter client uses the cloned Many Hands Firestore schema. It has account
creation and member profiles, issue filters, keyword and Gemini search, voice
dictation, task details and claiming, and comments with the 2,000-character counter.

## Connect and build

1. The Android and iOS projects are included. Their Firebase app IDs are
   registered under `many-hands-mobile-c0d69`. From this directory, run
   `flutterfire configure --project=many-hands-mobile-c0d69 --platforms=android,ios`,
   import the generated `firebase_options.dart` in `lib/main.dart`, and pass
   `options: DefaultFirebaseOptions.currentPlatform` to `Firebase.initializeApp`.
2. Firebase Email/Password and Firestore rules are already published. Complete
   Gemini Developer API setup for AI search and configure the appropriate
   Firebase App Check providers if enforcement is enabled. AI search sends the
   search query and candidate issue titles and IDs.
3. Android and iOS microphone permissions are declared. From the repo root,
   follow `scripts/README.md` to load and verify the fixture. Sign up through the app.
4. Run `flutter analyze` and test on both platforms. Build an Android APK for
   direct install. On a Mac with Xcode and Apple signing, produce an iOS build
   for TestFlight or another distribution method approved by the instructor.

## Demonstration outline (about 7 minutes)

- 0:00–1:00 — Launch the installed app and show the Firebase project and fixture
  counts. Show one seeded member with 11 tasks across 11 issues.
- 1:00–2:30 — Browse issues, change status filters, type a keyword and clear it
  while keeping the selected filter.
- 2:30–4:00 — Dictate an issue search and try a natural-language search such
  as “I want to help animals this week.” Show which issues Gemini returns.
- 4:00–5:30 — Open an issue and task. Post a comment and show the character
  counter. Use a separate unassigned task if demonstrating the claim flow.
- 5:30–7:00 — Show the same issue from the second platform, confirm data
  persists after relaunch, and point viewers to both installation links.
