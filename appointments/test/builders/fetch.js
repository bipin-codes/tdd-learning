export const fetchResponseOk = (body) => ({
  ok: true,
  json: () => Promise.resolve(body),
});
//We don't need to wrap with Promise.resolve because jest's mockeResolved value does this internally
//   Promise.resolve({
//     ok: true,
//     json: () => Promise.resolve(body),
//   });
// export const fetchResponseError = () => Promise.resolve({ ok: false });
export const fetchResponseError = () => ({ ok: false });
