import { storage } from '~/stores/cookieSession';

export const useLogout$ = () => createServerAction$(async (_data: FormData, { request: req }) => {
	const session = await storage.getSession(req.headers.get('Cookie'));
	session.unset('userId');

	return new Response('Logout success!', {
		headers: {
			'Set-Cookie': await storage.destroySession(session),
		},
	});
}, { invalidate: ['auth'] });
export const useLogoutForm$ = () => useLogout$()[1].Form;
