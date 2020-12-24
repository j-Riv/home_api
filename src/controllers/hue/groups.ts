import dotenv from 'dotenv'
import fetch from 'node-fetch';
import { Request, Response } from 'express';
dotenv.config();

const baseURL: string = `http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}`;

/**
 * Gets a list of all groups that have been added to the bridge.
 * A group is a list of lights that can be created, modified and deleted by a user.
 * @param {Object} req
 * @param {Object} res
 */
export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${baseURL}/groups`, {
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
 * Gets the group attributes, e.g. name, light membership and last command for a given group.
 * @param {Object} req
 * @param {Object} res
 */
export const getGroupById = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const response = await fetch(`${baseURL}/groups/${id}`, {
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
 * Allows the user to modify the name, light and class membership of a group.
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.name - The new name for the group.
 * @param {string[]} req.body.lights - The ids of the lights that should be in this group. Ex: "1", "2".
 * @param {string} req.body.class - The Category of the Room type. Default is "Other".
 * @param {Object} res
 */
export const setGroupAttr = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  interface Data {
    name?: string,
    lights?: string[],
    class?: string
  }
  const body: Data = req.body;
  const data: Data = {};
  body.name && (data.name = body.name);
  body.lights && (data.lights = body.lights);
  body.class && (data.class = body.class);
  try {
    const response = await fetch(`${baseURL}/groups/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
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
 * Modifies the state of all lights in a group.
 *
 * User created groups will have an ID of 1 or higher; however a special group
 * with an ID of 0 also exists containing all the lamps known by the bridge.
 * @param {Object} req
 * @param {Object} res
 */
export const setGroupState = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const state: boolean = req.params.state === 'on' ? true : false;
  try {
    const response = await fetch(`${baseURL}/groups/${id}/action`, {
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