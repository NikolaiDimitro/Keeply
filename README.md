# Keeply

**Keeply** is a mobile application for managing personal belongings, purchases, receipts, and warranties in one place.

The goal is to help users keep track of the items they own, store useful purchase information, and avoid missing warranty expiration dates.

## Features

### Planned Features

- **User Authentication** — register, log in, and log out.
- **Personal Inventory** — create and manage a list of personal belongings.
- **Item Details** — view an item's name, category, price, purchase date, photo, and notes.
- **Item Management** — add, edit, and delete items.
- **Photos** — take or select photos of personal belongings using the device.
- **Warranty Tracking** — store warranty information and identify warranties that are expiring soon.
- **Search and Filters** — find items by name or category.
- **Data Persistence** — store user and inventory data in Firebase.

## Technology Stack

- React Native
- Expo
- JavaScript
- React Navigation
- Firebase Authentication
- Cloud Firestore
- Expo ImagePicker

## Application Screens

The planned application will include:

- Login
- Register
- Home
- Inventory
- Item Details
- Add Item
- Edit Item
- Profile

The navigation structure will combine Stack Navigation and Bottom Tab Navigation.

## Data Management

Keeply will use Firebase Authentication for user accounts and Cloud Firestore for storing inventory data.

Users will be able to:

- Retrieve their inventory.
- Create new items.
- Update existing items.
- Delete items.
- Refresh the inventory list.

Each user will only be able to access their own inventory data.

## Native Device Features

The application will integrate the device's camera or photo library to allow users to attach images to their belongings.

## Validation and Error Handling

The application will provide:

- Required-field validation.
- Validation for numeric values such as item prices.
- Purchase-date validation.
- Loading indicators during asynchronous operations.
- User-friendly error messages.
- Empty states when no items are available.

## Project Structure

The project will be organized into reusable components, screens, navigation, and Firebase configuration modules as development progresses.

## Getting Started

Installation and execution instructions will be added after the initial Expo project is created.

## Functional Guide

The completed Functional Guide will document the application's purpose, user permissions, authentication, navigation, data operations, forms, native features, and typical user flows.

## Project Status

**Status:** In development.

This project is being developed as a React Native learning and portfolio project, with the initial version focused on meeting the required functionality and demonstrating core mobile development skills.

## Future Improvements

Potential future improvements include:

- Warranty expiration notifications.
- Receipt and document attachments.
- Data export.
- More advanced search and filtering.
- Additional inventory management features.
