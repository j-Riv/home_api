import dotenv from 'dotenv';
import HueConfig from '../controllers/hue/config';
import HueLights from '../controllers/hue/lights';
import HueGroups from '../controllers/hue/groups';
dotenv.config();

module.exports = app => {
  // config
  app.get('/api/hue/config', HueConfig.getConfig);
  app.post('/api/hue/config', HueConfig.updateConfig);
  app.get('/api/hue', HueConfig.getFullState);
  // lights
  app.get('/api/hue/lights/', HueLights.getAllLights);
  app.get('/api/hue/lights/:id', HueLights.getLightById);
  app.post('/api/hue/lights/:id/', HueLights.setLightAttr);
  app.get('/api/hue/lights/:id/:state', HueLights.setLightState);
  // groups
  app.get('/api/hue/groups/', HueGroups.getAllGroups);
  app.get('/api/hue/groups/:id', HueGroups.getGroupById);
  app.post('/api/hue/groups/:id', HueGroups.setGroupAttr);
  app.get('/api/hue/groups/:id/:state', HueGroups.setGroupState);
}