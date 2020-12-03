import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const baseURL = `http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}`;

/**
 * Gets a list of all lights that have been discovered by the bridge.
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getAllLights = async (req, res) => {
  try {
    const response = await fetch(`${baseURL}/lights`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    res.status(200).json(jsonResponse);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Gets the attributes and state of a given light.
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getLightById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetch(`${baseURL}/lights/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    res.status(200).json(jsonResponse);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Used to rename lights. A light can have its name changed when in any state, 
 * including when it is unreachable or off.
 * @param {Object} req 
 * @param {Object} req.body
 * @param {string} req.body.name - The new name for the light.
 * @param {Object} res 
 */
exports.setLightAttr = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  try {
    const response = await fetch(`${baseURL}/lights/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    res.status(200).json(jsonResponse);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Allows the user to turn the light on and off.
 * @param {Object} req 
 * @param {Object} res 
 */
exports.setLightState = async (req, res) => {
  const id = req.params.id;
  const state = req.params.state === 'on' ? true : false;
  try {
    const response = await fetch(`${baseURL}/lights/${id}/state`, {
      method: 'PUT',
      body: JSON.stringify({ on: state }),
      headers: { 'Content-Type': 'application/json' },
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    res.status(200).json(jsonResponse);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Allows the user to turn the light on and off, modify the hue and effects.
 * @param {Object} req
 * @param {Object} req.body
 * @param {boolean} req.body.on - On/Off State.
 * @param {number} [req.body.bri} - Brightness. 0 to 254.
 * @param {number} [req.body.hue} - Hue. 0 to 65535. Ex: 65535/Red, 25500/Green, 46920/Blue.
 * @param {number} [req.body.sat} - Saturation. 0 to 254.
 * @param {number[]} [req.body.xy} - X & Y coordinates of a coler in CIE coler space. 0 to 1.
 * @param {number} [req.body.ct} - Mired Color Temperature. 153 to 500.
 * @param {string} [req.body.alert} - Alert effect: Ex: none, select, lselect.
 * @param {string} [req.body.effect} - Dynamic effect: Ex: none, colorloop.
 * @param {number} [req.body.transitiontime} - Duration of transition between states. Multiples of 100ms. Ex: 10 = 1s.
 * @param {number} [req.body.bri_inc} - Brightness Increment/Decrement. -254 to 254.
 * @param {number} [req.body.sat_inc} - Saturation Increment/Decrement. -254 to 254.
 * @param {number} [req.body.hue_inc} - Hue Increment/Decrement. -65534 to 65534.
 * @param {number} [req.body.ct_inc} - Color Temperature Increment/Decrement. -65534 - 65534.
 * @param {number[]} [req.body.xy_inc} - X & Y Coordinates Increment / Decrement. -0.5 to 0.5
 * @param {string} [req.body.scene] - The scene identifier.
 * @param {Object} res 
 */
exports.setLightHueState = async (req, res) => {
  const body = req.body;
  const data = {};
  body.on && (data.on = body.on); // optional: true / false
  body.bri && (data.bri = body.bri); // optional: 1 - 54
  body.hue && (data.hue = body.hue); // optional: 

  try {
    const response = await fetch(`${baseURL}/lights/${id}/state`, {
      method: 'PUT',
      body: JSON.stringify({ on: state }),
      headers: { 'Content-Type': 'application/json' },
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    res.status(200).json(jsonResponse);
  } catch (e) {
    console.log(e);
  }
}

