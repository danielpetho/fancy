export function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-32 bg-zink-100 mb-4">
      <div className="flex w-full mx-4 rounded-xl bg-background h-full shadow-xl">
        <div className="flex items-center justify-center gap-x-4 ">
          <a href="https://github.com" className="text-white">
            Github
          </a>
          <a
            href="https://instagram.com/fancycomponents"
            className="text-white"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
