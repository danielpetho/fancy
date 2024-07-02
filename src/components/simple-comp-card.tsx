export function SimpleCompCard({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <div>
      <div className="flex flex-col w-[420px] aspect-square items-center justify-center gap-y-4">
      <iframe
        src={link}
        width="100%"
        height="420px"
        className="rounded-lg"
        title="react-ts-tailwind-framermotion-template"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      />
      </div>
      <h2 className="text-md mt-2 font-semibold">{title}</h2>
    </div>
  );
}
