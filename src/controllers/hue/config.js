import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const baseURL = `http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}`;

/**
 * Returns list of all configuration elements in the bridge. Note all times are stored in UTC.
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getConfig = async (req, res) => {
  try {
    const response = await fetch(`${baseURL}/config`, {
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
 * Allows the user to set some configuration values.
 * @param {Object} req 
 * @param {Object} req.body
 * @param {number} [req.body.proxyport] - Port of the proxy being used by the bridge. Set to 0 for none.
 * @param {string} [req.body.name] - Name of the bridge. Also uPnP name.
 * @param {Object} [req.body.swupdate] - Contains information related to software updates.
 * @param {string} [req.body.proxyaddress] - IP address of the proxy server. Set to none for no proxy.
 * @param {boolean} [req.body.linkbutton] - Indicates whether the link button has been pressed in the last 30s.
 * @param {string} [req.body.ipaddress] - Ip address of the bridge.
 * @param {string} [req.body.netmask] - Network mask of the bridge.
 * @param {string} [req.body.gateway] - Gateway IP address of the bridge.
 * @param {boolean} [req.body.dhcp] - Whether the IP address of the bridge is obtained with DHCP.
 * @param {string} [req.body.timezone] - The brige timezone.
 * @param {boolean} [req.body.name] - Perform a touchlink action if set to true, setting to false is ignored. 
 * When set to true a touchlink procedure starts which adds the closest lamp (within range) to the ZigBee network.
 * @param {number} [zigbeechanel] - The wireless frequency channel used by the bridge. It can take values of 11, 15, 20 or 25.
 * @param {Object} res 
 */
exports.updateConfig = async (req, res) => {
  const body = req.body;
  try {
    const response = await fetch(`${baseURL}/config`, {
      method: 'PUT',
      body: JSON.stringify(body),
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
 * This command is used to fetch the entire datastore from the device, including settings and state information 
 * for lights, groups, schedules and configuration. It should only be used sparingly as it is resource intensive 
 * for the bridge, but is supplied e.g. for synchronization purposes.
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getFullState = async (req, res) => {
  try {
    const response = await fetch(`${baseURL}`, {
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

