export default (queries: Record<string, any>) => Object.entries(queries ?? {}).map((([k, v]) => `${k}=${encodeURIComponent(v)}`)).join('&');
