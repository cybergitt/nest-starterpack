export const Env = {
  fetch(key: string, fallback: any = '') {
    return process.env[key] ?? fallback;
  },
  match(key: string, match: any) {
    return process.env[key] === match;
  },
};
