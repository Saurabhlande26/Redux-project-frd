export default function Error({ message }: { message: string }) {
  return <h3 style={{ color: "red" }}>{message}</h3>;
}