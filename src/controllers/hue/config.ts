import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { Request, Response } from 'express';
dotenv.config();

const baseURL: string = `http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}`;

export const ping = (req: Request, res: Response) => {
  res.status(200).send('PONG!');
}

/**
 * Returns list of all configuration elements in the bridge. Note all times are stored in UTC.
 * @param {Object} req
 * @param {Object} res
 */
export const getConfig = async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${baseURL}/config`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const jsonResponse = await response.json();
    // console.log(jsonResponse);
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
 * @param {boolean} [req.body.touchlink] - Perform a touchlink action if set to true, setting to false is ignored.
 * When set to true a touchlink procedure starts which adds the closest lamp (within range) to the ZigBee network.
 * @param {number} [zigbeechannel] - The wireless frequency channel used by the bridge. It can take values of 11, 15, 20 or 25.
 * @param {Object} res
 */
export const updateConfig = async (req: Request, res: Response) => {
  interface Body {
    proxyport?: number,
    name?: string,
    swupdate?: Object,
    proxyaddress?: string,
    linkbutton?: boolean,
    ipaddress?: string,
    netmask?: string,
    gateway?: string,
    dhcp?: boolean,
    timezone?: string,
    touchlink?: boolean,
    zigbeechannel?: number
  }
  const body: Body = req.body;
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
export const getFullState = async (req: Request, res: Response) => {
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

