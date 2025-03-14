// import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from "@inertiajs/react";
import FlashMessages from "../components/flash-messages";
import { type PropsWithChildren } from "react";

interface AuthLayoutProps {
  name?: string;
  title?: string;
  description?: string;
}

// export default function AuthenticatedLayout({ children }: PropsWithChildren) {
//   const url = usePage().url;
//
//   const navigation = [
//     {
//       name: "Dashboard",
//       href: "/",
//       current: url.startsWith("/"),
//     },
//     {
//       name: "Dreams",
//       href: "/dreams",
//       current: url.startsWith("/categories"),
//     },
//   ];
//
//   return (
//     <>
//       <div>
//         <nav className="flex flex-1 flex-col">
//           <ul role="list" className="flex flex-1 flex-col gap-y-7">
//             <li>
//               <ul role="list" className="-mx-2 space-y-1">
//                 {navigation.map((item) => (
//                   <li key={item.name}>
//                     <Link
//                       href={item.href}
//                       className={clsx(
//                         item.current
//                           ? "bg-emerald-700 text-white"
//                           : "text-emerald-200 hover:bg-emerald-700 hover:text-white",
//                         "group flex gap-x-3 rounded-md p-2 text-xs/6 font-semibold",
//                       )}
//                     >
//                       {item.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           </ul>
//         </nav>
//         <div>
//           <main>
//             <FlashMessages />
//             {children}
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4">
            <Link href="/" className="flex flex-col items-center gap-2 font-medium">
              <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                {/* <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" /> */}
              </div>
              <span className="sr-only">{title}</span>
            </Link>

            <div className="space-y-2 text-center">
              <h1 className="text-xl font-medium">{title}</h1>
              <p className="text-muted-foreground text-center text-sm">{description}</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
