import clsx from "clsx";
import { cn } from "@lms/utils/cn";
import { DatePicker } from "./date-picker";
import { Field } from "@base-ui/react/field";
import { Control, Controller, Path } from "react-hook-form";
import { Combobox, NumberField, Select } from "@base-ui/react";

interface BaseTextFieldProps<T extends Record<string, any>> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    placeholder?: string;

    className?: {
        root?: string;
        label?: string;
        error?: string;
        control?: string;
    };
}

interface TextInputProps<
    T extends Record<string, any>,
> extends BaseTextFieldProps<T> {
    type?: "text";
}

interface NumberInputProps<
    T extends Record<string, any>,
> extends BaseTextFieldProps<T> {
    type?: "number";
    min: number;
    max: number;
    showStepper?: boolean;
}

interface SelectInputProps<
    T extends Record<string, any>,
> extends BaseTextFieldProps<T> {
    type: "select";
    items: { label: string; value: string | null }[];
}

interface ComboboxInputProps<
    T extends Record<string, any>,
> extends BaseTextFieldProps<T> {
    type: "combobox";
    items: { label: string; value: string }[];
}

interface DateInputProps<
    T extends Record<string, any>,
> extends BaseTextFieldProps<T> {
    type: "date";
    isDateDisabled?: (date: Date) => boolean;
    weekStartsOn?: 0 | 1;
}

type RHFFieldProps<T extends Record<string, any>> =
    | TextInputProps<T>
    | NumberInputProps<T>
    | SelectInputProps<T>
    | ComboboxInputProps<T>
    | DateInputProps<T>;

