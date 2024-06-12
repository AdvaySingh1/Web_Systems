// import Link from "next/Link";
// export default function NavBar() {
//   return (
//     <div className="fixed top-0 right-0 z-50">
//       <nav className="hidden sm:flex">
//         <ul className="flex space-x-4 m-4 p-2 bg-gray-900 text-white rounded-lg">
//           <li>
//             <Link href="/" className="hover:bg-gray-700 p-2 rounded">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link href="/about" className="hover:bg-gray-700 p-2 rounded">
//               About
//             </Link>
//           </li>
//           <li>
//             {/* <Link href="#contact" className="hover:bg-gray-700 p-2 rounded">
//               Contact
//             </Link> */}
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

import Link from "next/link";
export default function NavBar() {
  return (
    <div className="fixed top-0 right-0 z-50">
      <nav className="hidden sm:flex">
        <ul className="flex space-x-4 m-4 p-2 bg-gray-900 text-white rounded-lg ">
          <li>
            <Link href="/" className="hover:bg-gray-700 p-2 rounded">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:bg-gray-700 p-2 rounded">
              About
            </Link>
          </li>
          <li>
            {
              <Link href="/pokemon" className="hover:bg-gray-700 p-2 rounded">
                Pokemon
              </Link>
            }
          </li>
        </ul>
      </nav>
    </div>
  );
}
