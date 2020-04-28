import { parseISO, format } from "date-fns";

type Props = {
  date: string;
};

export default function Date(props: Props) {
  const date = parseISO(props.date);
  return <time dateTime={props.date}>{format(date, "LLLL d, yyyy")}</time>;
}
