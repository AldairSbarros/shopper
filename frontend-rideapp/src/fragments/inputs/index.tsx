interface InputProps{
    id: string;
    type: string;
    label: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}



export const Input: React.FC<InputProps> =({ id, type, label, placeholder, value, onChange}) => {
    return (
        <fieldset>
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} name={id} placeholder={placeholder} value={value} onChange={onChange}/>
        </fieldset>
    )
}