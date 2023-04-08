export const storage = createCookieSessionStorage({
	cookie: {
		name:     'session',
		secure:   import.meta.env.PROD,
		sameSite: 'lax',
		path:     '/',
		maxAge:   30 * 24 * 60 * 60, // month
		httpOnly: true,
	},
});
