export const getOAuthUrl = (serviceBaseUrl: string, uiBaseUrl: string): URL => {
  const oauthUrl = new URL(`${serviceBaseUrl}/auth/google`);
  oauthUrl.searchParams.set('success_redirect_url', uiBaseUrl);
  oauthUrl.searchParams.set('failure_redirect_url', `${uiBaseUrl}/login`);
  oauthUrl.searchParams.set('new_user_redirect_url', `${uiBaseUrl}/new-user`);

  return oauthUrl;
};
