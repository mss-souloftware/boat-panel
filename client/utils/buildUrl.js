// utils/buildUrl.js
export function buildUrl(path) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
    return `${baseUrl}/api/${apiVersion}${path}`;
}
