import { Github } from "lucide-react";

export default function Footer() {
  return (
    <div className="absolute w-full py-5 space-y-2 text-center">
      <p className="text-gray-500">
        Un proyecto de{" "}
        <a
          className="font-semibold link link-primary"
          href="https://twitter.com/andeveling"
          target="_blank"
          rel="noopener noreferrer"
        >
          Andres Parra
        </a>
      </p>
      <a
        href="https://www.buymeacoffee.com/steventey"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-info"
      >
        <Github className="w-6 h-6" />
        <p className="font-medium ">Contactame</p>
      </a>
    </div>
  );
}
