import { useLoginForm$ } from '~/api/login';
import LabeledInput from '~/components/LabeledInput';


export default function Login() {
	const LoginForm = useLoginForm$();

	return (
		<main>
			<LoginForm class="grid gap-4 w-100 m-(x-auto y-20)">
				<LabeledInput label="Login" name="login" />
				<LabeledInput label="Password" name="password" />
				<button type="submit">Submit</button>
			</LoginForm>
		</main>
	);
}
