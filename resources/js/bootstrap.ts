const windowWithApi = window as Window & { apiClient?: unknown };
windowWithApi.apiClient = undefined;
