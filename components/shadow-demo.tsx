

export function ShadowDemo() {
    return (
        <div className="p-6 flex gap-8">
            <div className="flex flex-col gap-2">
                <div className="size-30 bg-card border rounded-xl shadow-2xs"></div>
                <p className="text-xs text-muted-foreground text-center">shadow-2xs</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="size-30 bg-card border rounded-xl shadow-xs"></div>
                <p className="text-xs text-muted-foreground text-center">shadow-xs</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="size-30 bg-card border rounded-xl shadow-sm"></div>
                <p className="text-xs text-muted-foreground text-center">shadow-sm</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="size-30 bg-card border rounded-xl shadow-md"></div>
                <p className="text-xs text-muted-foreground text-center">shadow-md</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="size-30 bg-card border rounded-xl shadow-lg"></div>
                <p className="text-xs text-muted-foreground text-center">shadow-lg</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="size-30 bg-card border rounded-xl shadow-xl"></div>
                <p className="text-xs text-muted-foreground text-center">shadow-xl</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="size-30 bg-card border rounded-xl shadow-2xl"></div>
                <p className="text-xs text-muted-foreground text-center">shadow-2xl</p>
            </div>
        </div>
  )
}
