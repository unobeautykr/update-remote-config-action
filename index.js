const core = require("@actions/core");
const script = require("./script");
const fs = require("fs").promises;

function getInputMap() {
  const map = {};

  for (const key in process.env) {
    if (key.startsWith("key.")) {
      const inputKey = key.slice(4);
      map[inputKey] = process.env[key];
    }
  }

  return map;
}

async function run() {
  try {
    const gsaKey = core.getInput("gsaKey");
    const projectId = core.getInput("projectId");
    const inputs = getInputMap();

    const crendentialFilePath = "google-service-account-key.json";
    process.env.GOOGLE_APPLICATION_CREDENTIALS = crendentialFilePath;
    await fs.writeFile(crendentialFilePath, gsaKey);

    await script.run(inputs, projectId);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
