type LabeledInputProps = {
  name: string,
	label: string
}

export default function LabeledInput(props: LabeledInputProps) {
	return (
		<>
			<label for={props.name}>{props.label}</label>
			<input
				class="border-1 p-(x2 y1) rounded"
				id={props.name}
				name={props.name}
				type={props.name.includes('password') ? 'password' : 'text'}
			/>
		</>
	);
}
