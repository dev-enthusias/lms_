export function FieldsetWrapper({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <fieldset className="border-grey-100 relative rounded-xl border px-7 py-7">
            <legend className="text-primary px-1.5 text-sm">{title}</legend>
            {children}
        </fieldset>
    );
}
