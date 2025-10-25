interface Iprops {
  design: string;
  children?: React.ReactNode;
  doEvent?: () => void;
}
export default function Button({ design, children, doEvent }: Iprops) {
  let commonDesign = "cursor-pointer rounded-lg text-white py-2.5 transition";
  return (
    <button className={`${commonDesign} ${design}`} onClick={doEvent}>
      {children}
    </button>
  );
}
