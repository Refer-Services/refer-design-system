export function ShadowDemo() {
  return (
    <div className="flex gap-8 p-6">
      <div className="flex flex-col gap-2">
        <div className="bg-card size-30 rounded-xl border shadow-2xs"></div>
        <p className="text-muted-foreground text-center text-xs">shadow-2xs</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-card size-30 rounded-xl border shadow-xs"></div>
        <p className="text-muted-foreground text-center text-xs">shadow-xs</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-card size-30 rounded-xl border shadow-sm"></div>
        <p className="text-muted-foreground text-center text-xs">shadow-sm</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-card size-30 rounded-xl border shadow-md"></div>
        <p className="text-muted-foreground text-center text-xs">shadow-md</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-card size-30 rounded-xl border shadow-lg"></div>
        <p className="text-muted-foreground text-center text-xs">shadow-lg</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-card size-30 rounded-xl border shadow-xl"></div>
        <p className="text-muted-foreground text-center text-xs">shadow-xl</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-card size-30 rounded-xl border shadow-2xl"></div>
        <p className="text-muted-foreground text-center text-xs">shadow-2xl</p>
      </div>
    </div>
  )
}
