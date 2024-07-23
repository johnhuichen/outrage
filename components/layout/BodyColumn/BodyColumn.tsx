import cx from "classnames";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

const BodyColumn: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <div
      className={cx(
        className,
        "md:w-[calc(100vw-2*64px)] w-[calc(100vw-2*24px)] max-w-[1200px] mx-auto",
      )}
    >
      {children}
    </div>
  );
};

export default BodyColumn;
