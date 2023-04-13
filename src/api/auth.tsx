import { storage } from '~/stores/cookieSession';

export const getSession = (req: Request) => storage.getSession(req.headers.get('Cookie'));
export const getFromSession = (req: Request, field: string) => (
	storage.getSession(req.headers.get('Cookie')).then((v) => v.get(field))
);

export const useAuth$ = () => createServerData$(async (_key, ev) => {
	const userId = await getFromSession(ev.request, 'userId');
	if (!userId) return { isLogged: false };

	return {
		isLogged: true,
		userId:   +userId,
	};
}, { key: ['auth'] });
