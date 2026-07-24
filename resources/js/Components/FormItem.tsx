import { PropsWithChildren } from "react";

export default function FormItem({children} : PropsWithChildren) {
  return (
    <div className="space-y-2">
        { children }
    </div>
  )
}
