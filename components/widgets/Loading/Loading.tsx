import cx from "classnames";

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ className }: LoadingProps) => {
  return (
    <div
      className={cx(
        "flex items-center justify-center relative w-5 h-5",
        className,
      )}
    >
      <div
        className={`
          absolute w-4 h-4 m-0.5
          border-2 border-solid rounded-[50%]
          border-t-slate-300 border-r-slate-300 border-b-slate-300 border-l-transparent
          animate-[loading_1s_cubic-bezier(0.5,0,0.5,1)_infinite]
        `}
      />
    </div>
  );
};

export default Loading;
