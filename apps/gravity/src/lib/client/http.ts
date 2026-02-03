export async function readErrorMessage(res: Response) {
  const ct = res.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) {
    const body = await res.json().catch(() => null);
    const msg = body?.error?.message ?? 'Request failed.';
    const hint = body?.error?.hint ? ` ${body.error.hint}` : '';
    return `${msg}${hint}`;
  }
  return await res.text().catch(() => 'Request failed.');
}
