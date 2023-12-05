# Calender Server

# Calendar API Server

This is a simple Node.js TypeScript server that provides calendar-related functionality through HTTP endpoints.

## Endpoints

### 1. Add Days to Today

- **Endpoint:** `/add-days`
- **Behavior without Params:** Adds 6 days to the current date.
- **Behavior with Params:** Adds the specified number of days to the current date.

### 2. Add Weeks to Today

- **Endpoint:** `/add-weeks`
- **Behavior without Params:** Adds 6 weeks to the current date.
- **Behavior with Params:** Adds the specified number of weeks to the current date.

### 3. Subtract Days from a Specific Date

- **Endpoint:** `/sub-days-from-12-jan-2019`
- **Behavior without Params:** Subtracts 187 days from January 12, 2019.
- **Behavior with Params:** Subtracts the specified number of days from the provided date (default: January 12, 2019).

## How to Run

```bash
npm install # Install dependencies

npm run dev # Run server
```

## Test server

```bash
chmod +x test_api.sh

./test_api.sh
```
