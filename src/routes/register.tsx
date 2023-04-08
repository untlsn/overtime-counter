import { json } from 'solid-start';
import { createUser, getUserByLogin } from '~/dbController/users';
import * as bcrypt from 'bcrypt';
import { storage } from '~/stores/cookieSession';
import * as zfd from 'zod-form-data';
import * as z from 'zod';

const registerSchema= zfd.formData({
	login:             zfd.text(z.string().min(1, 'Field is required')),
	password:          zfd.text(z.string().min(1, 'Field is required')),
	'repeat-password': zfd.text(z.string().min(1, 'Field is required')),
});

export default function Register() {
	const [, { Form }] = createServerAction$(async (formData: FormData) => {
		const parse = registerSchema.safeParse(formData);
		if (!parse.success) return json({ error: 'Data in invalid' }, {
			status: 400,
		});

		const { login, password, 'repeat-password': repeatPassword } = parse.data;
		if (password != repeatPassword) return json({ error: 'Passwords are not the same' }, {
			status: 400,
		});

		const user = getUserByLogin(login);
		if (user) return json({ error: 'User with that login exist' }, {
			status: 401,
		});

		const hashPassword = bcrypt.hash(password, 10);
		const newUser = createUser({ login, password: await hashPassword });

		const session = await storage.getSession();
		session.set('userId', newUser.id);

		return json({ data: 'Signed Up' }, {
			headers: {
				'Set-Cookie': await storage.commitSession(session),
			},
		});
	});

	return (
		<main>
			<h1>OverTime Counter</h1>
			<Form class="space-x-2">
				<input class="border-1" name="login" />
				<input class="border-1" name="password" type="password" />
				<input class="border-1" name="repeat-password" type="password" />
				<button type="submit">Submit</button>
			</Form>
		</main>
	);
}
