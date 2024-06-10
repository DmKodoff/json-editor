# JSON-Edit

This is a web application that allows users to view and edit random JSON data in a table format.
The data is retrieved from the API - generating random values using the Redux-Thunk function, and the table is displayed using the `@tanstack/react-table` library.
The project is built using React, Redux Toolkit and TypeScript.

To optimize rendering and handle large amounts of data, I used virtualization using the `@tanstack/react-virtual` library

The user is displayed and given the ability to edit primitive values of non-nested data

- strings, numbers, dates, boolean

nested arrays or objects are omitted from display and editing.

Translated with DeepL.com (free version)

## Features

- View data in a virtualized table format
- Edit data using a modal form
- Loading indicator while data is being fetched

### Installing

1. Clone the repository:
   `git clone https://github.com/DmKodoff/json-editor.git`

2. Install the dependencies:
   `npm install`

3. Start the development server:
   `npm start`

The development server will start running on `http://localhost:3000`.

## Built With

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TanStack Table](https://tanstack.com/table/latest)
- [TanStack Virtual](https://tanstack.com/table/latest)
- [React Hook Form](https://www.react-hook-form.com/)
