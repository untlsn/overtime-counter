import { json, redirect } from 'solid-start';
import { getUserByLogin } from '~/dbController/users';
import * as bcrypt from 'bcrypt';
import { storage } from '~/stores/cookieSession';
import * as zfd from 'zod-form-data';
import * as z from 'zod';

const loginSchema= zfd.formData({
	login:    zfd.text(z.string().min(1, 'Field is required')),
	password: zfd.text(z.string().min(1, 'Field is required')),
});

export const useLogin$ = () => createServerAction$(async (formData: FormData) => {
	const parse = loginSchema.safeParse(formData);
	if (!parse.success) return json({ error: 'Data is invalid' }, {
		status: 400,
	});

	const { login, password } = parse.data;

	const user = getUserByLogin(login);
	if (!user) return json({ error: 'Login is not valid' }, {
		status: 401,
	});

	const samePasswords = await bcrypt.compare(password, user.password);
	if (!samePasswords) return json({ error: 'Password is not valid' }, {
		status: 401,
	});

	const session = await storage.getSession();
	session.set('userId', user.id);

	return redirect('/', {
		headers: {
			'Set-Cookie': await storage.commitSession(session),
		},
	});
}, { invalidate: ['auth'] });
export const useLoginForm$ = () => useLogin$()[1].Form;
