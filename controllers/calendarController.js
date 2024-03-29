import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import User from '../models/user_model.js';
import { sendmail } from '../sendemail.js';
import { sendSMS } from '../sendSMS.js';
import { saveSchedule } from './scheduleController.js';
import csv from 'csv-parser';
import csvParser from 'fs';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth) {
  const calendar = google.calendar({ version: 'v3', auth });
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return [];
  }
  return events;
}

export const getEvents = async (req, res, next) => {
  const events = await authorize().then(listEvents).catch(console.error);
  return res.status(200).json(events);
}

const updateEvent = async (auth, newEvent) => {
  let { start_date, end_date, eventId } = newEvent;
  start_date = new Date(start_date);
  end_date = new Date(end_date);

  const event = {
    'start': {
      'dateTime': start_date,
      'timeZone': 'America/Toronto',
    },
    'end': {
      'dateTime': end_date,
      'timeZone': 'America/Toronto',
    },
  }

  try {
    const calendar = google.calendar({ version: 'v3', auth });
    const response = await calendar.events.get({
      calendarId: 'primary',
      eventId: eventId
    });


    const formatted_time = start_date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const html_patient = `<strong> Hi ${response.data.attendees[1].email.split('@')[0]} <br/>Your Surgery has been re-scheduled in Bluewater Health at  ${JSON.stringify(start_date).slice(1, 11)} at ${formatted_time}<br/>Regards,<br/>Time Doctor`;
    const html_doctor = `<strong> Hi Dr. ${response.data.attendees[0].email.split('@')[0]} <br/>Your Surgery has been re-scheduled in Bluewater Health at  ${JSON.stringify(start_date).slice(1, 11)} at ${formatted_time}<br/>Regards,<br/>Time Doctor`;
    const subject = "Surgery Rescheduled";
    calendar.events.patch({
      calendarId: 'primary',
      eventId: eventId,
      requestBody: event
    });

    sendmail(response.data.attendees[0].email, subject, html_doctor);
    sendmail(response.data.attendees[1].email, subject, html_patient);
    return true;
  }
  catch (e) {
    return false;
  }
}

const addEvent = (auth, data, patient, doctor) => {
  let { start_date, end_date, important } = data;
  start_date = new Date(start_date);
  end_date = new Date(end_date);


  const event = {
    'summary': 'Surgery Schedule',
    'location': '89 Norman St, Sarnia, ON N7T 6S3',
    'description': 'Your Surgery Has been Scheduled.',
    'colorId': important ? 11 : 5,
    'start': {
      'dateTime': start_date,
      'timeZone': 'America/Toronto',
    },
    'end': {
      'dateTime': end_date,
      'timeZone': 'America/Toronto',
    },

    'attendees': [
      { 'email': patient.email },
      { 'email': doctor.email },
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        { 'method': 'email', 'minutes': 24 * 60 },
        { 'method': 'popup', 'minutes': 10 },
      ],
    },
  };

  var time = new Date(start_date)
  const formatted_time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = `Hi ${patient.user_name}
  Your Surgery has been scheduled at Bluewater Health
  ${JSON.stringify(start_date).slice(1, 11)} at ${formatted_time} 
  
  Regards,
  Time Doctor
  `;
  const html_patient = `<strong> Hi ${patient.email.split('@')[0]} <br/>Your Surgery has been scheduled in Bluewater Health at  ${JSON.stringify(start_date).slice(1, 11)} at ${formatted_time}<br/>Regards,<br/>Time Doctor`;
  const html_doctor = `<strong> Hi Dr. ${doctor.email.split('@')[0]} <br/>Your Surgery has been scheduled in Bluewater Health at  ${JSON.stringify(start_date).slice(1, 11)} at ${formatted_time}<br/>Regards,<br/>Time Doctor`;

  const subject = "Surgery Scheduled Successfully";
  const calendar = google.calendar({ version: 'v3', auth });
  calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event,
  }, function (err) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    sendmail(patient.email, subject, html_patient);
    sendmail(doctor.email, subject, html_doctor);
    sendSMS([patient.mobile_number, doctor.mobile_number], message);
    return true
  });
}

export const addEvents = async (req, res, next) => {
  const data = req.body;
  const { patient, doctor } = req.body;
  const doctor_data = await User.findByPk(doctor, { attributes: ['email', 'mobile_number', 'user_name'] });
  const patient_data = await User.findByPk(patient, { attributes: ['email', 'mobile_number', 'user_name'] });
  const isAdded = authorize().then((value) => addEvent(value, data, patient_data, doctor_data)).catch(console.error);
  const dataSaved = saveSchedule(data);
  if (isAdded && dataSaved) {
    return res.status(200).json({ message: "Event Added Successfully" });
  }
  return res.status(500).json({ message: "Something went wrong" })
}


export const rescheduleEvent = (req, res, next) => {
  const newEvent = req.body;
  const isUpdated = authorize().then((value) => updateEvent(value, newEvent)).catch(console.error)
  if (isUpdated) {
    return res.status(200).json({ "message": "Schedule Updated Successfully" });
  }
  return res.status(500).json({ "message": "Cannot Update the Schedule" });
}


//import code

export const updateEventFromFile = async (req, res, next) => {
  try {
    csvParser.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', async (row) => {
        const { patient, doctor } = row;
        const doctor_data = await User.findByPk(doctor, { attributes: ['email', 'mobile_number', 'user_name'] });
        const patient_data = await User.findByPk(patient, { attributes: ['email', 'mobile_number', 'user_name'] });
        authorize().then((value) => addEvent(value, row, patient_data, doctor_data)).catch(console.error);
      })
      .on('end', () => {
        res.status(201).json({ message: 'All events added successfully' });
      });
  }
  catch (err) {
    next(err);
  }
}

const cancelSchedule = (auth, eventId) => {
  try {
    const calendar = google.calendar({ version: 'v3', auth });
    calendar.events.delete({
      auth: auth,
      calendarId: 'primary',
      eventId: eventId
    });
    return true;
  } catch (e) {
    console.log(e);
  }
}

export const deleteSchedule = (req, res, next) => {
  try {
    const { eventId } = req.body;
    const isDeleted = authorize().then((value) => cancelSchedule(value, eventId)).catch(console.error)
    if (isDeleted) {
      return res.status(200).json("Event Deleted Successfully");
    }
  } catch (e) {
    next(e);
  }
}