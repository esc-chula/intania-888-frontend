export const EmptyState = (props: { texts: string[] }) => {
  return (
    <div className="text-white text-center">
      <p className="text-2xl my-2 font-semibold">ไม่พบข้อมูล</p>
      {props.texts.map((s, index) => (
        <p key={index}>{s}</p>
      ))}
    </div>
  );
};
