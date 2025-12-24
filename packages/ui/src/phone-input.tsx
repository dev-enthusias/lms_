import clsx from "clsx";
import {
  Path,
  Control,
  FieldErrors,
  FieldValues,
  useController,
} from "react-hook-form";
import { Label } from "./label";
import { FormError } from "./form-error";
import { useState, useRef, useEffect } from "react";

type Country = { code: string; flag: string };

const COUNTRIES: Country[] = [
  { code: "+234", flag: "🇳🇬" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
];

interface PhoneInputProps<T extends FieldValues> {
  name: Path<T>;
  className?: string;
  control: Control<T>;
  placeholder?: string;
  errors?: FieldErrors<T>;
}

export function PhoneInput<T extends FieldValues>({
  name,
  control,
  className,
  placeholder = "908 0010 168",
}: PhoneInputProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [country, setCountry] = useState<Country>(COUNTRIES[0]!);

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const rawValue = String(field.value ?? "");
  const localDigits = rawValue.startsWith(country.code)
    ? rawValue.slice(country.code.length)
    : rawValue.replace(/\D/g, "");

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function handleNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "");
    field.onChange(`${country.code}${digits}`);
  }

  function handleCountrySelect(c: Country) {
    const digits = localDigits.replace(/\D/g, "");
    setCountry(c);
    setOpen(false);
    field.onChange(`${c.code}${digits}`);
  }

  return (
    <div className={clsx("ui:w-full gap-y-1 grid", className)}>
      <Label>Phone number</Label>

      <div className="ui:flex ui:gap-2 ui:items-start">
        <div className="ui:relative" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="ui:flex ui:items-center ui:gap-2 ui:h-12 ui:px-3 ui:border ui:border-grey-100 ui:rounded-lg ui:text-sm ui:focus:outline-primary/30"
          >
            <span className="ui:text-lg">{country.flag}</span>
            <span>{country.code}</span>
          </button>

          {open && (
            <div className="ui:absolute ui:z-10 ui:mt-2 ui:bg-white ui:border ui:border-grey-100 ui:rounded-lg ui:shadow">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleCountrySelect(c)}
                  className={clsx(
                    "ui:flex ui:items-center ui:gap-2 ui:w-full ui:px-3 ui:py-2 ui:text-sm ui:hover:ui:bg-gray-100",
                    c.code === country.code && "ui:bg-gray-50"
                  )}
                >
                  <span className="ui:text-lg">{c.flag}</span>
                  <span>{c.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="ui:flex-1">
          <input
            type="tel"
            placeholder={placeholder}
            value={localDigits}
            onChange={handleNumberChange}
            aria-invalid={!!error}
            className={clsx(
              "ui:w-full ui:border ui:border-grey-100 ui:rounded-lg ui:px-3 ui:py-2.5 ui:h-12 ui:text-sm ui:text-grey-500 ui:focus:outline-primary/30",
              error && "ui:border-red-300"
            )}
          />

          <FormError message={error?.message} />
        </div>
      </div>
    </div>
  );
}