export function RHFField<T extends Record<string, any>>(
    props: RHFFieldProps<T>,
) {
    const {
        name,
        label,
        control,
        className,
        placeholder,
        type = "text",
    } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { name, ref, value, onBlur, onChange },
                fieldState: { invalid, isTouched, isDirty, error },
            }) => (
                <Field.Root
                    name={name}
                    invalid={invalid}
                    touched={isTouched}
                    dirty={isDirty}
                    className={cn("grid grow gap-y-0.5", className?.root)}
                >
                    <Field.Label
                        className={cn(
                            "ui-block ui-text-grey-500 ui-text-[0.9375rem] ui-md:text-base ui-leading-[120%] ui-tracking-[0.2px]",
                            className?.label,
                        )}
                    >
                        {label}
                    </Field.Label>

                    {type === "text" ? (
                        <Field.Control
                            ref={ref}
                            value={value}
                            onBlur={onBlur}
                            onValueChange={onChange}
                            placeholder={placeholder || `Enter your ${name}`}
                            className={clsx(
                                "ui:w-full ui:border ui:lg:text-base ui:border-grey-100 ui:focus:outline-primary/30 ui:rounded-lg ui:px-3 ui:py-2.5 ui:h-12 ui:placeholder:text-grey-200 ui:text-sm ui:text-grey-500",
                                {
                                    "ui:border-red-300": error?.message,
                                },
                                className?.control,
                            )}
                        />
                    ) : type === "number" ? (
                        <NumberField.Root
                            min={(props as NumberInputProps<T>).min}
                            max={(props as NumberInputProps<T>).max}
                            value={value}
                            onValueChange={onChange}
                            className="ui:flex ui:flex-col ui:items-start ui:gap-1"
                        >
                            <NumberField.Group className="ui:flex ui:w-full">
                                {(props as NumberInputProps<T>).showStepper && (
                                    <NumberField.Decrement className="ui:flex ui:size-10 ui:items-center ui:justify-center ui:rounded-tl-md ui:rounded-bl-md ui:border ui:border-gray-200 ui:bg-gray-50 ui:bg-clip-padding ui:text-gray-900 ui:select-none ui:hover:bg-gray-100 ui:active:bg-gray-100">
                                        <MinusIcon />
                                    </NumberField.Decrement>
                                )}

                                <NumberField.Input
                                    ref={ref}
                                    onBlur={onBlur}
                                    className={clsx(
                                        "ui:w-full ui:border ui:lg:text-base ui:border-grey-100 ui:focus:outline-primary/30 ui:rounded-lg ui:px-3 ui:py-2.5 ui:h-12 ui:placeholder:text-grey-200 ui:text-sm ui:text-grey-500",
                                        {
                                            "ui:border-red-300": error?.message,
                                        },
                                        className?.control,
                                    )}
                                />

                                {(props as NumberInputProps<T>).showStepper && (
                                    <NumberField.Increment className="ui:flex ui:size-10 ui:items-center ui:justify-center ui:rounded-tr-md ui:rounded-br-md ui:border ui:border-gray-200 ui:bg-gray-50 ui:bg-clip-padding ui:text-gray-900 ui:select-none ui:hover:bg-gray-100 ui:active:bg-gray-100">
                                        <PlusIcon />
                                    </NumberField.Increment>
                                )}
                            </NumberField.Group>
                        </NumberField.Root>
                    ) : type === "select" ? (
                        <Select.Root
                            value={value ?? null}
                            inputRef={ref}
                            defaultValue={null}
                            onValueChange={(v) => {
                                onChange(v);
                                onBlur();
                            }}
                            items={(props as SelectInputProps<T>).items}
                        >
                            <Select.Trigger
                                className={clsx(
                                    "ui:w-full ui:flex ui:data-placeholder:text-grey-300 ui:justify-between ui:items-center ui:border ui:lg:text-base ui:border-grey-100 ui:focus:outline-primary/30 ui:rounded-lg ui:px-3 ui:py-2.5 ui:h-12 ui:placeholder:text-grey-200 ui:text-sm ui:text-grey-500",
                                    {
                                        "ui:border-red-300": error?.message,
                                    },
                                    className?.control,
                                )}
                                onBlur={onBlur}
                            >
                                <Select.Value />
                                <Select.Icon>
                                    <ChevronUpDownIcon className="size-4" />
                                </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Positioner
                                    className="ui:outline-none ui:select-none ui:z-10"
                                    sideOffset={8}
                                >
                                    <Select.Popup className="ui:min-w-(--anchor-width) ui:overflow-hidden ui:rounded-lg ui:bg-clip-padding ui:outline ui:bg-white ui:outline-grey-100">
                                        <Select.ScrollUpArrow className="ui:top-0 ui:z-1 ui:flex ui:h-4 ui:w-full ui:cursor-default ui:items-center ui:justify-center ui:rounded-md ui:bg-white ui:text-center ui:text-xs ui:before:absolute ui:before:top-full ui:before:left-0 ui:before:h-full ui:before:w-full ui:before:content-['']" />
                                        <Select.List className="ui:relative ui:scroll-py-6 ui:overflow-y-auto ui:max-h-(--available-height)">
                                            {(
                                                props as SelectInputProps<T>
                                            ).items.map(({ label, value }) => (
                                                <Select.Item
                                                    key={label}
                                                    value={value}
                                                    className="ui:grid ui:cursor-default ui:h-12 ui:border-b ui:border-zinc-100 ui:last:border-0 ui:hover:bg-primary/10 ui:data-selected:bg-primary ui:data-selected:text-white ui:grid-cols-[0.75rem_1fr] ui:items-center ui:gap-2 ui:py-2 ui:pr-4 ui:pl-2.5 ui:leading-4 ui:outline-none ui:select-none group-data-[side=none]:ui:pr-12 group-data-[side=none]:ui:text-base group-data-[side=none]:ui:leading-4 data-[highlighted]:ui:relative ui:highlighted:ui:z-0 ui:highlighted:ui:text-gray-50 ui:highlighted:before:ui:absolute ui:highlighted:before:ui:inset-x-1 ui:highlighted:before:ui:inset-y-0 ui:highlighted:before:ui:z-[-1] ui:highlighted:before:ui:rounded-sm ui:highlighted:before:bg-gray-900 pointer-coarse:ui:py-2.5 pointer-coarse:text-[0.925rem]"
                                                >
                                                    <Select.ItemIndicator className="ui:col-start-1">
                                                        <CheckIcon className="ui:size-3" />
                                                    </Select.ItemIndicator>
                                                    <Select.ItemText className="ui:col-start-2 ui:focus:ui:bg-zinc-100">
                                                        {label}
                                                    </Select.ItemText>
                                                </Select.Item>
                                            ))}
                                        </Select.List>
                                        <Select.ScrollDownArrow className="ui:bottom-0 ui:z-1 ui:flex ui:h-4 ui:w-full ui:cursor-default ui:items-center ui:justify-center ui:rounded-md ui:bg-white ui:text-center ui:text-xs ui:before:absolute ui:before:bottom-full ui:before:left-0 ui:before:h-full ui:before:w-full ui:before:content-['']" />
                                    </Select.Popup>
                                </Select.Positioner>
                            </Select.Portal>
                        </Select.Root>
                    ) : type === "combobox" ? (
                        <Combobox.Root
                            items={(props as ComboboxInputProps<T>).items}
                            value={value ?? ""}
                            onValueChange={(v) => {
                                onChange(v);
                                onBlur();
                            }}
                        >
                            <div className="ui:relative ui:flex ui:flex-col ui:gap-1 ui:text-sm ui:leading-5 ui:font-medium ui:text-gray-900">
                                <Field.Label>Region</Field.Label>
                                <Combobox.Input
                                    placeholder="e.g. eu-central-1"
                                    ref={ref}
                                    onBlur={onBlur}
                                />
                                <div className="ui:absolute ui:right-2 ui:bottom-0 ui:flex ui:h-10 ui:items-center ui:justify-center ui:text-gray-600">
                                    <Combobox.Clear />
                                    <Combobox.Trigger>
                                        <ChevronDownIcon className="size-4" />
                                    </Combobox.Trigger>
                                </div>
                            </div>
                            <Combobox.Portal>
                                <Combobox.Positioner>
                                    <Combobox.Popup>
                                        <Combobox.Empty>
                                            No matches
                                        </Combobox.Empty>
                                        <Combobox.List>
                                            {(region: string) => {
                                                return (
                                                    <Combobox.Item
                                                        key={region}
                                                        value={region}
                                                    >
                                                        <Combobox.ItemIndicator>
                                                            <CheckIcon className="size-4" />
                                                        </Combobox.ItemIndicator>
                                                        <div className="ui:col-start-2">
                                                            {region}
                                                        </div>
                                                    </Combobox.Item>
                                                );
                                            }}
                                        </Combobox.List>
                                    </Combobox.Popup>
                                </Combobox.Positioner>
                            </Combobox.Portal>
                        </Combobox.Root>
                    ) : type === "date" ? (
                        <DatePicker
                            value={value}
                            onChange={(date) => {
                                onChange(date);
                                onBlur();
                            }}
                            placeholder={
                                placeholder || `Select ${label.toLowerCase()}`
                            }
                            isDateDisabled={
                                (props as DateInputProps<T>).isDateDisabled
                            }
                            weekStartsOn={
                                (props as DateInputProps<T>).weekStartsOn
                            }
                            error={error}
                        />
                    ) : null}

                    <Field.Error
                        match={!!error}
                        className={cn(
                            "ui:text-red-600 ui:text-sm",
                            className?.error,
                        )}
                    >
                        {error?.message}
                    </Field.Error>
                </Field.Root>
            )}
        />
    );
}

function PlusIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentcolor"
            strokeWidth="1.6"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            className="ui:svg"
        >
            <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
        </svg>
    );
}

function MinusIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentcolor"
            strokeWidth="1.6"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            className="ui:svg"
        >
            <path d="M0 5H10" />
        </svg>
    );
}

function ChevronUpDownIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            stroke="currentcolor"
            strokeWidth="1.5"
            {...props}
        >
            <path d="M0.5 4.5L4 1.5L7.5 4.5" />
            <path d="M0.5 7.5L4 10.5L7.5 7.5" />
        </svg>
    );
}

function ChevronDownIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            stroke="currentcolor"
            strokeWidth="1.5"
            {...props}
        >
            {/* <path d="M0.5 4.5L4 1.5L7.5 4.5" /> */}
            <path d="M0.5 7.5L4 10.5L7.5 7.5" />
        </svg>
    );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg
            fill="currentcolor"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            {...props}
        >
            <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
        </svg>
    );
}
