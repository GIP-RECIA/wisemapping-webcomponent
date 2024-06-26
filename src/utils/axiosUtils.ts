import { getJwt } from './soffitUtils.ts';
import axios from 'axios';
import throttle from 'lodash.throttle';

const instance = axios.create({
  timeout: import.meta.env.VITE_AXIOS_TIMEOUT,
});

let token: string | undefined = undefined;
let timeout: number | undefined = undefined;
let renewToken: any;

const setToken = (newToken: string): void => {
  token = newToken;
};

const init = async () => {
  try {
    const {
      encoded,
      decoded: { exp, iat },
    } = await getJwt();
    token = `Bearer ${encoded}`;
    timeout = (exp - iat) * 1000 * 0.75;
    renewToken = throttle(async () => {
      try {
        const { encoded } = await getJwt();
        token = `Bearer ${encoded}`;
      } catch (e) {
        // nothing to do
      }
    }, timeout);
  } catch (e) {
    // nothing to do
  }
};

instance.interceptors.request.use(async (config) => {
  if (!timeout && !token) await init();
  else if (timeout) await renewToken();
  config.headers['Authorization'] = token;

  return config;
});

const errorHandler = (e: any): void => {
  if (axios.isAxiosError(e)) {
    console.error(e.message);
  } else if (e instanceof Error) {
    console.error(e.message);
  } else {
    console.error(e);
  }
};

export { instance, setToken, errorHandler };
