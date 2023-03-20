import Link from "next/link";

export default function Footer({ events }) {
  return (
    <footer className="w-full my-8">
      <div className="text-center lil-text mt-8">
        <div className="inline-block py-3 px-4 border bg-gray-200 rounded-lg">
          🍿 V-Designers
          {/* <Link
            href="https://github.com/replicate/scribble-diffusion"
            target="_blank"
          >
            Fork it on GitHub
          </Link>{" "} */}
         
        </div>
      </div>
    </footer>
  );
}
