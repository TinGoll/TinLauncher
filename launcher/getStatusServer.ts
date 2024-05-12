import * as util from "minecraft-server-util";

function parseDomainAndPort(inputString: string): [string, number] | null {
  const parts = inputString.split(":");
  if (parts.length !== 2) {
    return null;
  }

  const domain = parts[0];
  const port = parseInt(parts[1]);

  if (isNaN(port)) {
    return null;
  }

  return [domain, port];
}

const getStatusSserver = async (options: TinLauncher.ServerStatusArgs) => {
  const { address, ...opts } = options;
  const data = parseDomainAndPort(address);
  if (!data) {
    return Promise.reject(new Error("Ошибка определения адреса сервера"));
  }
  const [domain, port] = data;
  try {
    const status = await util.status(domain, port, {
      timeout: 5000,
      enableSRV: true,
    });
    return status;
  } catch (error) {
    throw error;
  }
};

export default getStatusSserver;
