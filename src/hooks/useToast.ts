import { toaster } from "../components/ui/toaster"

export function useAppToast() {
  return {
    success: (msg: string) =>
      toaster.create({
        description: msg,
      }),
  }
}
