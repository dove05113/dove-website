import Link from "next/link";

export default function Footer() {

  return (
    <footer className="bg-slate-950 text-white font-montserrat">
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Dove Print Solutions. All Rights Reserved.
          </p>

          <div className="flex items-center justify-center gap-5 text-sm text-slate-500 md:justify-end">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>

            <span className="text-slate-700">|</span>

            <Link
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
