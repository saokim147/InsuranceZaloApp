async function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  const response = await fetch(url, config);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorText}`
    );
  }
  return await response.json();
}

const api = {
  get: <TResponse>(url: string, config: RequestInit = {}) =>
    request<TResponse>(url, {
      ...config,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    }),

  post: <TBody, TResponse>(
    url: string,
    body: TBody,
    config: RequestInit = {}
  ) =>
    request<TResponse>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      body: JSON.stringify(body),
    }),
  postForm: <TResponse>(
    url: string,
    formData: FormData,
    config: RequestInit = {}
  ) =>
    request<TResponse>(url, {
      method: "POST",
      ...config,
      body: formData,
    }),
};

export default api;
