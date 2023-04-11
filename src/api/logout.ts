import { storage } from '~/stores/cookieSession';

const logout$ = async (_data: FormData, { request: req }) => {
	const session = await storage.getSession(req.headers.get('Cookie'));

	return new Response('Logout success!', {
		headers: {
			'Set-Cookie': await storage.destroySession(session),
		},
	});
};

export default logout$;
