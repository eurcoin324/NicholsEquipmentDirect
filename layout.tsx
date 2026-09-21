import './globals.css';
export const metadata={title:'NicholsEquipmentDirect',description:'Commercial equipment and vehicle inventory'};
export default function RootLayout({children}:{children:React.ReactNode}){return <><header className="nav"><div className="navin"><a className="brand" href="/">NicholsEquipmentDirect</a><nav><a href="/admin">Admin</a></nav></div></header>{children}</>}