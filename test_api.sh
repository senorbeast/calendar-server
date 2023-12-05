#!/bin/bash

BASE_URL="http://localhost:3000"

# Function to execute a command and wait for a key press
function execute_command() {
  eval "$1"
  echo -e "\nPress Enter to continue..."
  read -r
}

# Function to handle interrupt signal (Ctrl + C)
function handle_interrupt() {
  echo -e "\nScript interrupted. Exiting..."
  exit 1
}

# Trap interrupt signal
trap handle_interrupt SIGINT

# Test all endpoints without params
function test_endpoints_without_params() {
  echo "Testing all endpoints without params..."

  # Endpoint 1
  echo "/add-days"
  execute_command "curl -sS $BASE_URL/add-days"
  
  # Endpoint 2
  echo "/add-weeks"
  execute_command "curl -sS $BASE_URL/add-weeks"

  # Endpoint 3
  echo "/sub-days-from-12-jan-2019"
  execute_command "curl -sS $BASE_URL/sub-days-from-12-jan-2019"
}

# Test all endpoints with params
function test_endpoints_with_params() {
  echo "Testing all endpoints with params..."

  # Endpoint 1
  echo "/add-days?days=3"
  execute_command "curl -sS $BASE_URL/add-days?days=3"

  # Endpoint 2
  echo "/add-weeks?weeks=2"
  execute_command "curl -sS $BASE_URL/add-weeks?weeks=2"

  # Endpoint 3
  echo "/sub-days-from-12-jan-2019?fromDate=2020-01-01"
  execute_command "curl -sS $BASE_URL/sub-days-from-12-jan-2019?fromDate=2020-01-01"
}

function concurrently_test_all() {
  echo "Concurrently testing all endpoints..."

  # Test all endpoints without params concurrently
  (test_endpoints_without_params) &

  # Test all endpoints with params concurrently
  (test_endpoints_with_params) &
  
  # Wait for all background jobs to finish
  wait
}

# Uncomment the function you want to test or test all concurrently
test_endpoints_without_params
test_endpoints_with_params

# Execute concurrently and handle interrupt
# concurrently_test_all
