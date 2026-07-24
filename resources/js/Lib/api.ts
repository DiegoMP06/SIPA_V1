type RequestOptions = Omit<RequestInit, "body" | "headers"> & {
    body?: BodyInit | Record<string, unknown> | null;
    params?: Record<string, unknown>;
    headers?: HeadersInit | Record<string, string>;
};

type RequestConfig = RequestOptions & {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
};

const getCsrfToken = () => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta?.getAttribute("content") ?? null;
};

const buildUrl = (url: string, params?: Record<string, unknown>) => {
    if (!params) {
        return url;
    }

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    });

    const query = searchParams.toString();
    return query ? `${url}${url.includes("?") ? "&" : "?"}${query}` : url;
};

const parseResponse = async (response: Response) => {
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    return {
        data,
        status: response.status,
        headers: response.headers,
    };
};

const request = async (url: string, options: RequestConfig) => {
    const headers = new Headers(options.headers);
    headers.set("Accept", "application/json");
    headers.set("X-Requested-With", "XMLHttpRequest");

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
    };

    const csrfToken = getCsrfToken();
    if (csrfToken) {
        headers.set("X-CSRF-TOKEN", csrfToken);
        const xsrfToken = getCookie("XSRF-TOKEN");
        if (xsrfToken) {
            headers.set("X-XSRF-TOKEN", xsrfToken);
        }
    }

    const isFormData = options.body instanceof FormData;
    const body = isFormData
        ? (options.body as BodyInit)
        : typeof options.body === "object" && options.body !== null
          ? JSON.stringify(options.body)
          : options.body;

    const response = await fetch(buildUrl(url, options.params), {
        ...options,
        body,
        credentials: "include",
        headers,
    });

    const parsed = await parseResponse(response);

    if (!response.ok) {
        throw {
            ...parsed,
            response,
        };
    }

    return parsed;
};

const api = {
    get: (url: string, options: Omit<RequestOptions, "method"> = {}) =>
        request(url, { ...options, method: "GET" }),
    post: (
        url: string,
        body?: RequestOptions["body"],
        options: Omit<RequestOptions, "method"> = {},
    ) => request(url, { ...options, body, method: "POST" }),
    put: (
        url: string,
        body?: RequestOptions["body"],
        options: Omit<RequestOptions, "method"> = {},
    ) => request(url, { ...options, body, method: "PUT" }),
    patch: (
        url: string,
        body?: RequestOptions["body"],
        options: Omit<RequestOptions, "method"> = {},
    ) => request(url, { ...options, body, method: "PATCH" }),
    delete: (url: string, options: Omit<RequestOptions, "method"> = {}) =>
        request(url, { ...options, method: "DELETE" }),
    request: (url: string, options: RequestConfig) => request(url, options),
};

export default api;
