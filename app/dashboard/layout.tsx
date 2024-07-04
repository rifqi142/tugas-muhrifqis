export default async function DashboardCustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <main className="">{children}</main>
    </div>
  );
}
