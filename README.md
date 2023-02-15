# Hospital API

API design for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of COVID-19 patients

## Features

- There can be 2 types of Users
  - Doctors
  - Patients
- Doctors can log in
- Each time a patient visits, the doctor will follow 2 steps:
  - Register the patient in the app (using phone number, if the patient already exists, returns the patient info in the API)
  - After the checkup, create a Report
- Patient Report has the following fields:
  - Created by doctor
  - Status (uses enums):
    - Can be either of: [Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit]
  - Date
- Routes:
  - /doctors/register → with username and password
  - /doctors/login → returns the JWT to be used
  - /patients/register
  - /patients/:id/create_report
  - /patients/:id/all_reports → List all the reports of a patient oldest to latest
  - /reports/:status → List all the reports of all the patients filtered by a specific status

## Deployment

To deploy this project run

```bash
npm start
```

Hosted on

https://hospital-api-byas.onrender.com/

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URL` - db url for database connection

`port` - port number on which the server runs

`JWT_SECRET_KEY` - random key to generate JWT secret key

`JWT_KEY` - random key to generate JWT key

## Tech Stack

Node.js, Express.js, MongoDB, JWT, Mongoose, Passport.js, Nodemailer, Postman

## Demo

This Demo is given using hosted URL as the source. You can clone the project, connect with your local Database and run on localhost as well.

All the API testing requires the use of Postman.

All parameters in Body are in x-www-form-urlencoded as shown.

Note- The home page does not render any page, so it will give the message - Cannot GET /

1. `POST https://hospital-api-byas.onrender.com/api/v1/doctors/register` => requires the shown three parameters. Response as shown by the API.
   ![1) hospital-api_doctor-register](https://user-images.githubusercontent.com/121491626/218994648-9ab24e25-7903-41ab-b9c2-f0bc58b3a5ba.jpg)

2. `POST https://hospital-api-byas.onrender.com/api/v1/doctors/login` => requires the shown two parameters. Response as shown by the API.
   ![2) hospital-api_doctor-login](https://user-images.githubusercontent.com/121491626/218994654-7418f7d0-3e1f-4b0c-b1e2-bc30ccea822c.jpg)

3. `POST https://hospital-api-byas.onrender.com/api/v1/patients/register` => Use the token generated in previous response and use it under Authorization tab and choose type Bearer Token, Inside Body, the two required parameters are phone and name. Response as shown by the API.
   ![3) hospital-api_patient-register](https://user-images.githubusercontent.com/121491626/218994671-1498673b-77da-4a58-a490-5ca1484a107e.jpg)

4. `POST https://hospital-api-byas.onrender.com/api/v1/patients/63eca97ee9e66e004d4f80e6/create_report` => :id is taken from the database, you can edit the :id to a value generated from your database. Same Authorization as above.Requires parameters as shown. Response as shown by the API.
   ![4) hospital-api_patient-create_report](https://user-images.githubusercontent.com/121491626/218997502-6dbcb115-2882-455e-9e17-4bdd691c6d5e.jpg)

5. `GET https://hospital-api-byas.onrender.com/api/v1/patients/63eca97ee9e66e004d4f80e6/all_reports` => Same :id from above. Same Authorization as above.No required parameters. Response as shown by the API.
   ![5) hospital-api_patient-all_reports](https://user-images.githubusercontent.com/121491626/218994689-9d176c7e-769f-4679-8c6d-f3860f3b56f2.jpg)

6. `GET https://hospital-api-byas.onrender.com/api/v1/reports/Negative`=> Same Authorization as above.No required parameters. Response as shown by the API.
   ![6) hospital-api_reports-by-status](https://user-images.githubusercontent.com/121491626/218994702-586583fe-1f39-4f70-bd43-bbb8d44ab821.jpg)
