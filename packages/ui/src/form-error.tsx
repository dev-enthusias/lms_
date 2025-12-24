export function FormError({ message }: { message?: string }) {
  return (
    <p role="alert" className="ui:text-red-600 ui:text-sm">
      {message}
    </p>
  );
}
