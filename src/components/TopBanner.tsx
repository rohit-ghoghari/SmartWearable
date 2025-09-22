export function TopBanner() {
  return (
    <div
      className="w-full py-2 text-center border-b"
      style={{
        backgroundColor: "#FFFFFF",
        color: "var(--secondary-text)",
        borderBottomColor: "var(--borders)",
      }}
    >
      <p className="text-sm">
        Free shipping on your first order!
      </p>
    </div>
  );
}