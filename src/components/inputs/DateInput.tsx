type propsType = { defaultValue?: Date, label: string, placeholder: string, register: any, fieldName: string, options: any, errors: any }
export default function DateInput(props: propsType) {
    const getDate = (stringDate: Date) => {
        const date = new Date(stringDate);

        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
    }

    return (
        <div className="flex flex-col mt-4">
            <label className="text-lg font-bold">{props.label}</label>
            <input
                type="date"
                defaultValue={props.defaultValue ? getDate(props.defaultValue) : ''}
                className="border-2 border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-green-500"
                placeholder={props.placeholder}
                {...props.register(props.fieldName, props.options)}
            ></input>
            <p className="text-red-500 text-sm">
                {props.errors[props.fieldName] && props.errors[props.fieldName].message}
            </p>
        </div>
    )
}