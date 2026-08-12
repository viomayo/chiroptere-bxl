export const AUTH_ERROR_PATH = '/auth/auth-code-error'

export async function destinationAfterCodeExchange(
  code: string | null,
  exchangeCodeForSession: (code: string) => Promise<{ error: unknown }>,
): Promise<string> {
  if (!code) return AUTH_ERROR_PATH
  const { error } = await exchangeCodeForSession(code)
  return error ? AUTH_ERROR_PATH : '/'
}
