const BASE_URL: string = import.meta.env.VITE_API_URL as string;

const APP_ENV = {

    BASE_URL: BASE_URL
};

console.log("APP_ENV.BASE_URL",APP_ENV.BASE_URL);

export { APP_ENV };