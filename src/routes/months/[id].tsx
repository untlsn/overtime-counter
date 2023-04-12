

export default function Page() {
	const params = useParams();

	return (
		<div>
			Page nr.
			{' '}
			{params.id}
		</div>
	);
}
