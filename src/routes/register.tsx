import { json, redirect } from 'solid-start';
import { createUser, getUserByLogin } from '~/dbController/users';
import * as bcrypt from 'bcrypt';
import { storage } from '~/stores/cookieSession';
import * as zfd from 'zod-form-data';
import * as z from 'zod';
import LabeledInput from '~/components/LabeledInput';

const registerSchema= zfd.formData({
	login:             zfd.text(z.string().min(1, 'Field is required')),
	password:          zfd.text(z.string().min(1, 'Field is required')),
	'repeat-password': zfd.text(z.string().min(1, 'Field is required')),
});

export default function Register() {
	const [, { Form: RegisterForm }] = createServerAction$(async (formData: FormData) => {
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

		return redirect('/', {
			headers: {
				'Set-Cookie': await storage.commitSession(session),
			},
		});
	});

	return (
		<main>
			<h1>OverTime Counter</h1>
			<RegisterForm class="grid gap-4 w-100 m-(x-auto y-20)">
				<LabeledInput name="login" label="Login" />
				<LabeledInput name="password" label="Password" />
				<LabeledInput name="repeat-password" label="Repeat password" />
				<button type="submit">Submit</button>
			</RegisterForm>
		</main>
	);
}
