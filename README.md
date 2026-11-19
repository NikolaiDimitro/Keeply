# Keeply

Keeply is a React Native mobile app for keeping a personal inventory of belongings, purchase details, warranty periods, and related files.

> **APK download:** An APK has not been published yet. Once a build is available, it will be linked from [GitHub Releases](https://github.com/NikolaiDimitro/Keeply/releases).

## Features

- Register, sign in, and sign out with Firebase Authentication.
- Keep the signed-in session across app restarts.
- Create, view, edit, and delete inventory items stored in Cloud Firestore.
- Refresh the inventory from the list screen with pull-to-refresh.
- Search by item name, category, or store, and filter by category.
- Record a purchase date and warranty duration; calculate the warranty end date automatically.
- Add optional location and notes, and mark an item as important.
- Attach PDF, JPEG, PNG, or HEIC files (up to 10 MB per file); attachments are uploaded to Firebase Storage.
- Validate required item fields and show loading, error, and empty states.

## Functional Guide

### Purpose

Keeply helps users remember what they own, where and when an item was purchased, and how long its warranty lasts. Purchase documents and images can be attached to an item for reference.

### User flow

1. On first use, register with a name, email, and password, or sign in to an existing account.
2. After authentication, browse the home screen or open the inventory.
3. Pull down on the inventory list to fetch the latest items. Search by name, category, or store, or choose a category filter.
4. Choose **Add** to create an item. Enter its details, select the purchase date, and enter the warranty duration in months. Keeply calculates the warranty end date.
5. Open an item to see its details. Choose **Edit** to update it or replace its attachments, or choose **Delete** and confirm to remove it.
6. Open the profile screen to manage account details or sign out. The Firebase session is persisted so a signed-in user can remain signed in after restarting the app.

### Forms and validation

Item name, category, price, purchase date, warranty duration, and store are required. The price must be a valid non-negative number, the purchase date cannot be in the future, and the warranty duration must be a positive whole number of months. Location, notes, and attachments are optional.

Registration requires a name of at least six characters, a valid email, and a password of at least six characters; the password must also match its confirmation.

The forms use native controls, including a date picker and a switch, and provide keyboard-aware layouts and validation messages.

### Data and device access

Firebase Authentication manages accounts. Inventory records are read from and written to the signed-in user's `users/{uid}/items` Firestore collection. Attachments are stored in Firebase Storage under that user's item path. The app uses the device's document picker to select supported files; it does not currently capture photos with the camera or read device location.

## Tech Stack

- React Native 0.88
- Expo SDK 58
- React Navigation
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Expo DocumentPicker
- `@react-native-community/datetimepicker`

## Requirements

- Node.js and npm
- Android or iOS device/emulator for mobile use
- A Firebase project with Email/Password Authentication, Cloud Firestore, and Firebase Storage enabled

To run a fork with your own Firebase project, update the Firebase configuration in `config/firebase.js` and configure Firebase security rules for your app. Do not rely on client-side code alone to secure user data.

## Install and Run

```bash
git clone https://github.com/NikolaiDimitro/Keeply.git
cd Keeply
npm install
npm start
```

Follow the Expo CLI prompts to open the app on a configured Android device or emulator. The following platform scripts are also available:

```bash
npm run android
npm run ios
```

The iOS script requires macOS and Xcode.

Run the project linter with:

```bash
npm run lint
```

## Project Structure

```text
components/       Shared UI components
config/           Firebase initialization
navigation/       Auth and main-app navigators
providers/        Authentication state provider
screens/          Auth, inventory, create, details, edit, and profile screens
services/         Firebase authentication and item data operations
temporaryData/    Unused sample data
utils/            Attachment validation and shared helpers
```

## Project Status

The main app flows and Firebase-backed inventory operations are implemented. An APK build and download link still need to be added before submission. Expo SDK documentation: [SDK 58 reference](https://docs.expo.dev/versions/v58.0.0/).
