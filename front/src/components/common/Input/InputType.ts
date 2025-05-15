import { Control, FieldErrors, FieldValues, Path, RegisterOptions } from "react-hook-form"

export interface InputType< T extends FieldValues = FieldValues> {
    name: Path<T>;
    label: string;
    type?: string;
    placeholder?: string;
    control?: Control<T>;
    required?: boolean;
    showEye?: boolean;
    errors?: FieldErrors;
    rules?: RegisterOptions<T>
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}