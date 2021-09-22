const core = require("@actions/core");
const script = require("./script");
const fs = require("fs").promises;

function getInputMap() {
  const map = {};

  for (const key in process.env) {
    // GitHub Actions uses INPUT_ prefix for inputs.
    // Inputs with _ character are for internal use
    if (key.startsWith("INPUT_") && key[6] !== "_") {
      const inputKey = key.slice(6);
      map[inputKey] = process.env[key];
    }
  }

  return map;
}

async function run() {
  try {
    const gsaKey = core.getInput("gsaKey");
    const inputs = getInputMap();

    const crendentialFilePath = "/google-service-account-key.json";
    process.env.GOOGLE_APPLICATION_CREDENTIALS = crendentialFilePath;
    await fs.writeFile(crendentialFilePath, gsaKey);

    await script.run(inputs);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
