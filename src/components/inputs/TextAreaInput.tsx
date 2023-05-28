type propsType = { defaultValue?: string,  label: string, placeholder: string, register: any, fieldName: string, options: any, errors: any }
const TextAreaInput = (props: propsType) => {
    return (
        <div className="flex flex-col mt-4">    
            <label className="text-lg font-bold">{props.label}</label>
            <textarea
                defaultValue={props.defaultValue || 1}
                className="border-2 border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-green-500"
                placeholder={props.placeholder}
                {...props.register(props.fieldName, props.options)}
            ></textarea>
            <p className="text-red-500 text-sm">
                {props.errors[props.fieldName] && props.errors[props.fieldName].message }
            </p>
        </div>
    )
}

export default TextAreaInput;