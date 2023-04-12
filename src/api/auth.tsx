import { storage } from '~/stores/cookieSession';

export const useAuth$ = () => createServerData$(async (_key, { request: req }) => {
	const session = await storage.getSession(req.headers.get('Cookie'));
	const userId = session.get('userId');
	if (!userId) return { isLogged: false };

	return {
		isLogged: true,
		userId:   +userId,
	};
}, { key: ['auth'] });
