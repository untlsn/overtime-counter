import * as bcrypt from 'bcrypt';
import * as z from 'zod';
import * as zfd from 'zod-form-data';
import { getUserByLogin } from '~/dbController/users';
import { json } from 'solid-start';
import { storage } from '~/stores/cookieSession';

const loginSchema= zfd.formData({
	login:    zfd.text(z.string().min(1, 'Field is required')),
	password: zfd.text(z.string().min(1, 'Field is required')),
});

export default function Home() {
	const [, { Form }] = createServerAction$(async (formData: FormData) => {
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

		return json({ data: 'Signed Up' }, {
			headers: {
				'Set-Cookie': await storage.commitSession(session),
			},
		});
	});

	return (
		<main>
			<h1>OverTime Counter</h1>
			<Form>
				<input name="login" />
				<input name="password" type="password" />
				<button type="submit">Submit</button>
			</Form>
		</main>
	);
}
