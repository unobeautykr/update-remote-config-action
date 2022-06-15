const admin = require("firebase-admin");
const fs = require("fs").promises;

async function authenticate(projectId) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId
  });
}

async function run(inputs, projectId) {
  await authenticate(projectId);

  const remoteConfig = admin.remoteConfig();
  const template = await remoteConfig.getTemplate();

  const update = {
    etag: template.etag,
    parameters: template.parameters,
    parameterGroups: {},
    conditions: []
  };

  for (const key in inputs) {
    const value = inputs[key];
    update.parameters[key] = {
      defaultValue: {
        value,
      },
      valueType: "STRING",
    };
  }

  await remoteConfig.validateTemplate(update);

  await remoteConfig.publishTemplate(update)
}

module.exports = {
  run,
};
