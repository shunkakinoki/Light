import s from "./LoadingDots.module.css";

export const LoadingDots: React.FC = () => {
  return (
    <span className={s.root}>
      <span key={`dot_1`} className={s.dot} />
      <span key={`dot_2`} className={s.dot} />
      <span key={`dot_3`} className={s.dot} />
    </span>
  );
};
