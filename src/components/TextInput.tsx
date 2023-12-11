const TextArea = ({placeholder, value, onChange, className}: {
	className?: string,
	placeholder: string,
	value: string,
	onChange: (e: string) => void
}) => {
	return (
		<textarea
			className={`${className} bg-input-bg text-white focus:outline-0 px-5 py-1.5 text-[16px] w-full rounded-xl`}
			placeholder={placeholder}
			value={value}
			onChange={(e) => onChange(e.target.value)}
		/>
	)
}

export default TextArea;
