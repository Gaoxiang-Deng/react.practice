<!--
 * @Author: Deng nelsondeng0701@gmail.com
 * @Date: 2024-11-17 20:41:33
 * @LastEditors: Deng nelsondeng0701@gmail.com
 * @LastEditTime: 2024-12-19 17:05:28
 * @FilePath: /react/my-app/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# React Redux Product Management Application

## Overview
This project is a web-based product management application built using **React**, **Redux Toolkit**, and **Material-UI**. It enables users to manage a list of products, including adding, updating, deleting, and searching for products. It features user authentication and API integration.

## Key Features
- **User Authentication**: Includes a login page that verifies user credentials.
- **Product Management**:
  - Add, update, delete products.
  - View product details in a table format.
  - Search functionality to filter products.
- **State Management**: Implements Redux Toolkit for managing application state.
- **API Integration**: Uses `axios` for communication with the backend server.
- **Responsive Design**: Employs Material-UI components for a responsive and modern UI.

## Technologies Used
- **React**: Frontend library for building user interfaces.
- **Redux Toolkit**: Simplified state management.
- **Material-UI**: Component library for responsive design.
- **Axios**: HTTP client for API requests.
- **React Router**: For navigation between pages.
- **Testing Library**: For unit and integration tests.
- **CSS**: Styling for basic customizations.

## File Structure
### Key Files and Their Roles
- **index.js**: Entry point of the application, connects Redux store and renders the root component.
- **App.js**: Defines routes and manages application-level state.
- **LoginPage.js**: Handles user login functionality.
- **DenseTable.js**: Displays product data in a table with CRUD operations.
- **Service.js**: Configures API calls with Axios and interceptors.
- **productSlice.js**: Redux slice for product-related state and asynchronous actions.
- **store.js**: Configures Redux store.
- **App.css**: Styling for the application.
- **setupTests.js**: Configures the testing environment.
- **App.test.js**: Example test file.

## API Integration
- Base API URL: `https://server.gradspace.org/api/`
- **Endpoints**:
  - `GET /products`: Fetch products.
  - `POST /products`: Add a product.
  - `PUT /product/:id`: Update product details.
  - `DELETE /product/:id`: Delete a product.

## Installation and Setup
1. Clone the repository.
2. Install dependencies:  npm install
3. Start the development server: npm start
4. Run tests:  npm test

## How to Use
1. Log in using valid credentials.
2. Manage products by adding, updating, or deleting entries in the product table.
3. Search for products using the search bar.
4. Log out when finished.


## License

Let me know if you need additional details or modifications!
